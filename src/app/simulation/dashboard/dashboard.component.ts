import { SimEngineService } from '../../engine';

import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'sme-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  state: any;
  subscription: Subscription;
  log: Array<string> = [];

  constructor(private simEngine: SimEngineService) { }

  ngOnInit() {
    this.simEngine.loadConfig(
      {
        interval: 300,
        state: {
          currentStep: 0,
          population: 7500000000,
          dailyDeathRate: 0.999979787,
          dailyBirthRate: 1.000048,
          metoriteProbability: 100 /* 1 of x days */,
          metoriteDeathRate: 0.5
        },
        effects: [
          {
            title: 'death',
            change: 'population',
            factorReference: 'dailyDeathRate',
            probability: 1
          },
          {
            title: 'birth',
            change: 'population',
            factorReference: 'dailyBirthRate',
            probability: 1
          },
          {
            title: 'metorite',
            change: 'population',
            factorReference: 'metoriteDeathRate',
            probabilityReference: 'metoriteProbability'
          }
        ]
      });

    this.simEngine.getLog()
      .subscribe((entry) => {
        this.log.unshift(entry);
        if (this.log.length > 100) {
          this.log.splice(this.log.length - 10, 10);
        }
      });
  }

  start() {
    this.subscription = this.simEngine.start().subscribe(
      ((nextState) => {
        this.state = nextState;
      })
    );
  }

  stop() {
    this.subscription.unsubscribe();
  }
}
