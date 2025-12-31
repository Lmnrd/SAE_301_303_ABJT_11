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
  email = '';
  password = '';
  message = '';
  loading = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  onSubmit() {
    if (this.loading) return;

    this.loading = true;
    this.message = '';

    this.authService.login(this.email, this.password).subscribe({
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
