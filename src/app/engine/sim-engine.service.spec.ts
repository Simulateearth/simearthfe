import { TestBed, inject } from '@angular/core/testing';

import { SimEngineService } from './sim-engine.service';
import { StepMakerService } from './step-maker.service';

describe('SimEngineService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        SimEngineService,
        {provide: StepMakerService, useValue: {}}
      ]
    });
  });

  it('should be created', inject([SimEngineService], (service: SimEngineService) => {
    expect(service).toBeTruthy();
  }));
});
