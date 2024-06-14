import { Component } from '@angular/core';
import { TestServiceService } from '../../services/test-service.service';
import { Test } from '../../model/test'; 

@Component({
  selector: 'app-testpage',
  templateUrl: './testpage.component.html',
  styleUrl: './testpage.component.scss'
})
export class TestpageComponent {

  preguntasTest:Test[] = [];
  respuestas: { [key: number]: string } = {};
  preguntaActual: Test | null = null;

  constructor(private testService: TestServiceService){

  }

  ngOnInit(){
    this.preguntasTest = this.testService.get30RandomQuestion();
    console.log(this.preguntasTest);
    this.preguntaActual = this.preguntasTest[0];
  }

  answerQuestion(index: number, answer: string): void {
    this.respuestas[index] = answer;
  }

  submitTest(): void {
    // Procesa las respuestas del test
    console.log(this.respuestas);
    // Aquí podrías enviar las respuestas al servidor para su evaluación
  }

  seleccionarOpcion(opcion: string): void {
    // Lógica para seleccionar la opción de la pregunta actual
    // Aquí puedes implementar la lógica según tus necesidades
  }

  navegarAPregunta(pregunta: Test): void {
    // Navegar a la pregunta seleccionada
    this.preguntaActual = pregunta;
  }

}
