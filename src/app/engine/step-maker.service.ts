import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/interval';

@Injectable()
export class StepMakerService {
  private currentStep = 0;
  private startStep = 0;

  constructor() { }

  reset() {
    this.currentStep = 0;
    this.startStep = 0;
  }

  start(interval) {
    return Observable.interval(interval)
      .map((step) => {
        if (step === 0) {
          this.startStep = this.currentStep;
        }
        this.currentStep = step + this.startStep;
        return this.currentStep;
      });
  }
}
