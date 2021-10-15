import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from './../../environments/environment';

const baseUrl = environment.apiURL+'veterinarios';

@Injectable({
  providedIn: 'root'
})

export class VeterinarioService {

  constructor(private http: HttpClient) { }

  getByCRMV(crmv): Observable<any> {
    return this.http.get(`${baseUrl}/crmv/${crmv}`);
  }

  getAll(): Observable<any> {
    return this.http.get(baseUrl);
  }

  getByEspecialidade(): Observable<any> {
    return this.http.get(baseUrl);
  }

  get(id): Observable<any> {
    return this.http.get(`${baseUrl}/${id}`);
  }

  create(data): Observable<any> {
    return this.http.post(baseUrl, data);
  }

  update(id, data): Observable<any> {
    return this.http.put(`${baseUrl}/${id}`, data);
  }

}
