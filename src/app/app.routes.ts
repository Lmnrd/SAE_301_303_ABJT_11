import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { CommandesComponent } from './commandes/commandes.component';
import { CompteComponent } from './compte/compte.component';
import { PanierComponent } from './panier/panier.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'commandes', component: CommandesComponent },
  { path: 'compte', component: CompteComponent },
  { path: 'panier', component: PanierComponent }
];
