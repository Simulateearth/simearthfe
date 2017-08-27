import { Component, OnInit } from '@angular/core';
import { SimEngineService } from '../../engine';
import { SimConfService } from '../../engine';

@Component({
  selector: 'sme-monitor',
  templateUrl: './monitor.component.html',
  styleUrls: ['./monitor.component.css']
})
export class MonitorComponent implements OnInit {
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
