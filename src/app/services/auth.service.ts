import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

interface LoginResponse {
  message: string;
  token: string;
}

interface RegisterPayload {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}

interface RegisterResponse {
  message: string;
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
    });
  }

  register(payload: RegisterPayload): Observable<RegisterResponse> {
    return this.http.post<RegisterResponse>(
      `${this.baseUrl}/users/add_user.php`,
      payload,
      {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
      }
    );
  }
}