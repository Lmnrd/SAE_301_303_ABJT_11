import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-compte',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './compte.component.html',
  styleUrl: './compte.component.css'
})
export class CompteComponent implements OnInit {
  user: any = null;
  openSection: string | null = 'mes-informations'; // Default to first section open

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    // Récupère l'utilisateur actuel depuis sessionStorage
    this.user = this.authService.getCurrentUser();
    // pas de redirection si pas connecté car pas nécessaire
  }

  toggleSection(section: string) {
    if (this.openSection === section) {
      this.openSection = null; // Close if already open
    } else {
      this.openSection = section; // Open the clicked section
    }
  }

  logout() {
    // supprime les données de sessionStorage et redirige vers login OU ACCUEIL CAR PAS OBLIGE DE SE CONNECTER
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('token');
    this.router.navigate(['/home']); // A VOIR : rediriger vers login ou accueil ?
  }
}
