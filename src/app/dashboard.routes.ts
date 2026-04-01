import { Routes } from '@angular/router';
import { AnalyticsComponent } from './features/analytics/analytics.component';
import { ReportsComponent } from './features/reports/reports.component';
import { AdminDashboardComponent } from './features/analytics/admin-dashboard.component';

export const dashboardRoutes: Routes = [
  {
    path: '',
    component: AdminDashboardComponent,
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