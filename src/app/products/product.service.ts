import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SharedConstants } from '../shared/shared.constant';
import { convert2FormData } from '../shared/helpers/get-form-data.helper';
import { ProductModel } from './product.model';

@Injectable()
export class ProductService {
  static BASE_URL: string = `${SharedConstants.API_URL}/api`;

  constructor(private http: HttpClient) {
  }

  create(data) {
    return this.http.post<{ data: ProductModel }>(`${ProductService.BASE_URL}/products`, convert2FormData(data));
  }
}
