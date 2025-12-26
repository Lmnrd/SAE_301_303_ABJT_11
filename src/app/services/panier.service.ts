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
        const data = sessionStorage.getItem(this.CLE_SESSION);
        return data ? JSON.parse(data) : [];
    }

    /**
     * Ajoute des articles au panier
     */
    ajouterArticles(nouveauxArticles: ArticleCommande[]) {
        // On pourrait fusionner si l'article existe déjà, mais pour rester simple on remplace ou on ajoute.
        // Ici, le comportement actuel semblait être de remplacer temporairement pour la commande.
        // Simplification : On écrase le panier temporaire avec la nouvelle sélection (comportement 'Valider la commande' actuel).
        sessionStorage.setItem(this.CLE_SESSION, JSON.stringify(nouveauxArticles));
    }

    /**
     * Vide le panier
     */
    viderPanier() {
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
