import { Routes } from '@angular/router';
import { AnalyticsComponent } from './features/analytics/analytics.component';
import { ReportsComponent } from './features/reports/reports.component';

export const dashboardRoutes: Routes = [
  {
    path: '',
    component: AnalyticsComponent,
    pathMatch: 'full'
  },
  {
    path: 'reports',
    component: ReportsComponent
  }
];

export const Module = {
  routes: dashboardRoutes
};