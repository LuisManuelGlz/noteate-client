import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserForSignIn } from 'src/app/shared/models/user-for-sign-in';
import { UserForSignUp } from 'src/app/shared/models/user-for-sign-up';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private tokenSubject: BehaviorSubject<string>;
  public token: Observable<string>;

  constructor(private router: Router, private http: HttpClient) {
    this.tokenSubject = new BehaviorSubject<string>(
      localStorage.getItem('token')
    );
    this.token = this.tokenSubject.asObservable();
  }

  public get tokenValue() {
    return this.tokenSubject.value;
  }

  signIn(userForSignIn: UserForSignIn) {
    return this.http
      .post(`${environment.baseUrl}/auth/signin`, userForSignIn)
      .pipe(
        map((response: any) => {
          localStorage.setItem('token', JSON.stringify(response.accessToken));
          this.router.navigate(['/notes']);
        })
      );
  }

  signUp(userForSignUp: UserForSignUp) {
    return this.http
      .post(`${environment.baseUrl}/auth/signup`, userForSignUp)
      .pipe(
        map((response: any) => {
          localStorage.setItem('token', JSON.stringify(response.accessToken));
          this.router.navigate(['/notes']);
        })
      );
  }

  logOut() {
    localStorage.removeItem('token');
    this.router.navigate(['/']);
  }
}
