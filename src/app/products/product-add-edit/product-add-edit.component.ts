import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from '../../shared/validators/custom-validators';
import { DestroySubscribers } from 'ng2-destroy-subscribers';

@DestroySubscribers()
@Component({
  selector: 'app-product-add-edit',
  templateUrl: './product-add-edit.component.html',
  styleUrls: ['./product-add-edit.component.scss'],
})
export class ProductAddEditComponent implements OnInit {
  form: FormGroup;
  submitted: boolean;
  subscribers: any = {};

  constructor() {
  }

  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(255),
      ])),
      price: new FormControl('', Validators.compose([
        Validators.required,
        Validators.maxLength(60),
        CustomValidators.positive,
      ])),
      description: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(255),
      ])),
      color: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(255),
      ])),
      year: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(4),
        CustomValidators.positive,
      ])),
    });
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.form.valid) {
      console.log(this.form.value);
    }
  }
}
