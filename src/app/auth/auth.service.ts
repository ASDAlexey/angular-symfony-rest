import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { SharedConstants } from '../shared/shared.constant';
import { UserModel } from './user.model';

interface SignIn {
  data: UserModel | {},
  meta: { token: string }
}

@Injectable()
export class AuthService {
  static BASE_URL: string = `${SharedConstants.API_URL}/api`;
  private user: UserModel;

  static getAuthToken(): string {
    return localStorage.getItem('jwtToken');
  }

  static setAuthToken(token): void {
    if (token) localStorage.setItem('jwtToken', token);
  }

  static clearAuthToken(): void {
    localStorage.removeItem('jwtToken');
  }

  constructor(private http: HttpClient) {
  }

  signIn(data: { email: string, password: string }): Observable<SignIn> {
    const req = this.http.post<SignIn>(`${AuthService.BASE_URL}/login`, data);
    return req.pipe(map((res: SignIn) => {
      this.user = UserModel.create(res.data);
      return { data: UserModel.create(res.data), meta: res.meta };
    }));
  }

  // logout(): void {
  //   AuthService.clearAuthToken();
  //
  //   this.ngRedux.dispatch({ type: AuthConstants.LOGOUT });
  // }
}
