import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import {
  SimEngineService,
  SimConfService,
  SimConfig
} from '../../engine';

@Component({
  selector: 'sme-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  state: any;
  error: string;
  config: SimConfig;
  observing: any = {};

  constructor(
    private simEngine: SimEngineService) { }

  ngOnInit() {
    this.getState();
    this.config = this.simEngine.getConfig();
    this.observeControls();
  }

  observeControls() {
    this.config.controls.forEach(control => {
      this.observing[control.valueToTrack] = this.simEngine.observeValue(control.valueToTrack);
    });
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
