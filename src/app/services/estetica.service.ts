import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from './../../environments/environment';

const baseUrl = environment.apiURL+'estetica';

@Injectable({
  providedIn: 'root'
})
export class EsteticaService {

  constructor(private http: HttpClient) { }

  getByRG(rg): Observable<any> {
    return this.http.get(`${baseUrl}/rg/${rg}`);
  }

  getAll(): Observable<any> {
    return this.http.get(baseUrl);
  }

  getByEspecialidade(id): Observable<any> {
    return this.http.get(`${baseUrl}/especialidades/${id}`);
  }

  getByEspecialidadeMunicipio(id, municipio): Observable<any> {
    return this.http.get(`${baseUrl}/especialidades/${id}/municipio/${municipio}`);
  }


  getByName(nomeFormated): Observable<any> {
    return this.http.get(`${baseUrl}/perfil/${nomeFormated}`);
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

  getReview(id): Observable<any> {
    return this.http.get(`${baseUrl}/review/${id}`);
  }

  createReview(id, data): Observable<any> {
    return this.http.post(`${baseUrl}/review/${id}`, data);
  }

  getByUser(id): Observable<any> {
    return this.http.get(`${baseUrl}/usuario/${id}`);
  }

  getByNameMunicipio(nomeFormated, municipio): Observable<any> {
    return this.http.get(`${baseUrl}/perfil/${nomeFormated}/municipio/${municipio}`);
  }

}
