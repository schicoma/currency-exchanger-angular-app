import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { CurrencyInformation } from 'src/app/commons/currency-information.component';
import { FixerResponse } from 'src/app/commons/fixer-response.interface';
import { CurrencyConvertionService } from 'src/app/services/currency-convertion.service';

@Component({
  selector: 'app-convertion-form',
  templateUrl: './convertion-form.component.html',
  styleUrls: ['./convertion-form.component.scss']
})
export class ConvertionFormComponent implements OnInit, OnChanges {

  popularCurrencies: Array<any>;
  convertionForm: FormGroup;
  result: CurrencyInformation | null = null;

  @Input() currencyFrom?: string;
  @Input() showDetailsButton?: boolean;

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

  ngOnChanges(changes: SimpleChanges): void {
    const changesForCurrencyFrom = changes['currencyFrom'];
    if (changesForCurrencyFrom) {
      this.convertionForm.patchValue({
        from: changesForCurrencyFrom.currentValue
      });

      this.convertionForm.controls['from'].disable();
    }
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
    const value = this.convertionForm.getRawValue();
    const from = value.from;
    const to = value.to;
    const amount = value.amount;

    this.currencyConvertionService.convert(from, to, amount)
      .subscribe((data: any) => {
        const to = data.query.to;
        const result = data.result;

        this.result = new CurrencyInformation(to, result);

      });
  }

  isSwapDisabled() {
    return !!this.currencyFrom;
  }

}
