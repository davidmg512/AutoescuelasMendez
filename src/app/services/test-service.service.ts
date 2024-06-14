import { Injectable } from '@angular/core';
import { dataA1 } from './data_A1.js';
import { dataB } from './data_B.js';
import { Test } from '../model/test.js' 

@Injectable({
  providedIn: 'root'
})
export class TestServiceService {

  constructor() { }

  private testContent:Test[] = dataB;

  getTestContent(){
    return this.testContent;
  }

  get30RandomQuestion(){
    this.testContent.sort(() => Math.random() - 0.5);

    return this.testContent.slice(0, 30);
  }
}
