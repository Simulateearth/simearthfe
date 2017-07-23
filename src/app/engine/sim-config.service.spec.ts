import { TestBed, inject } from '@angular/core/testing';

import { SimConfService } from './sim-config.service';

describe('ConfigurationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SimConfService]
    });
  });

  it('should be created', inject([SimConfService], (service: SimConfService) => {
    expect(service).toBeTruthy();
  }));
});
