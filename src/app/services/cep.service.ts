import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const baseUrl = 'https://viacep.com.br/ws';

@Injectable({
  providedIn: 'root'
})
export class CEPService {

  constructor(private http: HttpClient) { }

  get(cep): Observable<any> {
    return this.http.get(`${baseUrl}/${cep}/json/`);
  }

}
