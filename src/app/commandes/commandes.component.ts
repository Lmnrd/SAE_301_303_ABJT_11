import { Component, OnInit } from '@angular/core';
import { CommandesService, ArticleCommande } from '../services/commandes.service';

@Component({
  selector: 'app-commandes',
  templateUrl: './commandes.component.html',
  styleUrls: ['./commandes.component.css']
})
export class CommandesComponent implements OnInit {

  articles: ArticleCommande[] = [];

  nom_article = '';
  quantite = 1;
  prix_unitaire = 0;

  message = '';

  constructor(private commandesService: CommandesService) {}

  ngOnInit() {
    // Récupérer les commandes existantes au chargement du composant
    this.commandesService.getCommandes().subscribe({
      next: (data: ArticleCommande[]) => {
        this.articles = data;
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des commandes :', err);
      }
    });
  }

  ajouterArticle() {
    this.articles.push({
      nom_article: this.nom_article,
      quantite: this.quantite,
      prix_unitaire: this.prix_unitaire
    });

    this.nom_article = '';
    this.quantite = 1;
    this.prix_unitaire = 0;
  }

  validerCommande() {
    this.commandesService.creerCommande(this.articles).subscribe({
      next: (res) => {
        this.message = `${res.message} — ID : ${res.commande_id}`;
        this.articles = []; // reset
      },
      error: (err) => {
        console.error("Erreur backend :", err);
        this.message = err.error?.message || "Impossible de créer la commande";
      }
    });
  }
}
