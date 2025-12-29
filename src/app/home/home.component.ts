import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
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

  /* Modal Détails */
  selectedBox: Box | null = null;
  isDetailsModalOpen = false;

  /* Modal Quantité */
  selectedBoxForCart: Box | null = null;
  isQuantityModalOpen = false;
  quantite = 1;
  quantite_total = 0; // Compteur pour le nombre total d'articles

  constructor(private panierService: PanierService) { }

  ngOnInit(): void {
    this.loadBoxes();
    this.updateQuantiteTotal();
  }

  // Met à jour le compteur global basé sur le panier
  updateQuantiteTotal(): void {
    const panier = this.panierService.getPanier();
    this.quantite_total = panier.reduce((acc, art) => acc + art.quantite, 0);
  }

  loadBoxes(): void {
    fetch('assets/data/commandes.json')
      .then(res => res.json())
      .then((data: Box[]) => {
        this.boxes = data;
      })
      .catch(err =>
        console.error('Erreur lors du chargement des boxes :', err)
      );
  }

  /* ===== MODAL DETAILS ===== */
  openDetails(box: Box): void {
    this.selectedBox = box;
    this.isDetailsModalOpen = true;
  }

  closeDetailsModal(): void {
    this.isDetailsModalOpen = false;
    this.selectedBox = null;
  }

  /* ===== MODAL QUANTITE ===== */
  openQuantityModal(box: Box): void {
    this.selectedBoxForCart = box;
    this.quantite = 1;
    this.isQuantityModalOpen = true;
  }

  closeQuantityModal(): void {
    this.isQuantityModalOpen = false;
    this.selectedBoxForCart = null;
  }

  increaseQty(): void {
    this.quantite++;
  }

  decreaseQty(): void {
    if (this.quantite > 1) {
      this.quantite--;
    }
  }

  confirmAddToCart(): void {
    if (!this.selectedBoxForCart) return;

    const article = {
      nom_article: this.selectedBoxForCart.nom,
      quantite: this.quantite,
      prix_unitaire: this.selectedBoxForCart.prix
    };

    const panierActuel = this.panierService.getPanier();
    this.panierService.ajouterArticles([...panierActuel, article]);

    alert(`${this.quantite} × ${this.selectedBoxForCart.nom} ajouté(s) au panier`);
    this.updateQuantiteTotal(); // On recalcule le total après l'ajout

    this.closeQuantityModal();
  }
}
