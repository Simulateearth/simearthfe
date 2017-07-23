import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StepMakerService } from './step-maker.service';
import { SimEngineService } from './sim-engine.service';
import { SimConfService } from './sim-config.service';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    StepMakerService,
    SimEngineService,
    SimConfService
  ],
  declarations: []
})
export class EngineModule { }
