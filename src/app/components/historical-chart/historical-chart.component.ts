import { Component, Input, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import * as moment from 'moment';
import { FixerTimeseriesResponse } from 'src/app/commons/fixer-response.interface';
import { CurrencyConversionService } from 'src/app/services/currency-conversion.service';
import { HistoricalChartEventService } from 'src/app/services/historical-chart-event.service';

@Component({
  selector: 'app-historical-chart',
  templateUrl: './historical-chart.component.html',
  styleUrls: ['./historical-chart.component.scss']
})
export class HistoricalChartComponent implements OnInit {

  chart!: Chart;

  @Input() currencyBase?: string;
  @Input() currencySymbol?: string;

  constructor(
    private currencyConversionService: CurrencyConversionService,
    private historicalChartEventService: HistoricalChartEventService
  ) {
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    this.historicalChartEventService.dataAsObservable.subscribe(data => {
      this.getHistoricalData();
    });

    this.chart = new Chart("realtime", {
      type: 'line', //this denotes tha type of chart

      data: {// values on X-Axis
        labels: [], 
	       datasets: [
          {
            label: "Rates",
            data: [],
            backgroundColor: 'blue'
          } 
        ]
      },
      options: {
        aspectRatio:2.5
      }
    });
  }

  getHistoricalData() {
    console.log('Getting historical data ... ');
    const base = this.currencyBase!;
    const symbol = this.currencySymbol!;

    if (!symbol) {
      return;
    }

    const lastMonthDate = moment().subtract(1, 'month');
    const endDate = lastMonthDate.endOf('month').format('YYYY-MM-DD');
    const startDate = lastMonthDate.subtract(1, 'year').endOf('month').format('YYYY-MM-DD');

    const key = `${base}-${symbol}`;

    let timeseries = localStorage.getItem(key);

    if (!timeseries) {
      this.currencyConversionService.getHistoricalData(base, symbol, startDate, endDate).subscribe((data: FixerTimeseriesResponse) => {

        // get information of the last day of each month
        const months = []; 

        for (let i = 12; i >= 1; i--) {
          const date = moment().subtract(i, 'month').endOf('month').format('YYYY-MM-DD');

          months.push({
            currency: data.rates[date][symbol],
            date: date
          });
        }

        this.updateChart(months);

        // save result in local storage in order not to bring the values in every convert event.
        localStorage.setItem(key, JSON.stringify(months));
      });
    } else {
      this.updateChart(JSON.parse(timeseries));
    }
  }

  updateChart(timeseries: Array<any>) {
    this.chart.data.labels = timeseries.map((data) => data.date);
    this.chart.data.datasets[0].data = timeseries.map((data) => data.currency);
    this.chart.update();
  }

}
