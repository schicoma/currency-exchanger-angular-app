import { Component, OnInit } from '@angular/core';
import { FixerConvertResponse, FixerLatestResponse } from 'src/app/commons/fixer-response.interface';
import { CurrencyConvertionService } from 'src/app/services/currency-convertion.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  popularCurrencies: Array<any> = [];

  constructor(
    private currencyConvertionService: CurrencyConvertionService
  ) {

  }

  ngOnInit(): void {
    this.currencyConvertionService.getTop9Currencies().subscribe(data => {
      data.forEach(currencyCode => {
        this.popularCurrencies.push({
          rate: 0,
          convertion:0,
          currencyCode: currencyCode,
          currencyName: this.currencyConvertionService.CURRENCIES.get(currencyCode)
        });
      });
    });
  }

  convertTop9Currencies(data: FixerConvertResponse) {
    const base = data.query.from;
    const amount = data.query.amount;
    const currencies = this.popularCurrencies.map(currency => currency.currencyCode);

    this.currencyConvertionService.getRateByCurrencies(base, currencies).subscribe((data: FixerLatestResponse) => {
      const keys = Object.keys(data.rates);

      keys.forEach(element => {
        const currency = this.popularCurrencies.find(currency => currency.currencyCode === element);
        currency.rate = data.rates[element];
        currency.convertion = amount * currency.rate;
      });
    });
  }

}
