import { Component, Input, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import * as moment from 'moment';
import { CurrencyConvertionService } from 'src/app/services/currency-convertion.service';

@Component({
  selector: 'app-historical-chart',
  templateUrl: './historical-chart.component.html',
  styleUrls: ['./historical-chart.component.scss']
})
export class HistoricalChartComponent implements OnInit {

  chart: any = null;

  @Input() currencyBase?: string;
  @Input() currencySymbol?: string;

  constructor(
    private currencyConvertionService: CurrencyConvertionService
  ) {
    Chart.register(...registerables);
  }

  ngOnInit(): void {
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
    const base = this.currencyBase!;
    const symbol = this.currencySymbol!;

    const lastMonthDate = moment().subtract(1, 'month');
    const endDate = lastMonthDate.endOf('month').format('YYYY-MM-DD');
    const startDate = lastMonthDate.subtract(1, 'year').endOf('month').format('YYYY-MM-DD');

    const key = `${base}-${symbol}`;

    let timeseries = localStorage.getItem(key);

    if (!timeseries) {
      this.currencyConvertionService.getHistoricalData(base, symbol, startDate, endDate).subscribe((data: any) => {

        // get information of the last day of each month
        const months = []; 

        for (let i = 12; i >= 1; i--) {
          const date = moment().subtract(i, 'month').endOf('month').format('YYYY-MM-DD');
          console.log(date);
          months.push({
            currency: data.rates[date][symbol],
            date: date
          });
        }

        localStorage.setItem(key, JSON.stringify(months));
        this.updateChart(months);
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
