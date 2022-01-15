import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from './../../environments/environment';

const baseUrl = environment.apiURL+'estabelecimentos';

@Injectable({
  providedIn: 'root'
})
export class EstabelecimentoService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<any> {
    return this.http.get(baseUrl);
  }

  get(id): Observable<any> {
    return this.http.get(`${baseUrl}/${id}`);
  }

  getByCNPJ(cnpj): Observable<any> {
    return this.http.get(`${baseUrl}/cnpj/${cnpj.replace(/[^0-9]/g, '')}`);
  }

  getByIdVet(id): Observable<any> {
    return this.http.get(`${baseUrl}/veterinario/${id}`);
  }

  getByName(name): Observable<any> {
    return this.http.get(`${baseUrl}/nome/${name}`);
  }

  create(data): Observable<any> {
    return this.http.post(baseUrl, data);
  }

  update(id, data): Observable<any> {
    return this.http.put(`${baseUrl}/${id}`, data);
  }

  delete(id): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }

  deleteAll(): Observable<any> {
    return this.http.delete(baseUrl);
  }

  findByTitle(title): Observable<any> {
    return this.http.get(`${baseUrl}?title=${title}`);
  }

  getLocale(cep): Observable<any> {
    return this.http.get(`${baseUrl}/cep/${cep}`);
  }
}
