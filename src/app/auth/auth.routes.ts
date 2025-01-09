import { Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./auth.component'),
    children: [
      {
        path: 'sign-in',
        loadComponent: () => import('./components/sign-in/sign-in.component'),
      },
      { path: '', redirectTo: 'sign-in', pathMatch: 'full' },
    ],
  },
];

export default routes;
