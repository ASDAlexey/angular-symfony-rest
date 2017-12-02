import * as _ from 'lodash';
import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from '../../../auth/auth.service';
import { UserModel } from '../../../auth/user.model';

@Component({
  selector: 'app-blank-layout',
  templateUrl: './blank-layout.component.html',
  styleUrls: ['./blank-layout.component.scss'],
})
export class BlankLayoutComponent {
  user: UserModel;

  constructor(private router: Router) {
    document.querySelector('.preloader').classList.add('loaded');
  }
}
