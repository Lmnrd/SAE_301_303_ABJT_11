import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ArticleCommande {
  nom_article: string;
  quantite: number;
  prix_unitaire: number;
}

export interface Commande {
  id: number;
  date_commande: string;
  montant_total: number;
  articles: ArticleCommande[];
}

export interface ReponseCommande {
  message: string;
  commande_id: number;
}

@Injectable({
  providedIn: 'root'
})
export class CommandesService {
  private readonly baseUrl = 'http://localhost/SAes/SAE_301_303_ABJT_11/src/api/commandes';

  constructor(private http: HttpClient) {}

  getCommandes(): Observable<Commande[]> {
    return this.http.get<Commande[]>(`${this.baseUrl}/get_commandes.php`);
  }

  creerCommande(articles: ArticleCommande[], userId: number): Observable<ReponseCommande> {
    return this.http.post<ReponseCommande>(`${this.baseUrl}/add_commande.php`, {
      articles,
      id_user: userId    });
  }
}