import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration } from 'chart.js';
import { DashboardService } from '../services/dashboard.service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, BaseChartDirective],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent implements OnInit {
  contactForm: FormGroup;
  isBrowser = false;

  // Chart data
  commandesChartData: ChartConfiguration<'line'>['data'] = { labels: [], datasets: [] };
  commandesChartOptions: ChartConfiguration<'line'>['options'] = {};

  chiffreAffaireChartData: ChartConfiguration<'line'>['data'] = { labels: [], datasets: [] };
  chiffreAffaireChartOptions: ChartConfiguration<'line'>['options'] = {};

  revenuChartData: ChartConfiguration<'bar'>['data'] = { labels: [], datasets: [] };
  revenuChartOptions: ChartConfiguration<'bar'>['options'] = {};

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private dashboardService: DashboardService,
    @Inject(PLATFORM_ID) private platformId: any
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    this.contactForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      message: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  ngOnInit() {
    this.loadDashboardData();
  }

  loadDashboardData() {
    this.dashboardService.getCommandesData().subscribe((data: any) => {
      this.initializeCharts(data);
    });
  }

  initializeCharts(data: any) {
    const months = ['Jan.', 'Fév.', 'Mars', 'Avr.', 'Mai', 'Juin', 'Juil.', 'Août', 'Sept.', 'Oct.', 'Nov.', 'Déc.'];

    // Commandes Chart
    this.commandesChartData = {
      labels: months,
      datasets: [
        {
          label: 'Commandes',
          data: data.commandes || [5, 10, 8, 15, 12, 20, 25, 18, 22, 19, 14, 11],
          borderColor: '#ff8c00',
          backgroundColor: 'rgba(255, 140, 0, 0.1)',
          borderWidth: 3,
          tension: 0.4,
          fill: true,
          pointRadius: 6,
          pointBackgroundColor: '#ff8c00',
          pointBorderColor: '#fff',
          pointBorderWidth: 2,
          pointHoverRadius: 8
        }
      ]
    };

    this.commandesChartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: true,
          labels: {
            color: '#fff',
            font: { size: 12, weight: 'bold' }
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          grid: { color: 'rgba(255, 255, 255, 0.1)' },
          ticks: { color: '#fff' }
        },
        x: {
          grid: { display: false },
          ticks: { color: '#fff' }
        }
      }
    };

    // Chiffre d'Affaire Chart
    this.chiffreAffaireChartData = {
      labels: ['Q1', 'Q2', 'Q3', 'Q4'],
      datasets: [
        {
          label: 'Chiffre d\'Affaire',
          data: data.chiffreAffaire || [30, 45, 65, 85],
          borderColor: '#ff8c00',
          backgroundColor: 'rgba(255, 140, 0, 0.2)',
          borderWidth: 3,
          tension: 0.4,
          fill: true,
          pointRadius: 8,
          pointBackgroundColor: '#ff8c00',
          pointBorderColor: '#fff',
          pointBorderWidth: 2
        }
      ]
    };

    this.chiffreAffaireChartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: true,
          labels: {
            color: '#fff',
            font: { size: 12, weight: 'bold' }
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          grid: { color: 'rgba(255, 255, 255, 0.1)' },
          ticks: { color: '#fff' }
        },
        x: {
          grid: { display: false },
          ticks: { color: '#fff' }
        }
      }
    };

    // Revenu Chart (Horizontal Bar)
    this.revenuChartData = {
      labels: ['Jan.', 'Fév.', 'Mars', 'Avr.', 'Mai'],
      datasets: [
        {
          label: 'Revenu',
          data: data.revenu || [5000, 3000, 2500, 2000, 1000],
          backgroundColor: [
            'rgba(255, 140, 0, 0.8)',
            'rgba(255, 140, 0, 0.7)',
            'rgba(255, 140, 0, 0.6)',
            'rgba(255, 140, 0, 0.5)',
            'rgba(255, 140, 0, 0.4)'
          ],
          borderColor: '#ff8c00',
          borderWidth: 2,
          borderRadius: 8
        }
      ]
    };

    this.revenuChartOptions = {
      indexAxis: 'y' as const,
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: true,
          labels: {
            color: '#fff',
            font: { size: 12, weight: 'bold' }
          }
        }
      },
      scales: {
        x: {
          beginAtZero: true,
          grid: { color: 'rgba(255, 255, 255, 0.1)' },
          ticks: { color: '#fff' }
        },
        y: {
          grid: { display: false },
          ticks: { color: '#fff' }
        }
      }
    };
  }

  retour() {
    this.router.navigate(['/home']);
  }

  onSubmit() {
    if (this.contactForm.valid) {
      const formData = this.contactForm.value;
      console.log('Formulaire soumis:', formData);
      // TODO: Ajouter la logique pour envoyer les données au serveur
      alert('Merci pour votre message! Nous vous répondrons bientôt.');
      this.contactForm.reset();
    } else {
      alert('Veuillez remplir correctement tous les champs.');
    }
  }
}
