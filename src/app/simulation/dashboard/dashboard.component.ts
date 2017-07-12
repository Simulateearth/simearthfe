import { SimEngineService } from '../../engine';

import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { simpleEarthConfig } from '../../simpleEarthConfig';

@Component({
  selector: 'sme-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  state: any;
  subscription: Subscription;
  log: Array<string> = [];
  configJson: string = JSON.stringify(simpleEarthConfig, null, 4);

  constructor(private simEngine: SimEngineService) { }

  ngOnInit() {
    this.simEngine.getLog()
      .subscribe((entry) => {
        this.log.unshift(entry);
        if (this.log.length > 100) {
          this.log.splice(this.log.length - 10, 10);
        }
      });
  }

  loadConfig() {
    this.simEngine.loadConfig(JSON.parse(this.configJson));
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
