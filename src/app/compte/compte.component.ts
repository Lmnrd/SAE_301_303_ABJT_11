// il permet de gérer le compte de l'utilisateur
// il permet de se connecter, de se deconnecter, de modifier ses informations et de les voir
// il permet de voir les commandes passées par l'utilisateur
// il permet de voir les informations de l'utilisateur

import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PanierService } from '../services/panier.service';
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
  localOrders: any[] = [];

  // Mode édition pour les informations personnelles
  isEditing = false;
  editForm = { firstname: '', lastname: '', email: '', password: '' };

  // Mode édition pour la section confidentialité
  isEditingConfidentialite = false;
  editFormConfidentialite = { telephone: '', coordonnees_bancaires: '', adresse_livraison: '' };

  message = '';
  messageType: 'success' | 'error' | '' = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private panierService: PanierService
  ) { }

  ngOnInit() {
    this.user = this.authService.getCurrentUser();
    this.loadLocalHistory();
  }

  loadLocalHistory() {
    this.localOrders = this.panierService.getCommandesLocales();
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
      email: this.user.email,
      password: ''
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
    const updateData: any = {
      id: this.user.id,
      firstname: this.editForm.firstname,
      lastname: this.editForm.lastname,
      email: this.editForm.email,
      telephone: this.user.telephone,
      coordonnees_bancaires: this.user.coordonnees_bancaires,
      adresse_livraison: this.user.adresse_livraison
    };
    
    // Ajouter le mot de passe seulement s'il a été modifié
    if (this.editForm.password && this.editForm.password.trim() !== '') {
      updateData.password = this.editForm.password;
    }
    
    this.authService.updateUser(updateData).subscribe({
      next: (res) => {
        this.user = this.authService.getCurrentUser();
        this.isEditing = false;
        this.editForm.password = ''; // Réinitialiser le champ mot de passe
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

  // Modal RGPD
  showRgpdModal = false;

  openRgpd() {
    this.showRgpdModal = true;
  }

  closeRgpd() {
    this.showRgpdModal = false;
  }

  logout() {
    //Cette fonction permet de se deconnecter
    this.authService.logout();
    this.router.navigate(['/home']);
  }
}

