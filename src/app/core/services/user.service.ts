import { User } from './../../shared/models/user';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable()
export class UserService {
  constructor(private http: HttpClient) {}

  getProfile(){
    return this.http.get(`${ environment.apiRoot }/api/accounts/profile/`);
  }

}


