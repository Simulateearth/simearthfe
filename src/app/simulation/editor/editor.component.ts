import { Component, OnInit } from '@angular/core';

import { ConfigurationService } from '../../engine';

@Component({
  selector: 'sme-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {
  configString = null;

  constructor(
    private configuration: ConfigurationService
  ) { }

  ngOnInit() {
    this.configString = this.configuration.getJson();
  }

  save(newConfig) {
    this.configString = newConfig;
    this.configuration.set(this.configString);
  }
}
