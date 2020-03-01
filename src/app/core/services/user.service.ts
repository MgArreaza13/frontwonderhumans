import { Profile } from './../../shared/models/profile';
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

  newProfile(profile: Profile){
    return this.http.post(`${ environment.apiRoot }/api/accounts/profile/`, profile);
  }

  updateProfile(profile: Profile){
    return this.http.put(`${ environment.apiRoot }/api/accounts/profile/`, profile);
  }


  getMyHomelessProfile(){
    return this.http.get(`${ environment.apiRoot }/api/accounts/myHomelessProfile/`);
  }

}


