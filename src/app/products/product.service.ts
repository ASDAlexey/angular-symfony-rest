import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SharedConstants } from '../shared/shared.constant';
import { convert2FormData } from '../shared/helpers/get-form-data.helper';
import { ProductModel } from './product.model';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';

export interface Products {
  data: ProductModel[],
  meta: { count: number },
}

@Injectable()
export class ProductService {
  static BASE_URL: string = `${SharedConstants.API_URL}/api`;

  constructor(private http: HttpClient) {
  }

  get(options: string = 'offset=10&limit=5') {
    const req = this.http.get<Products>(`${ProductService.BASE_URL}/products?${options}`);
    return req.pipe(map((res: Products) => {
      const products = res.data.map(item => (ProductModel.create(item)));
      return { data: products, meta: res.meta };
    }));
  }

  getById(id: number) {
    const req = this.http.get<{ data: ProductModel }>(`${ProductService.BASE_URL}/products/${id}`);
    return req.pipe(map((res: { data: ProductModel }) => {
      return { data: ProductModel.create(res) };
    }));
  }

  create(data, id = null) {
    return this.http.post<{ data: ProductModel }>(`${ProductService.BASE_URL}/products`, convert2FormData(data));
  }

  update(data, id) {
    return this.http.post<{ data: ProductModel }>(`${ProductService.BASE_URL}/products/${id}`, convert2FormData(data));
  }

  remove(data) {
    return this.http.delete<{ data: string }>(`${ProductService.BASE_URL}/products/${data.id}`);
  }
}
