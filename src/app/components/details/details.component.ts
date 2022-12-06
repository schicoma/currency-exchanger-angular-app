import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HistoricalChartEventService } from 'src/app/services/historical-chart-event.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  currencyFrom?: string;
  currencyTo?: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private route: Router
  ) {
    this.activatedRoute.params.subscribe(params => {
      this.currencyFrom = params['currency'];
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
