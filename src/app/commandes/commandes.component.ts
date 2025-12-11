import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommandesService, ArticleCommande } from '../services/commandes.service';
import { AuthService } from '../services/auth.service';

type MenuItem = {
  id: number;
  nom: string;
  prix: number;
  pieces?: number;
  aliments?: { nom: string; quantite: number }[];
};

type Selection = Record<number, ArticleCommande & { id: number }>;

@Component({
  selector: 'app-commandes',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './commandes.component.html',
  styleUrls: ['./commandes.component.css']
})
export class CommandesComponent implements OnInit {

  menu: MenuItem[] = [];
  selection: Selection = {};

  commandes: {
    id: number;
    date_commande: string;
    montant_total: number;
    articles: ArticleCommande[];
  }[] = [];
  message = '';
  userName = '';

  private readonly menuUrl = 'assets/data/commandes.json';

  constructor(
    private commandesService: CommandesService,
    private http: HttpClient,
    private authService: AuthService
  ) {}

  ngOnInit() {
    const user = this.authService.getCurrentUser();
    if (user) {
      this.userName = `${user.firstname} ${user.lastname}`;
    }

    this.chargerCatalogue();
    this.chargerCommandes();
  }

  private chargerCatalogue() {
    this.http.get<MenuItem[]>(this.menuUrl).subscribe({
      next: (data) => (this.menu = data),
      error: (err) => console.error('Erreur chargement menu :', err)
    });
  }

  private chargerCommandes() {
    this.commandesService.getCommandes().subscribe({
      next: (data) => (this.commandes = data),
      error: (err) => console.error('Erreur chargement commandes :', err)
    });
  }

  isSelected(id: number): boolean {
    return Boolean(this.selection[id]);
  }

  toggleArticle(item: MenuItem, checked: boolean) {
    if (checked) {
      this.selection[item.id] = {
        id: item.id,
        nom_article: item.nom,
        quantite: 1,
        prix_unitaire: item.prix ?? 0
      };
    } else {
      delete this.selection[item.id];
    }
  }

  changerQuantite(itemId: number, quantite: number) {
    const article = this.selection[itemId];
    if (!article) return;

    const qte = Math.max(1, quantite);
    this.selection[itemId] = { ...article, quantite: qte };
  }

  get articlesSelectionnes(): ArticleCommande[] {
    return Object.values(this.selection);
  }

  validerCommande() {
    const user = this.authService.getCurrentUser();
    
    if (!user) {
      this.message = 'Veuillez vous connecter pour passer une commande.';
      return;
    }

    const articles = this.articlesSelectionnes;
    if (articles.length === 0) {
      this.message = 'Sélectionnez au moins un article.';
      return;
    }

    this.commandesService.creerCommande(articles, user.id).subscribe({
      next: (res) => {
        this.message = `${res.message} — ID : ${res.commande_id}`;
        this.selection = {};
      }
    });
  }
}
