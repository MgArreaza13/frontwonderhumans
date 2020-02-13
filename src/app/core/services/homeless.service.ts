import { User } from './../../shared/models/user';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Authentication } from 'src/app/shared/models/authentication';
import { NewHomeless } from 'src/app/shared/models/newHomeless';

@Injectable()
export class HomelessService {
  constructor(private http: HttpClient) {}

  newHomeless(newH: NewHomeless) {
    return this.http.post(`${ environment.apiRoot }/api/accounts/homelessProfile/`, newH);
  }

  getHomelessProfile(id){
    return this.http.get(`${ environment.apiRoot }/api/accounts/homelessProfile/${id}`,);
  }

}