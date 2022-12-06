import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { FixerConvertResponse, FixerTimeseriesResponse } from '../commons/fixer-response.interface';

@Injectable({
  providedIn: 'root'
})
export class CurrencyConvertionService {

  private url = 'https://api.apilayer.com/fixer';

  constructor(
    private httpService: HttpClient
  ) { }

  convert(from: string, to: string, amount: number) {
    return this.httpService.get<FixerConvertResponse>(this.url + '/convert', {
      params: {
        to,
        from,
        amount
      }
    });
  }

  getHistoricalData(base:string, currency: string, startDate: string, endDate: string) {
    return this.httpService.get<FixerTimeseriesResponse>(this.url + '/timeseries', {
      params: {
        start_date: startDate,
        end_date: endDate,
        base,
        symbols: currency
      }
    });
  }
}
