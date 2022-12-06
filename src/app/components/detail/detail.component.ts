import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

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
