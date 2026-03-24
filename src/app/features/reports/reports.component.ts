import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="reports">
      <h2>📋 Reportes</h2>

      <div class="reports-list">
        <div class="report-item">
          <div class="report-info">
            <h3>Reporte Mensual</h3>
            <p>Análisis completo de las métricas del mes actual</p>
            <span class="date">Generado: Marzo 2026</span>
          </div>
          <button>Descargar</button>
        </div>

        <div class="report-item">
          <div class="report-info">
            <h3>Reporte de Usuarios</h3>
            <p>Segmentación y comportamiento de usuarios</p>
            <span class="date">Generado: Marzo 2026</span>
          </div>
          <button>Descargar</button>
        </div>

        <div class="report-item">
          <div class="report-info">
            <h3>Reporte de Conversión</h3>
            <p>Análisis de embudo de conversión y abandonos</p>
            <span class="date">Generado: Marzo 2026</span>
          </div>
          <button>Descargar</button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .reports {
      padding: 1rem;
    }

    h2 {
      color: #333;
      margin-bottom: 2rem;
    }

    .reports-list {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .report-item {
      background: white;
      padding: 1.5rem;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .report-info h3 {
      color: #333;
      margin: 0 0 0.5rem 0;
    }

    .report-info p {
      color: #666;
      margin: 0 0 0.5rem 0;
    }

    .date {
      color: #999;
      font-size: 0.85rem;
    }

    button {
      background: #f5576c;
      color: white;
      border: none;
      padding: 0.75rem 1.5rem;
      border-radius: 4px;
      cursor: pointer;
      white-space: nowrap;
    }

    button:hover {
      background: #e53e50;
    }
  `]
})
export class ReportsComponent {}