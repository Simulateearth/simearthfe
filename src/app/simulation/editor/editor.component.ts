import { Component, OnInit } from '@angular/core';

import { ConfigurationService } from '../../engine';

@Component({
  selector: 'sme-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {
  configYaml = null;

  constructor(
    private configuration: ConfigurationService
  ) { }

  ngOnInit() {
    this.configYaml = this.configuration.getYaml();
  }

  save(newConfig) {
    this.configYaml = newConfig;
    this.configuration.set(this.configYaml);
  }
}
