import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import 'rxjs/add/operator/do';
import { ToastrService } from 'ngx-toastr';
import * as _ from 'lodash';

// https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
const enum HttpErrors {
  BadRequest = 400,
  NotFound = 404,
  Unauthorized = 401,
}

@Injectable()
export class ErrorsInterceptor implements HttpInterceptor {
  constructor(private toastrService: ToastrService) {
  }

  errorHandler(errRes, statuses: [number]) {
    if (errRes instanceof HttpErrorResponse && statuses.indexOf(errRes.status) !== -1) {
      if (errRes.status === 401) {
        this.toastrService.error(_.get(errRes, 'error.errors'));
      } else {
        const error = _.get(errRes, 'error.errors.children');
        const key = Object.keys(error)[0];
        this.toastrService.error(_.get(error[key], 'errors[0]'));
      }
    }
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).do(() => {
    }, errRes => (this.errorHandler(errRes, [
      HttpErrors.BadRequest,
      HttpErrors.Unauthorized,
      HttpErrors.NotFound,
    ])));
  }
}
