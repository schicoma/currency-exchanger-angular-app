import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { CurrencyConvertionService } from 'src/app/services/currency-convertion.service';

@Component({
  selector: 'app-historical-chart',
  templateUrl: './historical-chart.component.html',
  styleUrls: ['./historical-chart.component.scss']
})
export class HistoricalChartComponent implements OnInit {

  chart: any = null;

  constructor(
    private currencyConvertionservice: CurrencyConvertionService
  ) {
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    this.chart = new Chart("realtime", {
      type: 'bar', //this denotes tha type of chart

      data: {// values on X-Axis
        labels: ['2022-05-10', '2022-05-11', '2022-05-12','2022-05-13',
								 '2022-05-14', '2022-05-15', '2022-05-16','2022-05-17', ], 
	       datasets: [
          {
            label: "Sales",
            data: ['467','576', '572', '79', '92',
								 '574', '573', '576'],
            backgroundColor: 'blue'
          },
          {
            label: "Profit",
            data: ['542', '542', '536', '327', '17',
									 '0.00', '538', '541'],
            backgroundColor: 'limegreen'
          }  
        ]
      },
      options: {
        aspectRatio:2.5
      }
      
    });
  }

  getHistoricalData() {
    const base = 'EUR';
    const currencies = ['USD'];
    const startDate = '2021-12-05';
    const endDate = '2022-12-05';

    this.currencyConvertionservice.getHistoricalData(base, currencies, startDate, endDate).subscribe(data => {
      console.log(data);
    });
  }

}
