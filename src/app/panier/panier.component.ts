// ce fichier contient le composant panier
// il permet de gérer le panier de l'utilisateur
// il permet de confirmer une commande
// il permet de vider le panier
// il permet de retourner au catalogue / menu

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CommandesService, ArticleCommande } from '../services/commandes.service';
import { AuthService } from '../services/auth.service';
import { PanierService } from '../services/panier.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-panier',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './panier.component.html',
  styleUrl: './panier.component.css'
})
export class PanierComponent implements OnInit {
  // articles est un tableau d'articles
  articles: ArticleCommande[] = [];
  // message est un message qui s'affiche en haut de la page
  message = '';
  // orderSuccess est un boolean qui indique si la commande a été confirmée
  orderSuccess = false;

  // Étape de checkout : 'panier' ou 'livraison'
  checkoutStep: 'panier' | 'livraison' = 'panier';

  // Formulaire de livraison
  livraisonForm = {
    telephone: '',
    adresse_livraison: '',
    coordonnees_bancaires: ''
  };

  constructor(
    private commandeService: CommandesService,
    private authService: AuthService,
    private panierService: PanierService,
    private router: Router
  ) { }

  ngOnInit() {
    // récupérer le panier via le service
    this.articles = this.panierService.getPanier();

    // on remplit les infos existantes de l'utilisateur
    const user = this.authService.getCurrentUser();
    if (user) {
      this.livraisonForm = {
        telephone: user.telephone || '',
        adresse_livraison: user.adresse_livraison || '',
        coordonnees_bancaires: user.coordonnees_bancaires || ''
      };
    }
  }

  get detailsTotal() {
    // récupérer le total final
    const user = this.authService.getCurrentUser();
    const isEtudiant = user?.type_compte === 'etudiant';
    return this.panierService.calculerTotalFinal(isEtudiant);
  }

  get total(): number {
    return this.detailsTotal.totalFinal;
  }

  // on passe à l'étape de livraison
  passerAuCheckout() {
    const user = this.authService.getCurrentUser();
    if (!user) {
      this.message = 'Veuillez vous connecter pour valider votre commande.';
      return;
    }
    this.message = '';
    this.checkoutStep = 'livraison';
  }

  // on retourne au panier
  retourPanier() {
    this.checkoutStep = 'panier';
    this.message = '';
  }

  // on vérifie si le formulaire est valide
  isFormValid(): boolean {
    return (
      this.livraisonForm.telephone.trim() !== '' &&
      this.livraisonForm.adresse_livraison.trim() !== '' &&
      this.livraisonForm.coordonnees_bancaires.trim() !== ''
    );
  }

  // on confirme la commande avec les infos de livraison
  confirmerCommande() {
    const user = this.authService.getCurrentUser();
    if (!user) {
      this.message = 'Veuillez vous connecter pour valider votre commande.';
      return;
    }

    // on vérifie que tous les champs sont remplis
    if (!this.isFormValid()) {
      this.message = 'Veuillez remplir tous les champs de livraison.';
      return;
    }

    // on sauvegarde les infos de livraison dans le profil utilisateur
    this.authService.updateUser({
      id: user.id,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      telephone: this.livraisonForm.telephone,
      coordonnees_bancaires: this.livraisonForm.coordonnees_bancaires,
      adresse_livraison: this.livraisonForm.adresse_livraison
    }).subscribe({
      next: () => {
        // une fois les infos mises à jour, on crée la commande
        this.commandeService.creerCommande(this.articles, user.id).subscribe({
          next: (res) => {
            this.message = 'Commande réussie ! Livraison prévue à : ' + this.livraisonForm.adresse_livraison;
            this.orderSuccess = true;

            // on sauvegarde dans le LocalStorage
            const commandeLocale = {
              id: (res as any).commande_id || 'TEMP-' + Date.now(),
              date: new Date(),
              total: this.detailsTotal.totalFinal,
              articles: [...this.articles],
              adresse: this.livraisonForm.adresse_livraison
            };
            this.panierService.sauvegarderCommandeLocale(commandeLocale);

            this.panierService.viderPanier();
            this.articles = [];
            this.checkoutStep = 'panier';
          },
          error: (err) => {
            this.message = 'Erreur lors de la commande.';
            console.error(err);
          }
        });
      },
      error: (err) => {
        this.message = 'Erreur lors de la sauvegarde des informations.';
        console.error(err);
      }
    });
  }


  viderPanier() {
    this.panierService.viderPanier();
    this.articles = [];
  }

  retour_menu() {
    this.router.navigate(['/home']);
  }
}

