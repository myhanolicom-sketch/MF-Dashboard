import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="dashboard-container">
      <router-outlet></router-outlet>
    </div>
  `,
  styles: [`
    :host {
      display: flex;
      justify-content: center;
      width: 100%;
      min-height: auto;
      padding: 1.25rem;
      background: #fff;
    }

    .dashboard-container {
      width: 100%;
      display: block;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 2rem;
    }

    .dashboard-header {
      background: linear-gradient(135deg, #bfc7c7 0%, #f5576c 100%);
      color: white;
      padding: 2rem;
      border-radius: 8px;
      margin-bottom: 2rem;
    }

    .dashboard-header h1 {
      margin: 0;
    }
  `]
})
export class DashboardComponent {}