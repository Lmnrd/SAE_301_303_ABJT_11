import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private apiUrl = 'http://localhost/SAE_301_303_ABJT_11/src/api';

  constructor(private http: HttpClient) { }

  getCommandesData(): Observable<any> {
    return this.http.get(`${this.apiUrl}/commandes/get_commandes.php`).pipe(
      map((data: any) => this.transformCommandesData(data)),
      catchError(error => {
        console.error('Erreur lors du chargement des commandes:', error);
        // Retourner des données par défaut en cas d'erreur
        return of({
          commandes: [5, 10, 8, 15, 12, 20, 25, 18, 22, 19, 14, 11],
          chiffreAffaire: [30, 45, 65, 85],
          revenu: [5000, 3000, 2500, 2000, 1000]
        });
      })
    );
  }

  private transformCommandesData(data: any): any {
    // Transformer les données des commandes en données pour les graphiques
    const commandes = new Array(12).fill(0);
    const chiffreAffaire = new Array(4).fill(0);
    const revenu = new Array(5).fill(0);

    console.log('Données reçues de l\'API:', data);

    if (Array.isArray(data)) {
      data.forEach((commande: any) => {
        // Utiliser date_commande au lieu de date (format API)
        const date = new Date(commande.date_commande);
        const month = date.getMonth();
        const quarter = Math.floor(month / 3);

        // Compter les commandes par mois
        commandes[month]++;

        // Utiliser montant_total au lieu de montant (format API)
        const montant = commande.montant_total || 0;

        // Ajouter au chiffre d'affaire par trimestre
        chiffreAffaire[quarter] += montant;

        // Ajouter au revenu (premiers 5 mois)
        if (month < 5) {
          revenu[month] += montant;
        }
      });
    }

    console.log('Statistiques calculées:', { commandes, chiffreAffaire, revenu });
    return { commandes, chiffreAffaire, revenu };
  }
}
