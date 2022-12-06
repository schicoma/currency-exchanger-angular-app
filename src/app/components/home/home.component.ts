import { Component, OnInit } from '@angular/core';
import { FixerConvertResponse, FixerLatestResponse } from 'src/app/commons/fixer-response.interface';
import { CurrencyConversionService } from 'src/app/services/currency-conversion.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  popularCurrencies: Array<any> = [];

  constructor(
    private currencyConversionService: CurrencyConversionService
  ) {

  }

  ngOnInit(): void {
    this.currencyConversionService.getTop9Currencies().subscribe(data => {
      data.forEach(currencyCode => {
        this.popularCurrencies.push({
          rate: 0,
          conversion:0,
          currencyCode: currencyCode,
          currencyName: this.currencyConversionService.CURRENCIES.get(currencyCode)
        });
      });
    });
  }

  convertTop9Currencies(data: FixerConvertResponse) {
    const base = data.query.from;
    const amount = data.query.amount;
    const currencies = this.popularCurrencies.map(currency => currency.currencyCode);

    this.currencyConversionService.getRateByCurrencies(base, currencies).subscribe((data: FixerLatestResponse) => {
      const keys = Object.keys(data.rates);

      keys.forEach(element => {
        const currency = this.popularCurrencies.find(currency => currency.currencyCode === element);
        currency.rate = data.rates[element];
        currency.conversion = amount * currency.rate;
      });
    });
  }

}
