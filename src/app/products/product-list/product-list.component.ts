import { Component, OnInit } from '@angular/core';
import { clone, without } from 'lodash';
import { ProductModel } from '../product.model';
import { SharedConstants } from '../../shared/shared.constant';
import { PaginationHelper } from '../../shared/helpers/pagination.helper';
import { ActivatedRoute, Router } from '@angular/router';
import { Products, ProductService } from '../product.service';
import { ToastrService } from 'ngx-toastr';

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

  constructor(private productService: ProductService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private toastrService: ToastrService) {
    activatedRoute.queryParams.subscribe((data) => {
      this.pagination = this.pagination.setPage(data.page || 1);
      this.changeQuery();
    });
  }

  ngOnInit() {
    this.getProducts();
  }

  getProducts(disabledLoading = false) {
    if (!disabledLoading) this.loading = true;
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

  changePage(page: number, disabledLoading = false): void {
    this.pagination = this.pagination.setPage(page);
    this.getProducts(disabledLoading);
    this.changeQuery();
  }

  changeQuery() {
    const queryParams = { ...(this.pagination.getCurrentPage() > 1 && { page: this.pagination.getCurrentPage() }) };
    this.router.navigate(['/products'], { queryParams });
  }

  removeItem(product: ProductModel) {
    this.productService.remove(product).subscribe((res: { data: string }) => {
      this.toastrService.info(res.data);
      this.products = without(this.products, product);

      // case remove last product in page - redirect to previous page
      if (this.products.length % this.pagination.limit === 0) {
        this.changePage(this.pagination.getCurrentPage() - 1);
      } else this.changePage(this.pagination.getCurrentPage(), true);
    });
  }
}
