import {Routes} from '@angular/router';
import {MainComponent} from './components/main/main.component';
import {LandingComponent} from './components/landing/landing.component';

export const rootRouterConfig: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'main',
    component: MainComponent
  },
  {
    path: 'home',
    component: LandingComponent
  }
];
