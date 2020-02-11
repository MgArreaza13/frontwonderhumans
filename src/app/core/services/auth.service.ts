import { User } from './../../shared/models/user';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Authentication } from 'src/app/shared/models/authentication';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class AuthService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;


  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('wonderHumanUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(auth: Authentication) {
    return this.http.post(`${environment.apiRoot}/api/accounts/login/`, auth)
      .pipe(map(user => {
        // store user details and basic auth credentials in local storage to keep user logged in between page refreshes
        this.currentUserSubject.next(user);
        return user;
      }));
  }


  register(user: User) {
    return this.http.post(`${environment.apiRoot}/api/accounts/create/`, user);
  }


  logout() {
    return this.http.post(`${environment.apiRoot}/api/accounts/logout/`, {});
  }

  //   requestChangePassword(auth: Authentication) {
  //     return this.http.post(`${ environment.apiRoot }/auth/request-change-password`, auth);
  //   }

  //   validateToken(token: string) {
  //     return this.http.get(`${ environment.apiRoot }/auth/validate/${ token }`);
  //   }

  //   changePassword(auth: Authentication) {
  //     return this.http.patch(`${ environment.apiRoot }/auth/change-password`, auth);
  //   }
}