import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EditorComponent } from './editor/editor.component';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    DashboardComponent,
    EditorComponent
  ],
  declarations: [DashboardComponent, EditorComponent]
})
export class SimulationModule { }
