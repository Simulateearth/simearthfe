import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { SimEngineService } from '../../engine';
import { ConfigurationService } from '../../engine';

@Component({
  selector: 'sme-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  state: any;
  subscription: Subscription;
  log: Array<string> = [];

  constructor(
    private simEngine: SimEngineService,
    private configuration: ConfigurationService ) { }

  ngOnInit() {
    this.simEngine.getLog()
      .subscribe((entry) => {
        this.log.unshift(entry);
        if (this.log.length > 100) {
          this.log.splice(this.log.length - 10, 10);
        }
      });

    this.loadConfig();
  }

  loadConfig() {
    this.simEngine.loadConfig(this.configuration.get());
  }

  restart() {
    this.state = null;
    this.loadConfig();
    this.start();
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
