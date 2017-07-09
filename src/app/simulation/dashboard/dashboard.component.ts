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
    this.simEngine.loadConfig({ state: { currentStep: 0 } });
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
