import { TestBed } from '@angular/core/testing';

import { PercentageService } from './percentage.service';

describe('PercentageService', () => {
  let service: PercentageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PercentageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
