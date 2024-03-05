import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AbstractControl } from '@angular/forms';

interface ErrorValidate{
  [str:string]: boolean
}

@Injectable({
  providedIn: 'root'
})
export class ValidatorsService {

  constructor() { }

  /*
  passwordMatchValidator(formgroup: FormGroup): ErrorValidate | null{
    const password = formgroup.get('password').value;
    const repetirpass = formgroup.get('password2').value;

    if(password !== repetirpass){
      return null;
    }else{
      return {
        passwordMatchValidator: true
      }
    }
  }*/

  passwordMatchValidator(control: AbstractControl) : ErrorValidate | null{
    const password = control.value.password;
    const repetirpass = control.value.password2;

    if(password == repetirpass){
      return null;
    }else{
      return {
        passwordMatchValidator: true
      }
    }
  }
}
