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

// import { AuthService } from '../auth/services/auth.service';

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
    if (errRes instanceof HttpErrorResponse && statuses.includes(errRes.status)) {
      if (errRes.status !== HttpErrors.NotFound) {
        // clear jwtToken from localStorage
        // if (errRes.status === HttpErrors.Unauthorized) AuthService.clearAuthToken();

        // toast error message
        let pathBadRequest = '';
        if (errRes.status === HttpErrors.BadRequest) {
          pathBadRequest = _.get(errRes, 'error.meta.errors.validation.message') ? 'error.meta.errors.validation.message' : 'error.meta.errors.message';
        }
        const msg: string = _.get(errRes, errRes.status === HttpErrors.BadRequest ? pathBadRequest : 'error.meta.errors.message');
        if (msg) this.toastrService.error(msg);
        return errRes;
      } else {
        this.toastrService.error('Not found');
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
