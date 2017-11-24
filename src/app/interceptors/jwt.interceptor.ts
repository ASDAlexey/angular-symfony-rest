import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import 'rxjs/add/operator/do';

// import { AuthService } from '../auth/services/auth.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // const token = AuthService.getAuthToken();
    // const authReq = req.clone({
    //   setHeaders: {
    //     ...(token && { Authorization: `Bearer ${token}` }),
    //     'Content-Type': 'application/json',
    //   },
    // });
    // return next.handle(authReq);
    return next.handle(req);
  }
}
