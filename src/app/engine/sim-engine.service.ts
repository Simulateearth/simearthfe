import { StepMakerService } from './step-maker.service';

import { Injectable } from '@angular/core';

import { Observable, Subscription, BehaviorSubject } from 'rxjs/Rx';
import 'rxjs/add/operator/switchMap';

@Injectable()
export class SimEngineService {
  private config: any = {};
  private startState: any = {};
  private nextState: any = {};
  private history: Array<any> = [];
  private stateObservable: BehaviorSubject<any>;
  private observeState: Observable<any>;
  private stepMakerSubscription: Subscription;
  private log: BehaviorSubject<any>;

  constructor(private stepMaker: StepMakerService) {
    this.log = new BehaviorSubject('empty log');
    this.stateObservable = new BehaviorSubject({});
  }

  getConfig() {
    return this.config;
  }

  loadConfig(config: any) {
    this.config = config;

    this.stepMaker.reset();

    this.startState = config.state;
    this.startState.currentStep = 0;

    this.nextState = Object.assign({}, this.startState);
    this.stateObservable.next(this.startState);
  }

  start() {
    if (this.stepMakerSubscription === undefined || this.stepMakerSubscription.closed) {
      this.stepMakerSubscription = this.stepMaker
        .start(this.config.interval)
        .subscribe((step) => {
          this.nextStep(step);
        });
    }
    return this.stateObservable;
  }

  stop() {
    if (this.stepMakerSubscription !== undefined) {
      this.stepMakerSubscription.unsubscribe();
    }
  }

  restart() {
    this.loadConfig(this.config);
    return this.start();
  }

  getLog() {
    return this.log;
  }

  getState() {
    return this.stateObservable;
  }

  nextStep(step: number): BehaviorSubject<any> {
    this.log.next('Taking next Step: ' + step);

    const nextState = Object.assign({}, this.nextState);
    this.history.push(nextState);
    nextState.currentStep = step;

    const nextStateWithEffects = this.runEffects(nextState, this.config.effects);

    this.nextState = nextStateWithEffects;
    this.stateObservable.next(nextStateWithEffects);

    return this.stateObservable;
  }

  runEffects(nextState, effects) {
    for (let effectKey = 0; effectKey < effects.length; effectKey++) {
      if (this.effectProbable(effects[effectKey], nextState)) {
        nextState = this.runEffect(effects[effectKey], nextState);
      }
    }
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

  runEffect(effect, nextState) {
    const origValue = parseFloat(nextState[effect.change]);
    const factor = parseFloat(nextState[effect.factorReference]);
    nextState[effect.change] = origValue * factor;

    /* change to push due to performance - as ui is ready*/
    this.log.next(
      `Effect ${effect.title} changes: ${effect.change}: ${origValue} * ${factor} == ${nextState[effect.change]}`);

    return nextState;
  }

}
