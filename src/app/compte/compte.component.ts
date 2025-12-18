import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-compte',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './compte.component.html',
  styleUrl: './compte.component.css'
})
export class CompteComponent implements OnInit {
  user: any = null;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    // Récupère l'utilisateur actuel depuis sessionStorage
    this.user = this.authService.getCurrentUser();
    // pas de redirection si pas connecté car pas nécessaire
  }

  logout() {
    // supprime les données de sessionStorage et redirige vers login OU ACCUEIL CAR PAS OBLIGE DE SE CONNECTER
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('token');
    this.router.navigate(['/login']); // A VOIR : rediriger vers login ou accueil ?
  }
}
