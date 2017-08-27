import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { SimEngineService } from '../../engine';
import { SimConfService } from '../../engine';

@Component({
  selector: 'sme-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  state: any;
  log: Array<string> = [];
  error: string;

  constructor(
    private simEngine: SimEngineService,
    private simConf: SimConfService) { }

  ngOnInit() {
    this.getLog();
    this.getState();
  }

  getLog() {
    this.simEngine.getLog()
      .subscribe(
        (entry) => {
          this.log.unshift(entry);
          if (this.log.length > 100) {
            this.log.splice(this.log.length - 10, 10);
          }
        },
        error => this.error = error,
        () => {
          this.log = [];
          this.getLog()
        }
      );
  }

  getState() {
    this.simEngine
      .getState()
      .subscribe(
      (nextState) => {
        this.state = nextState;
      },
      (error) => {
        this.error = error;
      });
  }
}
