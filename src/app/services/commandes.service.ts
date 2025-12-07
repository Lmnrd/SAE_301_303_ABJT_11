import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ArticleCommande {
  nom_article: string;
  quantite: number;
  prix_unitaire: number;
}

export interface ReponseCommande {
  message: string;
  commande_id: number;
}

@Injectable({
  providedIn: 'root'
})
export class CommandesService {

  private baseUrl = 'http://localhost/SAes/test_front/sae_301_303/src/api/commandes';

  constructor(private http: HttpClient) {}

  // Récupérer toutes les commandes
  getCommandes(): Observable<ArticleCommande[]> {
    return this.http.get<ArticleCommande[]>(`${this.baseUrl}/get_commandes.php`);
  }

  // Créer une nouvelle commande
  creerCommande(articles: ArticleCommande[]): Observable<ReponseCommande> {
    return this.http.post<ReponseCommande>(
      `${this.baseUrl}/add_commande.php`,
      { articles }
    );
  }
}
