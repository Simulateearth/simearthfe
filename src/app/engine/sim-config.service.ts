import { Injectable } from '@angular/core';

import * as yaml from 'js-yaml';

import { simpleEarthConfig } from '../sample-data/simple-earth.config';

@Injectable()
export class SimConfService {
  configYaml: string = yaml.safeDump(simpleEarthConfig);

  constructor() { }

  get() {
    return yaml.load(this.configYaml);
  }

  getYaml(): string {
    return this.configYaml;
  }

  set(newConfigYaml: string) {
    this.configYaml = newConfigYaml;
  }
}
