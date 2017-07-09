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
  private log: BehaviorSubject<any>;

  constructor(private stepMaker: StepMakerService) {
    this.log = new BehaviorSubject('empty log');
  }

  getConfig() {
    return this.config;
  }

  loadConfig(config: any) {
    this.config = config;

    this.startState = config.state;
    this.startState.currentStep = 0;

    this.nextState = Object.assign({}, this.startState);
    this.simulate = new BehaviorSubject(this.startState);
  }

  start() {
    return this.stepMaker
      .start(this.config.interval)
      .switchMap((step) => {
        return this.nextStep(step);
      })
  }

  getLog() {
    return this.log;
  }

  nextStep(step: number): BehaviorSubject<any> {
    this.log.next('Taking next Step: ' + step);

    const nextState = Object.assign({}, this.nextState);
    this.history.push(nextState);
    nextState.currentStep = step;

    const nextStateWithEffects = this.runEffects(nextState, this.config.effects);

    this.nextState = nextState;
    this.simulate.next(nextStateWithEffects);

    return this.simulate;
  }

  runEffects(nextState, effects) {
    for (let effectKey = 0; effectKey < effects.length; effectKey++) {
      if (this.effectProbable(effects[effectKey], nextState)) {
        nextState = this.runEffect(nextState, effects[effectKey]);
      }
    }
    return nextState;
  }

  runEffect(nextState, effect) {
    const origValue = parseFloat(nextState[effect.change]);
    const factor = parseFloat(nextState[effect.factorReference]);
    nextState[effect.change] = origValue * factor;

    /* change to push due to performance - as ui is ready*/
    this.log.next(
      `Effect ${effect.title} changes: ${effect.change}: ${origValue} * ${factor} == ${nextState[effect.change]}`);

    return nextState;
  }

  effectProbable(effect, nextState) {
    let probability = 1;

    if (effect.probability !== undefined) {
      probability = effect.probability;
    } else if (effect.probabilityReference !== undefined) {
      probability = nextState[effect.probabilityReference];
    }

    if (probability === 1) {
      return true;
    } else {
      return Math.floor((Math.random() * probability) + 1) === 1;
    }
  }
}
