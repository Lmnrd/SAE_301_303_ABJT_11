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
    getPanier(): ArticleCommande[] {
        if (typeof window === 'undefined' || typeof sessionStorage === 'undefined') {
            return [];
        }
        const data = sessionStorage.getItem(this.CLE_SESSION);
        return data ? JSON.parse(data) : [];
    }

    /**
     * Ajoute des articles au panier
     */
    ajouterArticles(nouveauxArticles: ArticleCommande[]) {
        if (typeof window === 'undefined' || typeof sessionStorage === 'undefined') {
            return;
        }
        sessionStorage.setItem(this.CLE_SESSION, JSON.stringify(nouveauxArticles));
    }

    /**
     * Vide le panier
     */
    viderPanier() {
        if (typeof window === 'undefined' || typeof sessionStorage === 'undefined') {
            return;
        }
        sessionStorage.removeItem(this.CLE_SESSION);
    }

    /**
     * Calcule le montant total du panier
     */
    calculerTotal(): number {
        const articles = this.getPanier();
        return articles.reduce((total, art) => total + (art.prix_unitaire * art.quantite), 0);
    }
}
