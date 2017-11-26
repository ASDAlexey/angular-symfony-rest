import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { SharedConstants } from '../shared/shared.constant';
import { UserModel } from './user.model';
import { Subject } from 'rxjs/Subject';

interface Auth {
  data: UserModel | {},
  meta: { token: string }
}

interface SignIn {
  email: string,
  password: string,
}

interface SignUp {
  email: string,
  plainPassword: { first: string, second: string },
}

@Injectable()
export class AuthService {
  get user(): UserModel {
    return this._user;
  }

  set user(value: UserModel) {
    this._user = value;
    this.setUser$(value);
  }

  static BASE_URL: string = `${SharedConstants.API_URL}/api`;
  public user$ = new Subject<any>();
  private _user: UserModel;

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

  getUser$(): Observable<UserModel> {
    return this.user$.asObservable();
  }

  setUser$(user: UserModel) {
    this.user$.next(user);
  }

  auth(data: SignIn | SignUp, url): Observable<Auth> {
    const req = this.http.post<Auth>(`${AuthService.BASE_URL}/${url}`, data);
    return req.pipe(map((res: Auth) => {
      this.user = UserModel.create(res.data);
      AuthService.setAuthToken(res.meta.token);
      return { data: this.user, meta: res.meta };
    }));
  }

  signIn(data: SignIn): Observable<Auth> {
    return this.auth(data, 'sign-in');
  }

  signUp(data: SignUp): Observable<Auth> {
    return this.auth(data, 'sign-up');
  }

  logout(): void {
    AuthService.clearAuthToken();
    this.user = null;
  }
}
