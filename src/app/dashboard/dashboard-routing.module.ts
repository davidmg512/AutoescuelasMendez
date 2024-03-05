import { DashboardComponent } from "./dashboard.component";
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from "./main/main.component";


const routes: Routes = [
    {
      path: 'dashboard',
      component: DashboardComponent,
      children: [
        { path: 'main', component: MainComponent }
      ]
    },
  ];


  @NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class DashBoardRoutingComponet {}