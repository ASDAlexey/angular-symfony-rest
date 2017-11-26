import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { SharedConstants } from '../shared/shared.constant';
import { UserModel } from './user.model';
import { Subject } from 'rxjs/Subject';

interface SignIn {
  data: UserModel | {},
  meta: { token: string }
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

  signIn(data: { email: string, password: string }): Observable<SignIn> {
    const req = this.http.post<SignIn>(`${AuthService.BASE_URL}/login`, data);
    return req.pipe(map((res: SignIn) => {
      this.user = UserModel.create(res.data);
      AuthService.setAuthToken(res.meta.token);
      return { data: this.user, meta: res.meta };
    }));
  }

  logout(): void {
    AuthService.clearAuthToken();
    this.user = null;
  }
}
