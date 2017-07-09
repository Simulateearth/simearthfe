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
    this.startState.currentStep = 0;
    this.startState.log = [];
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
    this.nextState = Object.assign({}, this.startState);
    this.history.push(this.nextState);

    this.nextState.currentStep = step;

    this.nextState = this.runEffects(Object.assign({}, this.nextState), this.config.effects);

    this.simulate.next(this.nextState);

    return this.simulate;
  }

  runEffects(nextState, effects) {
    for (let effectKey = 0; effectKey < effects.length; effectKey++) {
      nextState = this.runEffect(nextState, effects[effectKey]);
    }
    return nextState;
  }

  runEffect(nextState, effect) {
    const origValue = parseFloat(nextState[effect.change]);
    const factor = parseFloat(nextState[effect.factorReference]);
    nextState[effect.change] = origValue * factor;

    nextState.log.push(
      `Effect ${effect.title} changes: ${effect.change}": ${origValue} * ${factor} == ${nextState[effect.change]}`);

    return nextState;
  }
}
