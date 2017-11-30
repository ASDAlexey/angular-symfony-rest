import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from '../../shared/validators/custom-validators';
import { AuthService } from '../../shared/services/auth.service';
import { DestroySubscribers } from 'ng2-destroy-subscribers';
import { Router } from '@angular/router';

@DestroySubscribers()
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  subscribers: any = {};
  signUpForm: FormGroup;
  submitted: boolean;

  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit() {
    this.signUpForm = new FormGroup({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(255),
        CustomValidators.email,
      ])),
      password_first: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(255),
        CustomValidators.noSpace,
      ])),
      password_second: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(255),
        CustomValidators.passwordsMatch('password_first'),
        CustomValidators.noSpace,
      ])),
    });
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.signUpForm.valid) {
      const data = this.signUpForm.value;
      data.plainPassword = {
        first: data.password_first,
        second: data.password_second,
      };
      delete data.password_first;
      delete data.password_second;
      this.subscribers.user = this.authService.signUp(data).subscribe((res) => {
        this.signUpForm.reset();
        this.submitted = false;
        this.router.navigate(['/products']);
      });
    }
  }
}
