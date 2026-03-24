import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { DashboardComponent } from './app/dashboard.component';
import { dashboardRoutes } from './app/dashboard.routes';

bootstrapApplication(DashboardComponent, {
  providers: [
    provideRouter(dashboardRoutes)
  ]
}).catch(err => console.error(err));