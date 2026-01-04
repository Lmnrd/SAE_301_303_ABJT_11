// ce fichier permet de créer un compte utilisateur et de le stocker dans la base de données via l'API

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  // les informations saisies par l'utilisateur dans le formulaire
  firstname = '';
  lastname = '';
  email = '';
  password = '';
  type_compte = false;
  message = '';
  loading = false;

  constructor(
    // les services utilisés
    private authService: AuthService,
    private router: Router
  ) { }

  onSubmit() {
    // si le formulaire est en cours de traitement, on ne fait rien
    if (this.loading) {
      return;
    }

    this.loading = true;
    this.message = '';

    this.authService
      // on envoie les informations saisies par l'utilisateur
      .register({
        firstname: this.firstname,
        lastname: this.lastname,
        email: this.email,
        password: this.password,
        type_compte: this.type_compte
      })
      // on traite la réponse de l'API
      .subscribe({
        next: (res) => {
          this.message = res.message;
          this.resetForm();
          this.router.navigate(['/home']);
        },
        error: (err) => {
          this.message = err.error?.message || "Impossible de créer le compte"; // probleme dans la bdd
        },
        complete: () => {
          this.loading = false;
        }
      });
  }

  private resetForm() {
    this.firstname = '';
    this.lastname = '';
    this.email = '';
    this.password = '';
    this.type_compte = false;
  }
}