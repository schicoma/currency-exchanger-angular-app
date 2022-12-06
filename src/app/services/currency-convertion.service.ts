import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { FixerConvertResponse, FixerLatestResponse, FixerSymbolsResponse, FixerTimeseriesResponse } from '../commons/fixer-response.interface';
import { finalize, merge, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CurrencyConvertionService {

  public CURRENCIES!: Map<string, string>;
  public CURRENCIES_LIST: Array<any> = [];
  private url = 'https://api.apilayer.com/fixer';

  constructor(
    private httpService: HttpClient
  ) { }

  init() {
    const getSymbolsAsObservable = new Observable(observer => {
      const symbols = localStorage.getItem('symbols');
      if (symbols) {
        this.CURRENCIES = new Map(Object.entries(JSON.parse(symbols)));
        this.fillCurrenciesList();
        observer.complete();

        return;
      }

      this.getCurrencies()
        .pipe(finalize(() => observer.complete()))
        .subscribe(data => {
          this.CURRENCIES = data.symbols;
          this.fillCurrenciesList();
          localStorage.setItem('symbols', JSON.stringify(this.CURRENCIES));
        });
    });

    return getSymbolsAsObservable;
  }

  convert(from: string, to: string, amount: number) {
    return this.httpService.get<FixerConvertResponse>(this.url + '/convert', {
      params: {
        to,
        from,
        amount
      }
    });
  }

  getHistoricalData(base: string, currency: string, startDate: string, endDate: string) {
    return this.httpService.get<FixerTimeseriesResponse>(this.url + '/timeseries', {
      params: {
        start_date: startDate,
        end_date: endDate,
        base,
        symbols: currency
      }
    });
  }

  getCurrencies() {
    return this.httpService.get<FixerSymbolsResponse>(this.url + '/symbols');
  }

  getRateByCurrencies(base: string, symbols: Array<string>) {
    return this.httpService.get<FixerLatestResponse>(this.url + '/latest', {
      params: {
        base,
        symbols: symbols.join(',')
      }
    });
  }

  getTop9Currencies() {
    const currencies = ['USD', 'EUR', 'JPY', 'GBP', 'AUD', 'CAD', 'CHF', 'CNY', 'HKD', 'NZD'];
    return of(currencies);
  }

  private fillCurrenciesList() {
    const entries = Object.fromEntries(this.CURRENCIES);
    const keys = Object.keys(entries);

    keys.forEach((key: string) => {
      this.CURRENCIES_LIST.push({
        code: key,
        name: entries[key]
      });
    });
  }

}
