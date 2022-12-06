import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class FixerApiInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (request.url.indexOf('apilayer.com') !== -1 ) {
      request = request.clone({
        headers: request.headers.set('apiKey', environment.fixerApiKey)
      });
    }

    return next.handle(request);
  }
}
