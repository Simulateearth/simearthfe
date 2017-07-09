import { TestBed, inject } from '@angular/core/testing';

import { StepMakerService } from './step-maker.service';

describe('StepMakerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StepMakerService]
    });
  });

  it('should be created', inject([StepMakerService], (service: StepMakerService) => {
    expect(service).toBeTruthy();
  }));
});
