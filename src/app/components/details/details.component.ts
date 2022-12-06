import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CurrencyConversionService } from 'src/app/services/currency-conversion.service';
import { HistoricalChartEventService } from 'src/app/services/historical-chart-event.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  currencyFrom?: string;
  currencyTo?: string;
  title: string | undefined = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private currencyConversionService: CurrencyConversionService,
    private route: Router
  ) {
    this.activatedRoute.params.subscribe(params => {
      this.currencyFrom = params['currency'];
      this.title = this.currencyConversionService.CURRENCIES.get(this.currencyFrom!);
    });

    this.activatedRoute.queryParams.subscribe(params => {
      this.currencyTo = params['to'];
    });
  }

  ngOnInit(): void {
  }

  goHome() {
    this.route.navigate(['home']);
  }

}
