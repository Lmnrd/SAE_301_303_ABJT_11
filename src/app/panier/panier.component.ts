import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommandesService, ArticleCommande } from '../services/commandes.service';
import { AuthService } from '../services/auth.service';
import { PanierService } from '../services/panier.service'; // Import PanierService
import { Router } from '@angular/router';

@Component({
  selector: 'app-panier',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './panier.component.html',
  styleUrl: './panier.component.css'
})
export class PanierComponent implements OnInit {
  articles: ArticleCommande[] = [];
  message = '';
  orderSuccess = false;

  constructor(
    private commandeService: CommandesService,
    private authService: AuthService,
    private panierService: PanierService, // Inject Service
    private router: Router
  ) { }

  ngOnInit() {
    // Récupérer le panier via le service
    this.articles = this.panierService.getPanier();
  }

  get total(): number {
    return this.panierService.calculerTotal();
  }

  confirmerCommande() {
    const user = this.authService.getCurrentUser();
    if (!user) {
      this.message = 'Veuillez vous connecter pour valider votre commande.';
      return;
    }

    this.commandeService.creerCommande(this.articles, user.id).subscribe({
      next: (res) => {
        this.message = `Commande réussie ! (ID: ${res.commande_id})`;
        this.orderSuccess = true;
        this.panierService.viderPanier(); // Vider le panier via le service
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
