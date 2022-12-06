import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CurrencyInformation } from 'src/app/commons/currency-information.component';
import { FixerConvertResponse } from 'src/app/commons/fixer-response.interface';
import { CurrencyConversionService } from 'src/app/services/currency-conversion.service';
import { HistoricalChartEventService } from 'src/app/services/historical-chart-event.service';

@Component({
  selector: 'app-conversion-form',
  templateUrl: './conversion-form.component.html',
  styleUrls: ['./conversion-form.component.scss']
})
export class ConversionFormComponent implements OnInit, OnChanges {

  enableButtons: boolean = false;
  popularCurrencies: Array<any> = [];
  conversionForm: FormGroup;
  result: CurrencyInformation | null = null;
  currencies: Array<any> = [];

  @Input() currencyTo?: string;
  @Output() currencyToChange = new EventEmitter<string>();

  @Input() currencyFrom?: string;
  @Input() showDetailsButton?: boolean;
  @Input() showDefaultValues?: boolean;

  @Output() convertEvent = new EventEmitter<FixerConvertResponse>();

  constructor(
    private activatedRoute: ActivatedRoute,
    private currencyConversionService: CurrencyConversionService,
    private formBuilder: FormBuilder,
    private historicalChartEventService: HistoricalChartEventService,
    private router: Router
  ) {
    this.conversionForm = this.formBuilder.group({
      from: new FormControl(),
      to: new FormControl(),
      amount: new FormControl()
    });

    this.conversionForm.get('to')?.valueChanges.subscribe((data) => {
      this.currencyToChange.emit(data);
    });

    this.conversionForm.get('amount')?.valueChanges.subscribe((data) => {
      if (data) {
        this.enableButtons = true;

        if (this.showDefaultValues) {
          this.conversionForm.get('from')?.enable();
        }

        this.conversionForm.get('to')?.enable();
        return;
      }

      this.enableButtons = false;
      this.conversionForm.get('from')?.disable();
      this.conversionForm.get('to')?.disable();
    });

    this.currencies = this.currencyConversionService.CURRENCIES_LIST;
    this.activatedRoute.queryParams.subscribe(queryParams => {
      if ( queryParams['amount'] !== undefined) {
        this.conversionForm.get('amount')?.setValue(queryParams['amount']);
      }
    });
  }

  ngOnInit(): void {
    if (this.showDefaultValues) {
      this.conversionForm.patchValue({
        from: 'EUR',
        to: 'USD',
        amount: 1
      });
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    const changesForCurrencyFrom = changes['currencyFrom'];
    if (changesForCurrencyFrom) {
      this.conversionForm.patchValue({
        from: changesForCurrencyFrom.currentValue
      });

      this.conversionForm.controls['from'].disable();
    }

    const changesForCurrencyTo = changes['currencyTo'];
    if (changesForCurrencyTo) {
      this.conversionForm.patchValue({
        to: changesForCurrencyTo.currentValue
      });
    }
  }

  isSwapDisabled() {
    return !!this.currencyFrom;
  }

  swapCurrencies() {
    const temp = this.conversionForm.controls['from'].value;

    this.conversionForm.patchValue({
      from: this.conversionForm.controls['to'].value,
      to: temp
    });
  }

  convert() {
    const value = this.conversionForm.getRawValue();
    const from = value.from;
    const to = value.to;
    const amount = value.amount;

    this.currencyConversionService.convert(from, to, amount)
      .subscribe((data: FixerConvertResponse) => {
        const to = data.query.to;
        const result = data.result;

        this.result = new CurrencyInformation(to, result);

        this.convertEvent.emit(data);
        this.historicalChartEventService.updateChart(data);
      });
  }

  goToDetails() {
    const amount = this.conversionForm.value.amount;
    const currencyFrom = this.conversionForm.value.from;
    const currencyTo = this.conversionForm.value.to;
    this.router.navigate(['details', currencyFrom], {
      queryParams: {
        to: currencyTo,
        amount: amount
      }
    });
  }

}
