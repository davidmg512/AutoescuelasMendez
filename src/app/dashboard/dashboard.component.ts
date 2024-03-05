import { Component } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';

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
export class DashboardComponent {
  state: string = 'default';
    rotate() {
        this.state = (this.state === 'default' ? 'rotated' : 'default');
    }
}
