// ce fichier contient le composant home
// il contient la liste des boxes et les modals de détails et de quantité
// il permet de charger les boxes depuis un fichier json

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { PanierService } from '../services/panier.service';

interface Aliment {
  nom: string;
  quantite: number;
}

interface Box {
  id: number;
  nom: string;
  pieces: number;
  aliments: Aliment[];
  saveurs: string[];
  prix: number;
  image: string;
  details: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  boxes: Box[] = [];

  /* sert à ouvrir le modal de détails */
  selectedBox: Box | null = null;
  isDetailsModalOpen = false;

  /* sert à ouvrir le modal de quantité */
  selectedBoxForCart: Box | null = null;
  isQuantityModalOpen = false;
  quantite = 1;

  constructor(private panierService: PanierService, private http: HttpClient) { }
  // sert à initialiser le panier et le http

  ngOnInit(): void {
    // cette fonction sert à charger les boxes
    this.loadBoxes();
  }

  loadBoxes(): void {
    this.http.get<Box[]>('assets/data/commandes.json').subscribe({
      next: (data) => {
        this.boxes = data;
      },
      error: (err) => {
        console.error('Erreur lors du chargement des boxes :', err);
      }
    });
  }

  openDetails(box: Box): void {
    // cette fonction sert à ouvrir le modal de détails
    this.selectedBox = box;
    this.isDetailsModalOpen = true;
  }

  closeDetailsModal(): void {
    // cette fonction sert à fermer le modal de détails
    this.isDetailsModalOpen = false;
    this.selectedBox = null;
  }

  addToCartFromDetails(): void {
    // cette fonction sert à ajouter une box au panier
    if (this.selectedBox) {
      const box = this.selectedBox;
      this.closeDetailsModal();
      this.openQuantityModal(box);
    }
  }

  openQuantityModal(box: Box): void {
    // cette fonction sert à ouvrir le modal de quantité
    this.selectedBoxForCart = box;
    this.quantite = 1;
    this.isQuantityModalOpen = true;
  }

  closeQuantityModal(): void {
    // cette fonction sert à fermer le modal de quantité
    this.isQuantityModalOpen = false;
    this.selectedBoxForCart = null;
  }

  increaseQty(): void {
    // cette fonction sert à augmenter la quantité
    if (this.quantite < 10) {
      this.quantite++;
    }
  }

  decreaseQty(): void {
    // cette fonction sert à diminuer la quantité
    if (this.quantite > 1) {
      this.quantite--;
    }
  }

  confirmAddToCart(): void {
    // cette fonction sert à ajouter une box au panier
    if (!this.selectedBoxForCart) return;

    const panierActuel = this.panierService.getPanier();

    // calculer le total actuel des produits dans le panier
    const totalActuel = panierActuel.reduce((sum, item) => sum + item.quantite, 0);

    // vérifier si l'ajout dépasse la limite de 10 et indique si c'est le cas
    if (totalActuel + this.quantite > 10) {
      const placeRestante = 10 - totalActuel;
      if (placeRestante <= 0) {
        alert('Votre panier est plein (maximum 10 produits).');
      } else {
        alert(`Vous ne pouvez ajouter que ${placeRestante} produit(s) supplémentaire(s). (Maximum 10 au total)`);
      }
      return;
    }

    const article = {
      commande_id: 0,
      nom_article: this.selectedBoxForCart.nom,
      quantite: this.quantite,
      prix_unitaire: this.selectedBoxForCart.prix,
      id_user: 0
    };

    panierActuel.push(article);
    this.panierService.ajouterArticles(panierActuel);
    // on ajoute l'article au tableau puis on met à jour le panier

    alert(`${this.quantite} × ${this.selectedBoxForCart.nom} ajouté(s) au panier`);

    this.closeQuantityModal();
  }
}
