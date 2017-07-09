import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/interval';

@Injectable()
export class StepMakerService {
  private currentStep = 0;

  constructor() { }

  start() {
    return Observable.interval(500)
      .map((step) => {
        if (step < this.currentStep) {
          this.currentStep = step + this.currentStep;
        } else {
          this.currentStep = step;
        }
        return this.currentStep;
      });
  }
}
