import { NgModule } from "@angular/core";
import { DashboardComponent } from "./dashboard.component";
import { MainComponent } from "./main/main.component";
import { BrowserModule } from "@angular/platform-browser";
import { DashBoardRoutingComponet } from "./dashboard-routing.module";

@NgModule({
    declarations:[
        DashboardComponent,
        MainComponent
    ],
    imports: [
        BrowserModule,
        DashBoardRoutingComponet
    ]
})
export class DashboardModule{}