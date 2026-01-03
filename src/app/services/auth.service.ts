// ce fichier contient le service d'authentification
// il permet de se connecter
// il permet de s'inscrire
// il permet de récupérer l'utilisateur connecté actuellement
// il permet de se déconnecter

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

interface User {
  // interface pour l'utilisateur
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  type_compte?: boolean | string;
  telephone?: string;
  coordonnees_bancaires?: string;
  adresse_livraison?: string;
}

interface LoginResponse {
  // interface pour la réponse de la connexion
  // sert à stocker le message, le token et l'utilisateur connecté
  message: string;
  token: string;
  user: User;
}

interface RegisterPayload {
  // interface pour la requête d'inscription
  // sert à stocker les informations de l'utilisateur à inscrire
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  type_compte: boolean | string;
}

interface RegisterResponse {
  // interface pour la réponse de l'inscription
  // sert à stocker le message et l'utilisateur inscrit
  message: string;
  user: User;
}

@Injectable({
  // service injectable qui sert à gérer l'authentification
  providedIn: 'root'
})
export class AuthService {
  // url de base de l'api
  private baseUrl = 'http://localhost/SAE_301_303_ABJT_11/src/api';

  constructor(private http: HttpClient) { }

  // partie connexion de l'utilisateur
  login(email: string, password: string): Observable<LoginResponse> {
    // envoie les informations de connexion à l'API PHP
    return this.http.post<LoginResponse>(`${this.baseUrl}/users/login.php`, {
      email,
      password
    }).pipe(
      tap(res => {
        // stockage de l'utilisateur et du token pour la session actuelle
        sessionStorage.setItem('user', JSON.stringify(res.user));
        sessionStorage.setItem('token', res.token);
      })
    );
  }

  // partie inscription d'un nouvel utilisateur
  register(payload: RegisterPayload): Observable<RegisterResponse> {
    // envoie les informations d'inscription à l'API PHP
    return this.http.post<RegisterResponse>(
      `${this.baseUrl}/users/add_user.php`,
      payload,
      {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
      }
    ).pipe(
      tap(res => {
        // connexion automatique après inscription qui garde les informations de l'utilisateur connecté
        sessionStorage.setItem('user', JSON.stringify(res.user));
      })
    );
  }

  // partie récupération de l'utilisateur connecté
  getCurrentUser(): User | null {
    const user = sessionStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  // partie déconnexion
  logout() {
    sessionStorage.clear();
  }

  // partie mise à jour des informations utilisateur
  updateUser(userData: {
    id: number;
    firstname: string;
    lastname: string;
    email: string;
    telephone?: string;
    coordonnees_bancaires?: string;
    adresse_livraison?: string;
  }): Observable<any> {
    return this.http.post<any>(
      `${this.baseUrl}/users/update_user.php`,
      userData,
      { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }
    ).pipe(
      tap(res => {
        // Mettre à jour le sessionStorage avec les nouvelles informations
        if (res.user) {
          const currentUser = this.getCurrentUser();
          const updatedUser = { ...currentUser, ...res.user };
          sessionStorage.setItem('user', JSON.stringify(updatedUser));
        }
      })
    );
  }
}
