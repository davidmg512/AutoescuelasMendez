import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Usuario } from '../model/usuario';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  animations:[
    trigger('rotatedState', [
      state('default', style({ transform: 'scaleX(1)' })),
      state('rotated', style({ transform: 'scaleX(-1)' })),
      transition('rotated => default', animate('400ms ease-out')),
      transition('default => rotated', animate('400ms ease-in'))
    ])
  ]
})
export class DashboardComponent implements OnInit{
  state: string = 'rotated';

  constructor(private router: Router, private authService: AuthService){
  }

  ngOnInit(): void {
    if(!this.authService.isLoggedIn()){
      this.router.navigate(['/']);
    }
  }

  get usuario() {
    if(this.authService.usuario == null){
      return "Invitado";
    }else{
      return this.authService.usuario.nombre;
    }
  }

  rotate() {
      this.state = (this.state === 'default' ? 'rotated' : 'default');
  }

  logout(){
    this.authService.logout();
    window.location.reload();
  }

    
}
