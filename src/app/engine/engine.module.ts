import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StepMakerService } from './step-maker.service';
import { SimEngineService } from './sim-engine.service';
import { ConfigurationService } from './configuration.service';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    StepMakerService,
    SimEngineService,
    ConfigurationService
  ],
  declarations: []
})
export class EngineModule { }
