import { Component, signal, effect } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-analytics',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="analytics">
      <h2>📈 Analítica en Tiempo Real MultiRepo</h2>

      <div class="analytics-grid">
        <div class="metric-card">
          <div class="metric-label">Visitas Hoy</div>
          <div class="metric-value">{{ visitsToday() }}</div>
          <div class="metric-trend up">↑ +12% vs ayer</div>
        </div>

        <div class="metric-card">
          <div class="metric-label">Usuarios Activos</div>
          <div class="metric-value">{{ activeUsers() }}</div>
          <div class="metric-trend up">↑ +8% vs ayer</div>
        </div>

        <div class="metric-card">
          <div class="metric-label">Tasa de Conversión</div>
          <div class="metric-value">{{ conversionRate() | number:'1.1-2' }}%</div>
          <div class="metric-trend down">↓ -2% vs ayer</div>
        </div>

        <div class="metric-card">
          <div class="metric-label">Valor Medio de Pedido</div>
          <div class="metric-value">{{ averageOrder() | currency }}</div>
          <div class="metric-trend up">↑ +5% vs ayer</div>
        </div>
      </div>

     
    </div>
  `,
  styles: [`
    .analytics {
      padding: 1rem;
    }

    h2 {
      color: #333;
      margin-bottom: 2rem;
    }

    .analytics-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 1.5rem;
      margin-bottom: 2rem;
    }

    .metric-card {
      background: white;
      padding: 1.5rem;
      border-radius: 8px;
      border-left: 4px solid #f5576c;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    .metric-label {
      color: #666;
      font-size: 0.9rem;
      margin-bottom: 0.5rem;
    }

    .metric-value {
      font-size: 2.5rem;
      font-weight: bold;
      color: #f5576c;
      margin: 0.5rem 0;
    }

    .metric-trend {
      font-size: 0.85rem;
      margin-top: 0.5rem;
    }

    .metric-trend.up {
      color: #10b981;
    }

    .metric-trend.down {
      color: #ef4444;
    }

    .refresh-btn {
      background: #f5576c;
      color: white;
      border: none;
      padding: 0.75rem 1.5rem;
      border-radius: 4px;
      cursor: pointer;
      font-weight: 500;
    }

    .refresh-btn:hover {
      background: #e53e50;
    }
  `]
})
export class AnalyticsComponent {
  visitsToday = signal(1250);
  activeUsers = signal(342);
  conversionRate = signal(3.45);
  averageOrder = signal(125.50);

  constructor() {
    effect(() => {
      console.log('Analítica actualizada:', {
        visits: this.visitsToday(),
        users: this.activeUsers(),
        conversion: this.conversionRate(),
        avg: this.averageOrder()
      });
    });
  }

  refreshMetrics() {
    this.visitsToday.update(v => v + Math.floor(Math.random() * 50));
    this.activeUsers.update(u => u + Math.floor(Math.random() * 20) - 10);
    this.conversionRate.update(r => Math.max(1, r + (Math.random() - 0.5)));
    this.averageOrder.update(a => a + (Math.random() - 0.5) * 10);
  }
}