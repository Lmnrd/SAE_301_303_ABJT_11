// src/app/services/order.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

interface OrdersResponse {
  message: string;
  orders: any[];
}

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private baseUrl = 'http://localhost/SAes/SAE_301_303_ABJT_11/src/api';

  constructor(private http: HttpClient) {}

  getOrders(): Observable<OrdersResponse> {
    // récupère le token depuis sessionStorage pour l'authentification
    const token = sessionStorage.getItem('token') || '';

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.get<OrdersResponse>(`${this.baseUrl}/orders/list.php`, { headers });
  }
}