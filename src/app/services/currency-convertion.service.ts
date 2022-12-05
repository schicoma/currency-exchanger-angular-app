import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CurrencyConvertionService {

  private url = 'https://api.apilayer.com/fixer';

  private testObject = {
    "success": true,
    "query": {
        "from": "EUR",
        "to": "USD",
        "amount": 240
    },
    "info": {
        "timestamp": 1670269023,
        "rate": 1.048713
    },
    "date": "2022-12-05",
    "result": 251.69112
};

  constructor(
    private httpService: HttpClient
  ) { }

  convert(from: string, to: string, amount: number) {
    if (!true) {
      return of(this.testObject);
    }

    return this.httpService.get(this.url + '/convert', {
      params: {
        to,
        from,
        amount
      }
    });
  }

  getHistoricalData(base:string, currencies: Array<string>, startDate: string, endDate: string) {
    return this.httpService.get(this.url + '/timeseries', {
      params: {
        start_date: startDate,
        end_date: endDate,
        base,
        symbols: currencies.join(',')
      }
    });
  }
}
