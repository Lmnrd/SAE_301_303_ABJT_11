// ce fichier contient le service de gestion des commandes
// il permet de récupérer la liste des commandes
// il permet de créer une commande
// il permet de récupérer la liste des commandes d'un utilisateur
// il permet de récupérer la liste des commandes d'un article

import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ArticleCommande {
  // interface pour les articles
  nom_article: string;
  quantite: number;
  prix_unitaire: number;
}

export interface Commande {
  // interface pour les commandes
  id: number;
  date_commande: string;
  montant_total: number;
  articles: ArticleCommande[];
}

export interface ReponseCommande {
  // interface pour la réponse de la commande
  message: string;
  commande_id: number;
}

@Injectable({
  // service injectable qui sert à gérer les commandes
  providedIn: 'root'
})
export class CommandesService {
  // url de l'api
  private readonly baseUrl = 'http://localhost/SAE_301_303_ABJT_11/src/api/commandes';

  constructor(private http: HttpClient) { }

  // récupère la liste des commandes
  // si un id_user est fourni, filtre les commandes pour cet utilisateur pour qu'il ne voit que ses propres commandes
  getCommandes(idUser?: number): Observable<Commande[]> {
    let params = new HttpParams();
    if (idUser) {
      params = params.set('id_user', idUser.toString());
    }
    return this.http.get<Commande[]>(`${this.baseUrl}/get_commandes.php`, { params });
  }

  // crée une nouvelle commande pour un utilisateur connecté
  // envoie la liste des articles et l'ID utilisateur à l'API PHP pour insérer dans la base sql
  creerCommande(articles: ArticleCommande[], userId: number): Observable<ReponseCommande> {
    return this.http.post<ReponseCommande>(`${this.baseUrl}/add_commande.php`, {
      articles,
      id_user: userId
    });
  }
}