import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-basic-layout',
  templateUrl: './basic-layout.component.html',
  styleUrls: ['./basic-layout.component.scss'],
})
export class BasicLayoutComponent {
  constructor(private router: Router) {
    document.querySelector('.preloader').classList.add('loaded');
  }

  logout() {
    // this.authService.logout();
    this.router.navigate(['/sign-in']);
  }
}
