// ce fichier est utilisé pour configurer l'application

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink } from '@angular/router';
import { FooterComponent } from './footer/footer.component';
import { PanierService } from './services/panier.service';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, FooterComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'sae_301_303';
  isMenuOpen = false;
  isCartOpen = false; // etat d'ouverture du menu panier

  constructor(private panierService: PanierService, private authService: AuthService, private router: Router) { }

  get quantiteTotale(): number {
    return this.panierService.getPanier().reduce((acc, art) => acc + art.quantite, 0);
  }

  // récupère les articles du panier pour l'affichage dans le petit menu
  get panierArticles() {
    return this.panierService.getPanier();
  }

  // calcule le prix total du panier
  get totalPanier(): number {
    return this.panierService.calculerTotal();
  }

  // récupère l'utilisateur actuel connecté
  get user() {
    return this.authService.getCurrentUser();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
    this.toggleMenu(); // femre le menu principal si ouvert
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    if (this.isMenuOpen) this.isCartOpen = false; // femre le petit menu panier si on ouvre le menu principal
  }

  // ouvre / ferme le petit menu panier
  toggleCart() {
    this.isCartOpen = !this.isCartOpen;
    if (this.isCartOpen) this.isMenuOpen = false; // ferme le menu principal si on ouvre le panier
  }
}
