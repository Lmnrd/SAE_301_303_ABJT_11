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
  private baseUrl = 'http://localhost/SAes/test_front/sae_301_303/src/api'; // idem que plus haut

  constructor(private http: HttpClient) {}

  getOrders(): Observable<OrdersResponse> {
    const token = localStorage.getItem('token') || '';

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.get<OrdersResponse>(`${this.baseUrl}/orders/list.php`, { headers });
  }
}