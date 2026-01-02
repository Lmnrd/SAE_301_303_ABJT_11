// ce fichier est utilisé pour configurer le serveur de rendu côté serveur

import { ApplicationConfig } from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withInMemoryScrolling({ anchorScrolling: 'enabled', scrollPositionRestoration: 'enabled' })),
    // active l’API fetch pour HttpClient
    provideHttpClient(withFetch()),
    provideCharts(withDefaultRegisterables())
  ]
};

