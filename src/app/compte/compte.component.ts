// il permet de gérer le compte de l'utilisateur
// il permet de se connecter, de se deconnecter, de modifier ses informations et de les voir
// il permet de voir les commandes passées par l'utilisateur
// il permet de voir les informations de l'utilisateur

import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-compte',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './compte.component.html',
  styleUrl: './compte.component.css'
})
export class CompteComponent implements OnInit {
  user: any = null;
  openSection: string | null = 'mes-informations';

  // Mode édition pour les informations personnelles
  isEditing = false;
  editForm = { firstname: '', lastname: '', email: '' };

  // Mode édition pour la section confidentialité
  isEditingConfidentialite = false;
  editFormConfidentialite = { telephone: '', coordonnees_bancaires: '', adresse_livraison: '' };

  message = '';
  messageType: 'success' | 'error' | '' = '';

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.user = this.authService.getCurrentUser();
  }

  toggleSection(section: string) {
    //Cette fonction permet de basculer entre les sections de la page compte
    if (this.openSection === section) {
      this.openSection = null;//ferme la session si elle est deja ouverte
    } else {
      this.openSection = section;//ouvre la section cliquée
    }
  }

  // Activer le mode édition pour les informations personnelles
  startEdit() {
    this.isEditing = true;
    this.editForm = {
      firstname: this.user.firstname,
      lastname: this.user.lastname,
      email: this.user.email
    };
    this.message = '';
  }

  // Annuler les modifications des informations personnelles
  cancelEdit() {
    this.isEditing = false;
    this.message = '';
  }

  // Sauvegarder les informations personnelles
  saveChanges() {
    this.authService.updateUser({
      id: this.user.id,
      firstname: this.editForm.firstname,
      lastname: this.editForm.lastname,
      email: this.editForm.email,
      telephone: this.user.telephone,
      coordonnees_bancaires: this.user.coordonnees_bancaires,
      adresse_livraison: this.user.adresse_livraison
    }).subscribe({
      next: (res) => {
        this.user = this.authService.getCurrentUser();
        this.isEditing = false;
        this.message = 'Informations mises à jour avec succès !';
        this.messageType = 'success';
      },
      error: (err) => {
        this.message = err.error?.message || 'Erreur lors de la mise à jour';
        this.messageType = 'error';
      }
    });
  }

  // Activer le mode édition pour la section confidentialité
  startEditConfidentialite() {
    this.isEditingConfidentialite = true;
    this.editFormConfidentialite = {
      telephone: this.user.telephone || '',
      coordonnees_bancaires: this.user.coordonnees_bancaires || '',
      adresse_livraison: this.user.adresse_livraison || ''
    };
    this.message = '';
  }

  // Annuler les modifications de la section confidentialité
  cancelEditConfidentialite() {
    this.isEditingConfidentialite = false;
    this.message = '';
  }

  // Sauvegarder les informations de confidentialité
  saveConfidentialite() {
    this.authService.updateUser({
      id: this.user.id,
      firstname: this.user.firstname,
      lastname: this.user.lastname,
      email: this.user.email,
      telephone: this.editFormConfidentialite.telephone,
      coordonnees_bancaires: this.editFormConfidentialite.coordonnees_bancaires,
      adresse_livraison: this.editFormConfidentialite.adresse_livraison
    }).subscribe({
      next: (res) => {
        this.user = this.authService.getCurrentUser();
        this.isEditingConfidentialite = false;
        this.message = 'Informations de sécurité mises à jour !';
        this.messageType = 'success';
      },
      error: (err) => {
        this.message = err.error?.message || 'Erreur lors de la mise à jour';
        this.messageType = 'error';
      }
    });
  }

  logout() {
    //Cette fonction permet de se deconnecter
    this.authService.logout();
    this.router.navigate(['/home']);
  }
}

