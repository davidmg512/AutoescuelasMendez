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
  preguntaActualIndex: number = 0;

  finalizado:boolean = false;
  aciertos: number = 0;
  errores: number = 0;

  constructor(private testService: TestServiceService){

  }

  ngOnInit(){
    this.preguntasTest = this.testService.get30RandomQuestion();
    this.preguntaActual = this.preguntasTest[0];
  }

  answerQuestion(index: number, answer: string): void {
    this.respuestas[index] = answer;
  }

  submitTest(): void {
    this.finalizado = true;
    this.calcularResultados();
    this.testService.guardarTestRealizado(this.aciertos, this.errores);
  }

  calcularResultados(): void {
    this.aciertos = 0;
    this.errores = 0;
    for (let i = 0; i < this.preguntasTest.length; i++) {
      const respuestaUsuario = this.respuestas[i];
      if (respuestaUsuario) {
        if (this.isRespuestaCorrecta(i, respuestaUsuario)) {
          this.aciertos++;
        } else {
          this.errores++;
        }
      }
    }
  }

  seleccionarOpcion(opcion: string): void {
    if (this.preguntaActual !== null && !this.finalizado) {
      this.answerQuestion(this.preguntaActualIndex, opcion);
      this.navegarAPregunta(this.preguntasTest[this.preguntaActualIndex+1], this.preguntaActualIndex+1);
    }
  }

  navegarAPregunta(pregunta: Test, index: number): void {
    this.preguntaActual = pregunta;
    this.preguntaActualIndex = index;
  }

  isPreguntaRespondida(index: number): boolean {
    return this.respuestas.hasOwnProperty(index);
  }

  isRespuestaCorrecta(index: number, opcion: string): boolean {
    const respuestaCorrecta = this.preguntasTest[index].correcta.split(' ');
    const opcionIndex = opcion === 'a.' ? 0 : opcion === 'b.' ? 1 : 2;
    return respuestaCorrecta[opcionIndex] === '1';
  }

  isRespuestaFallada(index: number, opcion: string): boolean{
    const respuestaCorrecta = this.preguntasTest[index].correcta.split(' ');
    const opcionIndex = opcion === 'a.' ? 0 : opcion === 'b.' ? 1 : 2;

    // Verificar si el usuario ha marcado esta opción
    const respuestaUsuario = this.respuestas[index];
    const marcadoPorUsuario = respuestaUsuario === opcion;

    // Verificar si la opción es incorrecta y ha sido marcada por el usuario
    return respuestaCorrecta[opcionIndex] === '0' && marcadoPorUsuario;
  }

  isRespuestaMarcada(index: number, opcion: string): boolean{
    const respuestaCorrecta = this.preguntasTest[index].correcta.split(' ');
    const opcionIndex = opcion === 'a.' ? 0 : opcion === 'b.' ? 1 : 2;

    // Verificar si el usuario ha marcado esta opción
    const respuestaUsuario = this.respuestas[index];
    const marcadoPorUsuario = respuestaUsuario === opcion;

    return marcadoPorUsuario;
  }
}
