import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SharedConstants } from '../shared/shared.constant';
import { forOwn } from 'lodash';
import { RequestOptions } from '@angular/http';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class ProductService {
  static BASE_URL: string = `${SharedConstants.API_URL}/api`;

  constructor(private http: HttpClient) {
  }

  create(data) {
    // const token = AuthService.getAuthToken();
    // const headers = {
    //   Authorization: `Bearer ${token}`,
    //   'Content-Type': 'application/json',
    // };
    // headers.delete('Content-Type');
    // const options = new RequestOptions({ headers });
    const formData: any = new FormData();
    for (const [key, value] of Object.entries(data)) {
      formData.append(key, value.hasOwnProperty('file') ? value.file : value);
    }
    // new Response(formData).text().then(console.log);
    const req = this.http.post(`${ProductService.BASE_URL}/products`, formData);
    return req;
    // return req.pipe(map((res: Auth) => {
    //   this.user = UserModel.create(res.data);
    //   AuthService.setAuthToken(res.meta.token);
    //   return { data: this.user, meta: res.meta };
    // }));
  }
}
