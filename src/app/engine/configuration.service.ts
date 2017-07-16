import { Injectable } from '@angular/core';

import { simpleEarthConfig } from '../sample-data/simple-earth.config';

@Injectable()
export class ConfigurationService {
  configJson: string = JSON.stringify(simpleEarthConfig, null, 4);

  constructor() { }

  get() {
    return JSON.parse(this.configJson);
  }

  getJson(): string {
    return this.configJson;
  }

  set(newConfig: string) {
    this.configJson = newConfig;
  }
}
