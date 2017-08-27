import { Component, OnInit } from '@angular/core';
import { SimEngineService } from '../../engine';
import { SimConfService } from '../../engine';

@Component({
  selector: 'sme-controls',
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.css']
})
export class ControlsComponent implements OnInit {
  steps = 0;

  constructor(
    private simEngine: SimEngineService,
    private simConf: SimConfService) { }

  ngOnInit() {
    this.loadConfig();
  }

  loadConfig() {
    this.simEngine.loadConfig(this.simConf.get());
  }

  restart() {
    this.steps = 0;
    this.simEngine.restart()
      .subscribe(nextState => this.steps++);
  }

  start() {
    this.simEngine.start()
      .subscribe(nextState =>  this.steps++);
  }

  stop() {
    this.simEngine.stop();
  }
}
