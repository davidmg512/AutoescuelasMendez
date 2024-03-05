import { Component } from '@angular/core';
import { TestServiceService } from '../services/test-service.service';
import { AuthService } from '../services/auth.service';
import { FormGroup, FormControl, FormBuilder} from '@angular/forms';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  public testContent: any;

  forma: FormGroup = new FormGroup({
    correo: new FormControl(''),
    password: new FormControl('')
  });

  constructor(private testService: TestServiceService, 
    private authService: AuthService, 
    private fb: FormBuilder,
    private router: Router){
    this.testContent = testService.getTestContent();

    this.forma = this.fb.group({
      correo: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    })
  }

  loginUser(){
    if(this.authService.login(this.forma.get('correo').value, this.forma.get('password').value)){
      this.router.navigate(['/dashboard/main']);
    }
  }

}
