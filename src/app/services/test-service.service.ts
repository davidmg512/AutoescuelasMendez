import { Injectable } from '@angular/core';
import { dataA1 } from './data_A1.js';
import { dataB } from './data_B.js';
import { Test } from '../model/test.js';
import { TestInfo } from '../model/testInfo.js';

@Injectable({
  providedIn: 'root'
})
export class TestServiceService {

  constructor() { 
    this.recuperarTestsRealizados();
  }

  private testContent:Test[] = dataB;
  private testsRealizados: TestInfo[] = [];

  getTestContent(){
    return this.testContent;
  }

  get30RandomQuestion(){
    this.testContent.sort(() => Math.random() - 0.5);

    return this.testContent.slice(0, 30);
  }

  guardarTestRealizado(aciertos: number, fallos: number): void {
    const fecha = new Date().toISOString(); // Genera la fecha actual en formato ISO
    const nuevoTest: TestInfo = { fecha, aciertos, fallos };

    // Agrega el nuevo test realizado al array
    this.testsRealizados.push(nuevoTest);

    // Guarda el array actualizado en LocalStorage
    localStorage.setItem('testsRealizados', JSON.stringify(this.testsRealizados));
  }

  private recuperarTestsRealizados(): void {
    const testsGuardados = localStorage.getItem('testsRealizados');
    this.testsRealizados = testsGuardados ? JSON.parse(testsGuardados) : [];
  }

  getTestRealizados(){
    this.recuperarTestsRealizados();
    return this.testsRealizados;
  }
}
