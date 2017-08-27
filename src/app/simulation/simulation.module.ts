import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EditorComponent } from './editor/editor.component';
import { ControlsComponent } from './controls/controls.component';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    DashboardComponent,
    EditorComponent,
    ControlsComponent
  ],
  declarations: [DashboardComponent, EditorComponent, ControlsComponent]
})
export class SimulationModule { }
