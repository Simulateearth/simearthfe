import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EditorComponent } from './editor/editor.component';
import { ControlsComponent } from './controls/controls.component';
import { MonitorComponent } from './monitor/monitor.component';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    DashboardComponent,
    EditorComponent,
    ControlsComponent,
    MonitorComponent
  ],
  declarations: [DashboardComponent, EditorComponent, ControlsComponent, MonitorComponent]
})
export class SimulationModule { }
