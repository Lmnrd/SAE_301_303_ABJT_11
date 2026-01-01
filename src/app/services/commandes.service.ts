import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
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
  private readonly baseUrl = 'http://localhost/SAE_301_303_ABJT_11-master/src/api/commandes';

  constructor(private http: HttpClient) { }

  /**
   * Récupère la liste des commandes.
   * Si un ID utilisateur est fourni, filtre les commandes pour cet utilisateur.
   */
  getCommandes(idUser?: number): Observable<Commande[]> {
    let params = new HttpParams();
    if (idUser) {
      params = params.set('id_user', idUser.toString());
    }
    return this.http.get<Commande[]>(`${this.baseUrl}/get_commandes.php`, { params });
  }

  /**
   * Crée une nouvelle commande pour un utilisateur donné.
   * Envoie la liste des articles et l'ID utilisateur à l'API PHP.
   */
  creerCommande(articles: ArticleCommande[], userId: number): Observable<ReponseCommande> {
    return this.http.post<ReponseCommande>(`${this.baseUrl}/add_commande.php`, {
      articles,
      id_user: userId
    });
  }
}