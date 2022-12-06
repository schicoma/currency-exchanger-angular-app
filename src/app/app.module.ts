import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ConversionFormComponent } from './components/conversion-form/conversion-form.component';
import { DetailsComponent } from './components/details/details.component';
import { HeaderComponent } from './components/header/header.component';
import { HistoricalChartComponent } from './components/historical-chart/historical-chart.component';
import { HomeComponent } from './components/home/home.component';
import { FixerApiInterceptor } from './interceptors/fixer-api.interceptor';
import { CurrencyConversionService } from './services/currency-conversion.service';


export function initializeAppFactory(currencyConversionService: CurrencyConversionService): () => Observable<any> {
  return () => currencyConversionService.init();
}
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DetailsComponent,
    ConversionFormComponent,
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
    { provide: APP_INITIALIZER, useFactory: initializeAppFactory, deps: [CurrencyConversionService], multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
