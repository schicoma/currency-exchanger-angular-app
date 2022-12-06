import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

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
   }

  ngOnInit(): void {
  }

  goHome() {
    this.route.navigate(['home']);
  }

}
