import { DashboardComponent } from "./dashboard.component";
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from "./main/main.component";
import { TestpageComponent } from "./testpage/testpage.component";


const routes: Routes = [
    {
      path: 'dashboard',
      component: DashboardComponent,
      children: [
        { path: 'main', component: MainComponent },
        { path: 'testPage', component: TestpageComponent }
      ]
    },
  ];


  @NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class DashBoardRoutingComponet {}