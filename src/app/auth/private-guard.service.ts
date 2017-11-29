import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import * as _ from 'lodash';

import { AuthService } from './auth.service';

@Injectable()
export class PrivateGuardService implements CanActivate {
  authPages: [string] = ['sign-in', 'sign-up'];

  constructor(private router: Router, private authService: AuthService) {
  }

  isPrivatePage(url): string {
    return url.match(this.authPages.join('|'));
  }

  redirect(): Promise<boolean> {
    return new Promise((resolve) => {
      if (!AuthService.getAuthToken()) resolve(false);
      else {
        // this.authService.autoLogin().then((data) => {
        //   resolve(data);
        // });
        resolve(true);
      }
    });
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.redirect().then((data) => {
      if (data) {
        if (this.isPrivatePage(state.url)) this.router.navigate(['/products']);
        else return true;
      } else {
        if (!this.isPrivatePage(state.url)) this.router.navigate(['/']);
        else return true;
      }
    });
  }
}
