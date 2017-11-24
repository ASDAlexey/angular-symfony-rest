import * as _ from 'lodash';
import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-blank-layout',
  templateUrl: './blank-layout.component.html',
  styleUrls: ['./blank-layout.component.scss'],
})
export class BlankLayoutComponent {
  isSignInPage: boolean;

  static checkUrl(url: string): boolean {
    return url === '/sign-in';
  }

  constructor(private router: Router) {
    this.isSignInPage = BlankLayoutComponent.checkUrl(_.get(router, 'routerState.snapshot.url'));

    document.querySelector('.preloader').classList.add('loaded');
  }
}
