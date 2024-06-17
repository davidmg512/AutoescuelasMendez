import { DashboardComponent } from "./dashboard.component";
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from "./main/main.component";
import { TestpageComponent } from "./testpage/testpage.component";
import { ProgressComponent } from "./progress/progress.component";
import { EstadisticasComponent } from "./estadisticas/estadisticas.component";
import { AcercaDeComponent } from "./acerca-de/acerca-de.component";


const routes: Routes = [
    {
      path: 'dashboard',
      component: DashboardComponent,
      children: [
        { path: 'main', component: MainComponent },
        { path: 'testPage', component: TestpageComponent },
        { path: 'progress', component: ProgressComponent },
        { path: 'estadisticas', component: EstadisticasComponent},
        { path: 'acerca-de', component: AcercaDeComponent}
      ]
    },
  ];


  @NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class DashBoardRoutingComponet {}