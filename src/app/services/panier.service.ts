import { Injectable } from '@angular/core';
import { ArticleCommande } from './commandes.service';

@Injectable({
    providedIn: 'root'
})
export class PanierService {
    private readonly CLE_SESSION = 'temp_panier';

    constructor() { }

    /**
     * Récupère le panier actuel depuis le sessionStorage
     */
    private readonly CLE_HISTORIQUE = 'historique_commandes';

    /**
     * Récupère le panier actuel depuis le localStorage
     */
    getPanier(): ArticleCommande[] {
        if (typeof window === 'undefined' || typeof localStorage === 'undefined') {
            return [];
        }
        const data = localStorage.getItem(this.CLE_SESSION);
        return data ? JSON.parse(data) : [];
    }

    /**
     * Ajoute des articles au panier
     */
    ajouterArticles(nouveauxArticles: ArticleCommande[]) {
        if (typeof window === 'undefined' || typeof localStorage === 'undefined') {
            return;
        }
        localStorage.setItem(this.CLE_SESSION, JSON.stringify(nouveauxArticles));
    }

    /**
     * Vide le panier
     */
    viderPanier() {
        if (typeof window === 'undefined' || typeof localStorage === 'undefined') {
            return;
        }
        localStorage.removeItem(this.CLE_SESSION);
    }

    /**
     * Sauvegarde une commande dans l'historique local
     */
    sauvegarderCommandeLocale(commande: any) {
        if (typeof window === 'undefined' || typeof localStorage === 'undefined') {
            return;
        }
        const historique = this.getCommandesLocales();
        historique.push(commande);
        localStorage.setItem(this.CLE_HISTORIQUE, JSON.stringify(historique));
    }

    /**
     * Récupère l'historique des commandes locales
     */
    getCommandesLocales(): any[] {
        if (typeof window === 'undefined' || typeof localStorage === 'undefined') {
            return [];
        }
        const data = localStorage.getItem(this.CLE_HISTORIQUE);
        return data ? JSON.parse(data) : [];
    }

    /**
     * Calcule le montant total du panier (avant remises)
     */
    calculerTotal(): number {
        const articles = this.getPanier();
        return articles.reduce((total, art) => total + (art.prix_unitaire * art.quantite), 0);
    }

    /**
     * Calcule la remise de 1.5% si le total dépasse un certain seuil (ex: 50€)
     */
    getRemiseSomme(total: number): number {
        const SEUIL = 50; // Somme à partir de laquelle on applique 1.5%
        if (total >= SEUIL) {
            return total * 0.015;
        }
        return 0;
    }

    /**
     * Calcule la remise étudiant (ex: 10%)
     */
    getRemiseEtudiant(total: number, isEtudiant: boolean): number {
        if (isEtudiant) {
            return total * 0.10; // 10% de remise étudiant
        }
        return 0;
    }

    /**
     * Calcule le total final après toutes les remises
     */
    calculerTotalFinal(isEtudiant: boolean = false): { total: number, remiseSomme: number, remiseEtudiant: number, totalFinal: number } {
        const total = this.calculerTotal();
        const remiseSomme = this.getRemiseSomme(total);
        const remiseEtudiant = this.getRemiseEtudiant(total, isEtudiant);
        const totalFinal = total - remiseSomme - remiseEtudiant;

        return {
            total,
            remiseSomme,
            remiseEtudiant,
            totalFinal: totalFinal > 0 ? totalFinal : 0
        };
    }
}
