import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  get user() {
    return this.authService.getCurrentUser();
  }

  logout() {
    // Utilise la méthode logout du service si elle existe, ou fait le ménage ici
    this.authService.logout();
    // Redirige vers /home (rafraîchit la vue)
    this.router.navigate(['/home']);
  }
}
