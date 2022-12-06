import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { FixerConvertResponse } from '../commons/fixer-response.interface';

@Injectable({
  providedIn: 'root'
})
export class HistoricalChartEventService {

  private data = new Subject();
  public dataAsObservable = this.data.asObservable();

  constructor() { }

  updateChart(information: FixerConvertResponse) {
    this.data.next(information);
  }
}
