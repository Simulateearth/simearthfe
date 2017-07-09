import { StepMakerService } from './step-maker.service';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { BehaviorSubject } from 'rxjs/Rx';
import 'rxjs/add/operator/switchMap';

@Injectable()
export class SimEngineService {
  private config: any = {};
  private startState: any = {};
  private nextState: any = {};
  private history: Array<any> = [];
  private simulate: BehaviorSubject<any>;

  constructor(
    private stepMaker: StepMakerService) { }

  getConfig() {
    return this.config;
  }

  loadConfig(config: any) {
    this.config = config;
    this.startState = config.state;
    this.simulate = new BehaviorSubject(this.startState);
  }

  start() {
    return this.stepMaker
      .start()
      .switchMap((step) => {
        return this.nextStep(step);
      })
  }

  nextStep(step: number): BehaviorSubject<any> {
    this.nextState = Object.apply({}, this.startState);
    this.history.push(this.nextState);

    this.nextState.currentStep = step;

    this.simulate.next(this.nextState);

    return this.simulate;
  }
}
