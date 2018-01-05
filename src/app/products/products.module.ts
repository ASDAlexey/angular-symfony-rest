import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { ProductsRoutingModule } from './products-routing.module';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductAddEditComponent } from './product-add-edit/product-add-edit.component';
import { ProductService } from './product.service';

const modules = [
  CommonModule,
  SharedModule,
  ProductsRoutingModule,
];

const services = [
  ProductService,
];

const components = [
  ProductListComponent,
  ProductAddEditComponent,
];

@NgModule({
  declarations: [
    ...components,
  ],
  imports: [
    ...modules,
  ],
  providers: [
    ...services,
  ],
})
export class ProductsModule {

}
