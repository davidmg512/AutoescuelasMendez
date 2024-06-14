import { NgModule } from "@angular/core";
import { DashboardComponent } from "./dashboard.component";
import { MainComponent } from "./main/main.component";
import { BrowserModule } from "@angular/platform-browser";
import { DashBoardRoutingComponet } from "./dashboard-routing.module";
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatNavList} from '@angular/material/list';
import { TestpageComponent } from './testpage/testpage.component';

@NgModule({
    declarations:[
        DashboardComponent,
        MainComponent,
        TestpageComponent
    ],
    imports: [
        BrowserModule,
        DashBoardRoutingComponet,
        MatSidenavModule,
        MatButtonModule,
        MatIconModule,
        BrowserAnimationsModule,
        MatToolbarModule,
        MatNavList
    ]
})
export class DashboardModule{}