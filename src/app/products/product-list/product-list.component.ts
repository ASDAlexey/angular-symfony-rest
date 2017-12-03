import { Component, OnInit } from '@angular/core';
import { clone } from 'lodash';
import { ProductModel } from '../product.model';
import { SharedConstants } from '../../shared/shared.constant';
import { PaginationHelper } from '../../shared/helpers/pagination.helper';
import { ActivatedRoute, Router } from '@angular/router';
import { Products, ProductService } from '../product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  loading: boolean = false;
  products: ProductModel[];
  count: number;
  API_URL: string = SharedConstants.API_URL;
  ASSETS_URL: string = SharedConstants.ASSETS_URL;
  pagination: PaginationHelper = PaginationHelper.create();

  constructor(private productService: ProductService, private activatedRoute: ActivatedRoute, private router: Router) {
    activatedRoute.queryParams.subscribe((data) => {
      this.pagination = this.pagination.setPage(data.page || 1);
      this.changeQuery();
    });
  }

  ngOnInit() {
    this.getProducts();
  }

  getProducts() {
    this.loading = true;
    this.productService.get(this.pagination.stringify()).subscribe((res: Products) => {
      this.products = res.data;
      this.count = res.meta.count;
      const pagination = clone(this.pagination);
      this.pagination.setCount(this.count);
      if (pagination.offset !== this.pagination.offset) {
        this.changeQuery();
        this.getProducts();
      } else this.loading = false;
    });
  }

  changePage(page: number): void {
    this.pagination = this.pagination.setPage(page);
    this.getProducts();
  }

  changeQuery() {
    const queryParams = { ...(this.pagination.getCurrentPage() > 1 && { page: this.pagination.getCurrentPage() }) };
    this.router.navigate(['/products'], { queryParams });
  }

}
