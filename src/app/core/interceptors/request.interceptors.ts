import { User } from 'src/app/shared/models/user';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LocalStorageService } from '../services/local-storage.service';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {
  constructor(private lsService: LocalStorageService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Get token
    const user: User = JSON.parse(localStorage.getItem('wonderHumanUser'));
    const token = (user)? user.token: null;

    // Set Headers
    if (token) {
      request = request.clone({
        setHeaders: {
          // 'Content-Type': 'application/x-www-form-urlencoded',
          Accept: 'application/json; charset=utf-8',
          Authorization: `token ${token}`,
        },
        body: request.body
      });
    } else {
      request = request.clone({
        setHeaders: {
          // 'Content-Type': 'application/x-www-form-urlencoded',
          Accept: 'application/json; charset=utf-8',
          // Authorization: `token ${token}`,
        },
        body: request.body
      });
    }


    // Next interceptor
    return next.handle(request);
  }
}