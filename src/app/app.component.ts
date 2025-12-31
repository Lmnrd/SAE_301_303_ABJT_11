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
  imports: [CommonModule, RouterOutlet, RouterLink, FooterComponent], // Add to imports
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'sae_301_303';
  isMenuOpen = false;

  constructor(private panierService: PanierService, private authService: AuthService, private router: Router) { }

  get quantiteTotale(): number {
    return this.panierService.getPanier().reduce((acc, art) => acc + art.quantite, 0);
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
  }
}
