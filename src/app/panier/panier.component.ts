// ce fichier contient le composant panier
// il permet de gérer le panier de l'utilisateur
// il permet de confirmer une commande
// il permet de vider le panier
// il permet de retourner au catalogue / menu


import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommandesService, ArticleCommande } from '../services/commandes.service';
import { AuthService } from '../services/auth.service';
import { PanierService } from '../services/panier.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-panier',
  standalone: true,
  imports: [CommonModule],
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

  constructor(
    private commandeService: CommandesService,
    private authService: AuthService,
    private panierService: PanierService, // Inject Service
    private router: Router
  ) { }

  ngOnInit() {
    // récupérer le panier via le service
    this.articles = this.panierService.getPanier();
  }

  get detailsTotal() {
    // récupérer le total final
    const user = this.authService.getCurrentUser();
    const isEtudiant = user?.type_compte === 'etudiant'; // si l'utilisateur est étudiant
    return this.panierService.calculerTotalFinal(isEtudiant); // retourner le total final
  }

  get total(): number {
    // récupérer le total final après les autres calculs
    return this.detailsTotal.totalFinal;
  }

  confirmerCommande() {
    // confirmer la commande finale
    const user = this.authService.getCurrentUser();
    if (!user) { // si l'utilisateur n'est pas connecté
      this.message = 'Veuillez vous connecter pour valider votre commande.';
      return;
    }

    this.commandeService.creerCommande(this.articles, user.id).subscribe({ // créer la commande finale
      next: (res) => {
        this.message = `Commande réussie !`;
        this.orderSuccess = true;
        this.panierService.viderPanier(); // vider le panier via le service
        this.articles = [];
      },
      error: (err) => {
        this.message = 'Erreur lors de la commande.';
        console.error(err);
      }
    });
  }

  viderPanier() {
    this.panierService.viderPanier();
    this.articles = [];
  }


  retour() {
    this.router.navigate(['/home']);
  }

  retour_menu() {
    this.router.navigate(['/home']);
  }
}
