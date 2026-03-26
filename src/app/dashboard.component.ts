import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="dashboard-container">
      
      <main class="dashboard-content">
        <router-outlet></router-outlet>
      </main>
    </div>
  `,
  styles: [`
    
.dashboard-container {
      width: 100%;
    }
    
    .dashboard-header {
      background: linear-gradient(135deg, #c9436b 0%, #a24b85 100%);
      color: white;
      padding: 2rem;
      border-radius: 8px;
      margin-bottom: 2rem;
    }
    
    .dashboard-header h1 {
      margin: 0;
    }
    
    .dashboard-content {
      display: block;
      width: 100%;
      min-height: calc(90vh - 80px);
      padding: 1rem 0;
    }

  `]
})
export class DashboardComponent {}