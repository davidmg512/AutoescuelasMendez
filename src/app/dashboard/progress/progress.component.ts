import { Component } from '@angular/core';
import { TestServiceService } from '../../services/test-service.service';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrl: './progress.component.scss'
})
export class ProgressComponent {

  testsRealizados: any[] = []; // Aquí almacenaremos los tests realizados
  ordenDescendente: boolean = true;

  constructor(private testService: TestServiceService) { }

  ngOnInit(): void {
    this.testsRealizados = this.testService.getTestRealizados();
    this.testsRealizados.sort((a, b) => this.compareDates(b.fecha, a.fecha));
  }

  ordenarPorFecha(): void {
    
    if(this.ordenDescendente){
      this.ordenDescendente = false;
    }else{
      this.ordenDescendente = true;
    }

    if (this.ordenDescendente) {
      this.testsRealizados.sort((a, b) => this.compareDates(b.fecha, a.fecha));
    } else {
      this.testsRealizados.sort((a, b) => this.compareDates(a.fecha, b.fecha));
    }
  }

  compareDates(dateA: string, dateB: string): number {
    const dateATime = new Date(dateA).getTime();
    const dateBTime = new Date(dateB).getTime();
    return dateATime - dateBTime;
  }
}
