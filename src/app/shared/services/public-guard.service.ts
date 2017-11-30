import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';

import { AuthService } from './auth.service';

@Injectable()
export class PublicGuardService implements CanActivate {
  constructor(private router: Router) {
  }

  canActivate(): boolean {
    if (AuthService.getAuthToken()) this.router.navigate(['/products']);
    else return true;
  }
}
