import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from '../../shared/validators/custom-validators';
import { AuthService } from '../../shared/services/auth.service';
import { DestroySubscribers } from 'ng2-destroy-subscribers';
import { Router } from '@angular/router';

@DestroySubscribers()
@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {
  subscribers: any = {};
  signInForm: FormGroup;
  submitted: boolean;

  constructor(private authService: AuthService, private router: Router) {
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
      ])),
    });
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.signInForm.valid) {
      this.subscribers.user = this.authService.signIn(this.signInForm.value).subscribe((res) => {
        this.signInForm.reset();
        this.submitted = false;
        this.router.navigate(['/products']);
      });
    }
  }
}
