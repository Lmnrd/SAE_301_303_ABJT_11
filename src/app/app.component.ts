import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink } from '@angular/router';
import { FooterComponent } from './footer/footer.component'; // Import footer
import { PanierService } from './services/panier.service'; // Import panier service
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
  isCartOpen = false; // État d'ouverture du mini-panier

  constructor(private panierService: PanierService, private authService: AuthService, private router: Router) { }

  get quantiteTotale(): number {
    return this.panierService.getPanier().reduce((acc, art) => acc + art.quantite, 0);
  }

  // Récupérer les articles du panier pour l'affichage
  get panierArticles() {
    return this.panierService.getPanier();
  }

  // Calculer le prix total du panier
  get totalPanier(): number {
    return this.panierService.calculerTotal();
  }

  get user() {
    return this.authService.getCurrentUser();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
    this.toggleMenu(); // Ferme le menu si ouvert
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    if (this.isMenuOpen) this.isCartOpen = false; // Fermer le panier si on ouvre le menu
  }

  // Ouvrir/Fermer le mini-panier
  toggleCart() {
    this.isCartOpen = !this.isCartOpen;
    if (this.isCartOpen) this.isMenuOpen = false; // Fermer le menu si on ouvre le panier
  }
}
