import { TestBed } from '@angular/core/testing';

import { HistoricalChartEventService } from './historical-chart-event.service';

describe('HistoricalChartEventService', () => {
  let service: HistoricalChartEventService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HistoricalChartEventService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
