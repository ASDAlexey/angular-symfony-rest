import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import 'rxjs/add/operator/do';
import * as _ from 'lodash';
import { RequestService } from '../shared/services/request.service';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {
  constructor(private requestService: RequestService) {
  }

  decrement(data) {
    if (_.get(data, 'status')) this.requestService.countRequests--;
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.requestService.countRequests++;
    return next.handle(req).do((res: HttpResponse<any>) => (this.decrement(res)), (errRes) => {
      this.decrement(errRes);
    });
  }
}

