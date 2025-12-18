import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommandesService, ArticleCommande } from '../services/commandes.service';
import { AuthService } from '../services/auth.service';
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
    private commandesService: CommandesService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    const data = sessionStorage.getItem('temp_panier');
    this.articles = data ? JSON.parse(data) : [];
  }

  get total(): number {
    return this.articles.reduce((acc, art) => acc + (art.prix_unitaire * art.quantite), 0);
  }

  confirmerCommande() {
    const user = this.authService.getCurrentUser();
    if (!user) {
      this.message = 'Veuillez vous connecter pour valider votre commande.';
      return;
    }

    this.commandesService.creerCommande(this.articles, user.id).subscribe({
      next: (res) => {
        this.message = `Commande réussie ! (ID: ${res.commande_id})`;
        this.orderSuccess = true;
        sessionStorage.removeItem('temp_panier');
        this.articles = [];
      },
      error: (err) => {
        this.message = 'Erreur lors de la commande.';
        console.error(err);
      }
    });
  }

  viderPanier() {
    sessionStorage.removeItem('temp_panier');
    this.articles = [];
  }

  retour() {
    this.router.navigate(['/commandes']);
  }

  retour_menu() {
    this.router.navigate(['/home']);
  }
}
