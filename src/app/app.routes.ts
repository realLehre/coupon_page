import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'coupons', pathMatch: 'full' },
  {
    path: 'coupons',
    loadComponent: () =>
      import('./coupons/coupons.component').then((m) => m.CouponsComponent),
  },
  {
    path: '**',
    loadComponent: () =>
      import('./page-not-found/page-not-found.component').then(
        (m) => m.PageNotFoundComponent,
      ),
  },
];
