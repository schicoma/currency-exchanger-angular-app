import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CurrencyConvertionService {

  private url = 'https://api.apilayer.com/fixer/convert';

  constructor(
    private httpService: HttpClient
  ) { }

  convert(from: string, to: string, amount: number) {
    return of({
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
  });
    // return this.httpService.get(this.url, {
    //   params: {
    //     to,
    //     from,
    //     amount
    //   }
    // });
  }
}
