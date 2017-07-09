import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { SimulationModule } from './simulation';
import { EngineModule } from './engine';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Error404Component } from './error404/error404.component';
import { AboutComponent } from './about/about.component';

@NgModule({
  declarations: [
    AppComponent,
    Error404Component,
    AboutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    EngineModule,
    SimulationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
