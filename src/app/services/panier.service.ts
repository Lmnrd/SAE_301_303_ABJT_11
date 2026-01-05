//Il récupère les articles du panier et les stocke dans le localStorage
//Il permet de calculer le montant total des avant remises
//Il permet de calculer les remises
//Il permet de calculer le total final
//Il permet de sauvegarder une commande dans l'historique local
//Il permet de récupérer l'historique des commandes locales

import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ArticleCommande } from './commandes.service';

@Injectable({
    providedIn: 'root'
})
export class PanierService {
    private readonly CLE_SESSION = 'temp_panier';
    private readonly CLE_HISTORIQUE_PREFIX = 'historique_commandes_';

    constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

    /**
     * Récupère l'ID de l'utilisateur connecté depuis le sessionStorage
     */
    private getCurrentUserId(): number | null {
        if (!isPlatformBrowser(this.platformId)) {
            return null;
        }
        const userStr = sessionStorage.getItem('user');
        if (userStr) {
            const user = JSON.parse(userStr);
            return user.id || null;
        }
        return null;
    }

    /**
     * Génère la clé de stockage unique pour l'historique de l'utilisateur
     */
    private getHistoriqueKey(): string | null {
        const userId = this.getCurrentUserId();
        if (userId) {
            return `${this.CLE_HISTORIQUE_PREFIX}${userId}`;
        }
        return null;
    }

    /**
     * Récupère le panier actuel depuis le sessionStorage
     */

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
        if (!isPlatformBrowser(this.platformId)) {
            return;
        }
        const historiqueKey = this.getHistoriqueKey();
        if (!historiqueKey) {
            console.warn('Aucun utilisateur connecté, historique non sauvegardé');
            return;
        }
        const historique = this.getCommandesLocales();
        historique.push(commande);
        localStorage.setItem(historiqueKey, JSON.stringify(historique));
    }

    /**
     * Récupère l'historique des commandes locales
     */
    getCommandesLocales(): any[] {
        if (!isPlatformBrowser(this.platformId)) {
            return [];
        }
        const historiqueKey = this.getHistoriqueKey();
        if (!historiqueKey) {
            return [];
        }
        const data = localStorage.getItem(historiqueKey);
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
