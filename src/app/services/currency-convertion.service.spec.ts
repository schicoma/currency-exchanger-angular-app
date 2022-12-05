import { TestBed } from '@angular/core/testing';

import { CurrencyConvertionService } from './currency-convertion.service';

describe('CurrencyConvertionService', () => {
  let service: CurrencyConvertionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CurrencyConvertionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
