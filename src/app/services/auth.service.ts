import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

interface User {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
}

interface LoginResponse {
  message: string;
  token: string;
  user: User;
}

interface RegisterPayload {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}

interface RegisterResponse {
  message: string;
  user: User;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost/SAE_301_303_ABJT_11/src/api';

  constructor(private http: HttpClient) { }

  // Connexion de l'utilisateur
  login(email: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.baseUrl}/users/login.php`, {
      email,
      password
    }).pipe(
      tap(res => {
        // Stockage de l'utilisateur et du token pour la session
        sessionStorage.setItem('user', JSON.stringify(res.user));
        sessionStorage.setItem('token', res.token);
      })
    );
  }

  // Inscription d'un nouvel utilisateur
  register(payload: RegisterPayload): Observable<RegisterResponse> {
    return this.http.post<RegisterResponse>(
      `${this.baseUrl}/users/add_user.php`,
      payload,
      {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
      }
    ).pipe(
      tap(res => {
        // Connexion automatique après inscription
        sessionStorage.setItem('user', JSON.stringify(res.user));
      })
    );
  }

  // Récupérer l'utilisateur connecté
  getCurrentUser(): User | null {
    const user = sessionStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  // Déconnexion
  logout() {
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('token');
  }
}