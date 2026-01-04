// ce fichier sert à afficher le formulaire de connexion
// il sert aussi à gérer la connexion de l'utilisateur
// il sert aussi à afficher un message de confirmation de connexion
// il sert aussi à rediriger l'utilisateur vers la page d'accueil une fois connecté
// il sert aussi à gérer les erreurs de connexion

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  // ces variables servent à stocker les informations de connexion de l'utilisateur
  email = '';
  password = '';
  message = '';
  loading = false;

  constructor(
    // ces variables servent à injecter les services nécessaires
    private authService: AuthService,
    private router: Router
  ) { }

  onSubmit() {
    // cette fonction sert à gérer la connexion de l'utilisateur après qu'il ai cliqué sur le bouton de connexion
    if (this.loading) return;

    this.loading = true;
    this.message = '';

    this.authService.login(this.email, this.password).subscribe({
      // ces fonctions servent à gérer les réponses de l'API
      next: (res) => {
        this.message = res.message;
        this.router.navigate(['/home']);
      },
      error: (err) => {
        this.message = err.error?.message || 'Erreur de connexion';
      },
      complete: () => {
        this.loading = false;
      }
    });
  }
}
