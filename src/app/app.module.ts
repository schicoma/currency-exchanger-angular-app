import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { FixerApiInterceptor } from './interceptors/fixer-api.interceptor';
import { ConvertionFormComponent } from './components/convertion-form/convertion-form.component';
import { HeaderComponent } from './components/header/header.component';
import { HistoricalChartComponent } from './components/historical-chart/historical-chart.component';
import { DetailsComponent } from './components/details/details.component';
import { Observable } from 'rxjs';
import { CurrencyConvertionService } from './services/currency-convertion.service';

export function initializeAppFactory(currencyConvertionService: CurrencyConvertionService): () => Observable<any> {
  return () => currencyConvertionService.init();
}
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DetailsComponent,
    ConvertionFormComponent,
    HeaderComponent,
    HistoricalChartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,

  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: FixerApiInterceptor, multi: true },
    { provide: APP_INITIALIZER, useFactory: initializeAppFactory, deps: [CurrencyConvertionService], multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
