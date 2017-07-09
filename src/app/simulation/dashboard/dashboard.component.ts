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

  constructor(private simEngine: SimEngineService) { }

  ngOnInit() {
    this.simEngine.loadConfig(
      {
        state: {
          currentStep: 0,
          population: 7500000000,
          dailyDeathRate: 0.999979787,
          dailyBirthRate: 1.000048
        },
        effects: [
          {
            title: 'death',
            change: 'population',
            factorReference: 'dailyDeathRate'
          },
          {
            title: 'birth',
            change: 'population',
            factorReference: 'dailyBirthRate'
          }
        ]
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
