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

  /* Modal Détails */
  selectedBox: Box | null = null;
  isDetailsModalOpen = false;

  /* Modal Quantité */
  selectedBoxForCart: Box | null = null;
  isQuantityModalOpen = false;
  quantite = 1;

  constructor(private panierService: PanierService, private http: HttpClient) { }

  ngOnInit(): void {
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

  /* ===== MODAL DETAILS ===== */
  openDetails(box: Box): void {
    this.selectedBox = box;
    this.isDetailsModalOpen = true;
  }

  closeDetailsModal(): void {
    this.isDetailsModalOpen = false;
    this.selectedBox = null;
  }

  addToCartFromDetails(): void {
    if (this.selectedBox) {
      const box = this.selectedBox;
      this.closeDetailsModal();
      this.openQuantityModal(box);
    }
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
      commande_id: 0,
      nom_article: this.selectedBoxForCart.nom,
      quantite: this.quantite,
      prix_unitaire: this.selectedBoxForCart.prix,
      id_user: 0
    };

    const panierActuel = this.panierService.getPanier();
    this.panierService.ajouterArticles([...panierActuel, article]);

    alert(`${this.quantite} × ${this.selectedBoxForCart.nom} ajouté(s) au panier`);

    this.closeQuantityModal();
  }
}
