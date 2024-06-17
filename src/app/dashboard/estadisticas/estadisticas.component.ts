import { Component, OnInit } from '@angular/core';
import { TestInfo } from '../../model/testInfo';
import { TestServiceService } from '../../services/test-service.service';
import { ChartType, ChartConfiguration, ChartOptions } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.scss']
})
export class EstadisticasComponent implements OnInit {

  testRealizados: TestInfo[];
  filteredTestRealizados: TestInfo[];
  public filtroSeleccionado: string = 'total';

  // Line Chart Configuration
  public lineChartData: ChartConfiguration<'line'>['data']['datasets'] = [
    { data: [], label: 'Aciertos' },
    { data: [], label: 'Fallos' }
  ];
  public lineChartLabels: string[] = [];
  public lineChartOptions: ChartOptions = {
    responsive: true,
  };
  public lineChartLegend: boolean = true;
  public lineChartType: ChartType = 'line';

  // Bar Chart Configuration
  public barChartData: ChartConfiguration<'bar'>['data']['datasets'] = [
    { data: [], label: 'Aciertos' },
    { data: [], label: 'Fallos' }
  ];
  public barChartLabels: string[] = [];
  public barChartOptions: ChartOptions = {
    responsive: true,
  };
  public barChartType: ChartType = 'bar';

  // Pie Chart Configuration
  public pieChartLabels: string[] = ['Aciertos', 'Fallos'];
  public pieChartData: number[] = [0, 0];
  public pieChartOptions: ChartOptions = {
    responsive: true,
  };
  public pieChartType: ChartType = 'pie';

  // Doughnut Chart Configuration
  public doughnutChartLabels: string[] = ['Aciertos', 'Fallos'];
  public doughnutChartData: number[] = [0, 0];
  public doughnutChartOptions: ChartOptions = {
    responsive: true,
  };
  public doughnutChartType: ChartType = 'doughnut';

  constructor(private testService: TestServiceService) { }

  ngOnInit(): void {
    this.testRealizados = this.testService.getTestRealizados();
    this.applyFilter();
  }

  applyFilter(): void {
    switch (this.filtroSeleccionado) {
      case 'semanal':
        this.filteredTestRealizados = this.filterByWeek(this.testRealizados);
        break;
      case 'mensual':
        this.filteredTestRealizados = this.filterByMonth(this.testRealizados);
        break;
      default:
        this.filteredTestRealizados = this.testRealizados;
        break;
    }
    this.updateChartData();
  }

  updateChartData(): void {
    // Update Line Chart
    this.lineChartData[0].data = this.testRealizados.map(test => +test.aciertos);
    this.lineChartData[1].data = this.testRealizados.map(test => +test.fallos);
    this.lineChartLabels = this.testRealizados.map(test => {
      const date = new Date(test.fecha);
      return date.toLocaleDateString('es-ES', {
        year: '2-digit',
        month: 'short',
        day: 'numeric'
      });
    });

    // Update Bar Chart
    this.barChartData[0].data = this.testRealizados.map(test => +test.aciertos);
    this.barChartData[1].data = this.testRealizados.map(test => +test.fallos);
    this.barChartLabels = [...this.lineChartLabels];
  }

  filterByWeek(tests: TestInfo[]): TestInfo[] {
    const today = new Date();
    const oneWeekAgo = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7);
    return tests.filter(test => new Date(test.fecha) >= oneWeekAgo);
  }

  // Filtrar por mes
  filterByMonth(tests: TestInfo[]): TestInfo[] {
    const today = new Date();
    const oneMonthAgo = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate());
    return tests.filter(test => new Date(test.fecha) >= oneMonthAgo);
  }

  getTotalAciertos(): number {
    return this.filteredTestRealizados.reduce((sum, test) => sum + +test.aciertos, 0);
  }

  getTotalFallos(): number {
    return this.filteredTestRealizados.reduce((sum, test) => sum + +test.fallos, 0);
  }

  // Función para calcular el promedio de aciertos y fallos
  getPromedioAciertos(): number {
    return this.getTotalAciertos() / this.filteredTestRealizados.length;
  }

  getPromedioFallos(): number {
    return this.getTotalFallos() / this.filteredTestRealizados.length;
  }
}
