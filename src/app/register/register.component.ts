import { Component } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ValidatorsService } from '../services/validators.service';
import { AuthService } from '../services/auth.service';
import { Usuario } from '../model/usuario';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  user: Usuario = new Usuario();

  forma: FormGroup = new FormGroup({
    nombre: new FormControl(''),
    apellidos: new FormControl(''),
    dni: new FormControl(''),
    correo: new FormControl(''),
    password: new FormControl(''),
    password2: new FormControl('')
  });

  constructor(private fb: FormBuilder, 
    private validadores: ValidatorsService, 
    private authService: AuthService,
    private router: Router){
    this.forma = this.fb.group({
      nombre: ['', Validators.required],
      apellidos: ['', Validators.required],
      dni: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      password2: ['', [Validators.required, this.validadores.passwordMatchValidator]]
    })
  }

  get contrasenyaNoValida(){
    return this.forma.get('password2').invalid && 
      this.forma.get('password2').touched;
  }

  registrarse(){
    if(this.forma.valid){
      this.user.nombre = this.forma.get('nombre').value;
      this.user.apellidos = this.forma.get('apellidos').value;
      this.user.DNI = this.forma.get('dni').value;
      this.user.correo = this.forma.get('correo').value;
      this.user.password = this.forma.get('password').value;

      this.authService.register(this.user);
      this.router.navigate(['/']);
    } 
  }
}
