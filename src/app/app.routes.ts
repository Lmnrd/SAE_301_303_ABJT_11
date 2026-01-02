// ce fichier est utilisé pour configurer les routes de l'application

import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
// import { CommandesComponent } from './commandes/commandes.component';
// supprimé car non utilisé mais gardé en cas de besoin futur
import { CompteComponent } from './compte/compte.component';
import { PanierComponent } from './panier/panier.component';
import { AboutComponent } from './about/about.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'commandes', redirectTo: '/home', pathMatch: 'full' },

  { path: 'compte', component: CompteComponent },
  { path: 'panier', component: PanierComponent },
  { path: 'about', component: AboutComponent }
];
