import { Component, OnInit } from '@angular/core';
import { Products, ProductService } from '../product.service';
import { ProductModel } from '../product.model';
import { SharedConstants } from '../../shared/shared.constant';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  products: ProductModel[];
  count: number;
  API_URL: string = SharedConstants.API_URL;

  constructor(private productService: ProductService) {
  }

  ngOnInit() {
    this.productService.get().subscribe((res: Products) => {
      this.products = res.data;
      this.count = res.meta.count;
      console.log(this.products);
      console.log(this.count);
    });
  }
}
