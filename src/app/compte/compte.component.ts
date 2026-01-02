// il permet de gérer le compte de l'utilisateur
// il permet de se connecter, de se deconnecter, de modifier ses informations et de les voir
// il permet de voir les commandes passées par l'utilisateur
// il permet de voir les informations de l'utilisateur

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
    // cette fonction permet de récupérer l'utilisateur actuel depuis le service d'authentification
    this.user = this.authService.getCurrentUser();
  }

  toggleSection(section: string) {
    // cette fonction permet de basculer entre les sections de la page compte
    if (this.openSection === section) {
      this.openSection = null; // ferme la section si elle est déjà ouverte
    } else {
      this.openSection = section; // ouvre la section cliquée
    }
  }

  logout() {
    // cette fonction sert simplement à se déconnecter
    this.authService.logout();
    this.router.navigate(['/home']);
  }
}
