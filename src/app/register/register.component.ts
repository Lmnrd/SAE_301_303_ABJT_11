import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  firstname = '';
  lastname = '';
  email = '';
  password = '';
  message = '';
  loading = false;

  constructor(private authService: AuthService) {}

  onSubmit() {
    if (this.loading) {
      return;
    }

    this.loading = true;
    this.message = '';

    console.log('Register payload', {
      firstname: this.firstname,
      lastname: this.lastname,
      email: this.email,
      password: this.password
    });

    this.authService
      .register({
        firstname: this.firstname,
        lastname: this.lastname,
        email: this.email,
        password: this.password
      })
      .subscribe({
        next: (res) => {
          this.message = res.message;
          this.resetForm();
        },
        error: (err) => {
          this.message = err.error?.message || "Impossible de créer le compte";
        }
      })
      .add(() => {
        this.loading = false;
      });
  }

  private resetForm() {
    this.firstname = '';
    this.lastname = '';
    this.email = '';
    this.password = '';
  }
}
