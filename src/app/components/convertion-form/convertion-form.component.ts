import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { CurrencyInformation } from 'src/app/commons/currency-information.component';
import { CurrencyConvertionService } from 'src/app/services/currency-convertion.service';

@Component({
  selector: 'app-convertion-form',
  templateUrl: './convertion-form.component.html',
  styleUrls: ['./convertion-form.component.scss']
})
export class ConvertionFormComponent implements OnInit {

  popularCurrencies: Array<any>;
  convertionForm: FormGroup;
  result: CurrencyInformation | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private currencyConvertionService: CurrencyConvertionService
  ) {
    this.convertionForm = this.formBuilder.group({
      from: new FormControl(),
      to: new FormControl(),
      amount: new FormControl()
    });

    this.popularCurrencies = [
      {}, {}, {}, {}, {},
    ];
  }

  ngOnInit(): void {
  }

  swapCurrencies() {
    const temp = this.convertionForm.controls['from'].value;
    
    this.convertionForm.patchValue({
      from: this.convertionForm.controls['to'].value,
      to: temp
    });
  }

  convert() {
    const from = this.convertionForm.value.from;
    const to = this.convertionForm.value.to;
    const amount = this.convertionForm.value.amount;

    this.currencyConvertionService.convert(from, to, amount)
      .subscribe((data) => {

        const to = data.query.to;
        const result = data.result;
        console.log(result);
        this.result = new CurrencyInformation(to, result);

      });

  }

}
