import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserForSignIn } from 'src/app/shared/models/user-for-sign-in';
import { UserForSignUp } from 'src/app/shared/models/user-for-sign-up';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private tokenSubject: BehaviorSubject<string>;
  jwtHelperService = new JwtHelperService();

  constructor(private router: Router, private http: HttpClient) {
    this.tokenSubject = new BehaviorSubject<string>(this.getToken());
  }

  get tokenValue() {
    return JSON.parse(this.tokenSubject.value);
  }

  isAuthenticated() {
    return !this.jwtHelperService.isTokenExpired(this.getToken());
  }

  signIn(userForSignIn: UserForSignIn) {
    return this.http
      .post(`${environment.baseUrl}/auth/signin`, userForSignIn)
      .pipe(
        map(({ accessToken }: any) => {
          this.setToken(accessToken);
          this.tokenSubject.next(this.getToken());
        })
      );
  }

  signUp(userForSignUp: UserForSignUp) {
    return this.http
      .post(`${environment.baseUrl}/auth/signup`, userForSignUp)
      .pipe(
        map(({ accessToken }: any) => {
          this.setToken(accessToken);
          this.tokenSubject.next(this.getToken());
        })
      );
  }

  logOut() {
    this.removeToken();
    this.router.navigate(['/']);
  }

  private getToken() {
    return localStorage.getItem('token');
  }

  private setToken(token: string) {
    localStorage.setItem('token', JSON.stringify(token));
  }

  private removeToken() {
    localStorage.removeItem('token');
    this.tokenSubject.next(null);
  }
}
