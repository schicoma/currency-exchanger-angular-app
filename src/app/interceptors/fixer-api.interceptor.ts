import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class FixerApiInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (request.url.indexOf('apilayer.com') !== -1 ) {
      request = request.clone({
        headers: request.headers.set('apiKey', 'KgG1DmcnOPp5fCK3kMm5l0zb24c2aCIJ')
      });
    }

    return next.handle(request);
  }
}
