import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as _ from 'lodash';
import { CustomValidators } from '../../../shared/validators/custom-validators';

// import { AuthService } from '../../services/auth.service';

// import SignInModel from '../../models/sign-in.model';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit, OnDestroy {
  subscription: any;
  signInForm: FormGroup;
  submitted: boolean;

  constructor(private router: Router) {
  }

  ngOnInit() {
    this.signInForm = new FormGroup({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(255),
        CustomValidators.email,
      ])),
      password: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(255),
        CustomValidators.noSpace,
        CustomValidators.password,
      ])),
    });

    // this.subscription = this.user$.subscribe((res) => {
    //   const data = _.get(res, 'data');
    //   if (data && _.get(res, 'isAuth')) {
    //     this.submitted = false;
    //     this.router.navigate(['/accounting']);
    //     this.signInForm.reset();
    //   }
    // });
  }

  onSubmit(): void {
    this.submitted = true;
    // if (this.signInForm.valid) this.authService.login(new SignInModel(this.signInForm.value));
  }

  ngOnDestroy() {
    // if (this.subscription) this.subscription.unsubscribe();
  }
}
