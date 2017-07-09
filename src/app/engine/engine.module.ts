import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StepMakerService } from './step-maker.service';
import { SimEngineService } from './sim-engine.service';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    StepMakerService,
    SimEngineService
  ],
  declarations: []
})
export class EngineModule { }
