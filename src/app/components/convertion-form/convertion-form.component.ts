import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CurrencyInformation } from 'src/app/commons/currency-information.component';
import { FixerConvertResponse } from 'src/app/commons/fixer-response.interface';
import { CurrencyConvertionService } from 'src/app/services/currency-convertion.service';
import { HistoricalChartEventService } from 'src/app/services/historical-chart-event.service';

@Component({
  selector: 'app-convertion-form',
  templateUrl: './convertion-form.component.html',
  styleUrls: ['./convertion-form.component.scss']
})
export class ConvertionFormComponent implements OnInit, OnChanges {

  enableButtons: boolean = false;
  popularCurrencies: Array<any> = [];
  convertionForm: FormGroup;
  result: CurrencyInformation | null = null;
  currencies: Array<any> = [];

  @Input() currencyTo?: string;
  @Output() currencyToChange = new EventEmitter<string>();

  @Input() currencyFrom?: string;
  @Input() showDetailsButton?: boolean;
  @Input() showDefaultValues?: boolean;

  @Output() convertEvent = new EventEmitter<FixerConvertResponse>();

  constructor(
    private currencyConvertionService: CurrencyConvertionService,
    private formBuilder: FormBuilder,
    private historicalChartEventService: HistoricalChartEventService,
    private router: Router
  ) {
    this.convertionForm = this.formBuilder.group({
      from: new FormControl(),
      to: new FormControl(),
      amount: new FormControl()
    });

    this.convertionForm.get('to')?.valueChanges.subscribe((data) => {
      this.currencyToChange.emit(data);
    });

    this.convertionForm.get('amount')?.valueChanges.subscribe((data) => {
      if (data) {
        this.enableButtons = true;

        if (this.showDefaultValues) {
          this.convertionForm.get('from')?.enable();
        }

        this.convertionForm.get('to')?.enable();
        return;
      }

      this.enableButtons = false;
      this.convertionForm.get('from')?.disable();
      this.convertionForm.get('to')?.disable();
    });

    this.currencies = this.currencyConvertionService.CURRENCIES_LIST;
  }

  ngOnInit(): void {
    if (this.showDefaultValues) {
      this.convertionForm.patchValue({
        from: 'EUR',
        to: 'USD',
        amount: 1
      });
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    const changesForCurrencyFrom = changes['currencyFrom'];
    if (changesForCurrencyFrom) {
      this.convertionForm.patchValue({
        from: changesForCurrencyFrom.currentValue
      });

      this.convertionForm.controls['from'].disable();
    }

    const changesForCurrencyTo = changes['currencyTo'];
    if (changesForCurrencyTo) {
      this.convertionForm.patchValue({
        to: changesForCurrencyTo.currentValue
      });
    }
  }

  isSwapDisabled() {
    return !!this.currencyFrom;
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
      .subscribe((data: FixerConvertResponse) => {
        const to = data.query.to;
        const result = data.result;

        this.result = new CurrencyInformation(to, result);

        this.convertEvent.emit(data);
        this.historicalChartEventService.updateChart(data);
      });
  }

  goToDetails() {
    const currency = this.convertionForm.value.from;
    this.router.navigate(['details', currency]);
  }

}
