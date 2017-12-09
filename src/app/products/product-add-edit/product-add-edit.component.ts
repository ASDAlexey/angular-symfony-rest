import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from '../../shared/validators/custom-validators';
import { DestroySubscribers } from 'ng2-destroy-subscribers';
import { ProductService } from '../product.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductModel } from '../product.model';

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
  routeId: number;

  @ViewChild('fileInput') fileInput: ElementRef;

  constructor(private formBuilder: FormBuilder,
              private productService: ProductService,
              private router: Router,
              private activateRoute: ActivatedRoute) {
    this.routeId = +activateRoute.snapshot.params.id;
  }

  setForm(product: ProductModel = ProductModel.create()) {
    this.form = this.formBuilder.group({
      name: [product.name || '', Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(210),
      ])],
      price: [product.price || '', Validators.compose([
        Validators.required,
        Validators.maxLength(60),
        CustomValidators.positive,
      ])],
      description: [product.description || '', Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(255),
      ])],
      color: [product.color || '', Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(255),
      ])],
      year: [product.year || '', Validators.compose([
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(4),
        CustomValidators.positive,
      ])],
      image: product.image ? { src: product.image } : '',
    });
    console.log(this.form.value);
  }

  ngOnInit() {
    if (this.routeId) {
      this.subscribers.product = this.productService.getById(this.routeId)
        .subscribe((res: { data: ProductModel }) => {
          this.setForm(res.data);
          this.subscribers.product.unsubscribe();
        });
    } else this.setForm();
  }

  onFileChange(event) {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.addEventListener('load', () => {
        this.form.get('image').setValue({
          file,
          filename: file.name,
          filetype: file.type,
          base64: reader.result,
        });
      });
    }
  }

  clearFile() {
    this.form.get('image').setValue(null);
    this.fileInput.nativeElement.value = '';
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.form.valid) {
      console.log(this.form.value);
      this.subscribers.products = this.productService.create(this.form.value).subscribe((res) => {
        this.submitted = false;
        this.form.reset();
        this.router.navigate(['/products']);
      });
    }
  }
}
