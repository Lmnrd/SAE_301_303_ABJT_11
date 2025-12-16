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
  private baseUrl = 'http://localhost/SAes/SAE_301_303_ABJT_11/src/api';

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.baseUrl}/users/login.php`, {
      email,
      password
    }).pipe(
      // pipe = intercepte la réponse et stocke l'user/token avant de passer les données au composant
      tap(res => {
        // utilise sessionStorage pour déconnexion auto à la fermeture de la page
        // sessionStorage se vide automatiquement quand l'onglet se ferme
        sessionStorage.setItem('user', JSON.stringify(res.user));
        sessionStorage.setItem('token', res.token);
      })
    );
  }

  register(payload: RegisterPayload): Observable<RegisterResponse> {
    return this.http.post<RegisterResponse>(
      `${this.baseUrl}/users/add_user.php`,
      payload,
      {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
      }
    ).pipe(
      // pipe = intercepte la réponse et stocke l'user avant de passer les données au composant
      tap(res => {
        // stockage en sessionStorage pour déconnexion auto
        sessionStorage.setItem('user', JSON.stringify(res.user));
      })
    );
  }

  getCurrentUser(): User | null {
    // récupère l'utilisateur depuis sessionStorage
    const user = sessionStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  logout() {
    // supprimer les données de sessionStorage pour déconnecter
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('token');
  }
}