import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from './../../environments/environment';
import jwt_decode from 'jwt-decode';


const baseUrl = environment.apiURL + 'user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient,

  ) { }


  create(data): Observable<any> {
    return this.http.post(baseUrl, data);
  }

  getUsers(): Observable<any> {
    return this.http.get(baseUrl + '/users');
  }

  changeAdmin(id, isAdmin) {
    return this.http.get(`${baseUrl}/changeAdmin/${id}?isAdmin=${isAdmin}`);
  }

  login(email: string, password: string) {
    return this.http.post(baseUrl + '/login', { email, password });
  }

  logout() {
    localStorage.removeItem("vetz_token");
  }

  setSession(token){
    localStorage.setItem('vetz_token', token);
  }

  getUser(): any {
    try{
        return jwt_decode(localStorage.getItem("vetz_token"));
    }
    catch(Error){
        return null;
    }
  }
}
