import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class PrivateGuardService implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {
  }

  canActivate(): Observable<boolean> {
    return Observable.create((observer: Subject<boolean>) => {
      const token = AuthService.getAuthToken();
      if (token) {
        if (!this.authService.user) {
          this.authService.autoLogin(token).subscribe((res) => {
            observer.next(true);
          }, (error) => {
            this.authService.logout();
            this.router.navigate(['/']);
            observer.next(false);
          });
        } else observer.next(true);
      } else {
        this.router.navigate(['/']);
        observer.next(false);
      }
    });
  }
}
