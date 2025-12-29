import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink } from '@angular/router';
import { FooterComponent } from './footer/footer.component'; // Import footer
import { PanierService } from './services/panier.service'; // Import panier service

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

  constructor(private panierService: PanierService) { }

  get quantiteTotale(): number {
    return this.panierService.getPanier().reduce((acc, art) => acc + art.quantite, 0);
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
