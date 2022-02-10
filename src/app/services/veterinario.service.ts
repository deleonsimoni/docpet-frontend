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
  getListReviews(): Observable<any> {
    return this.http.get(`${baseUrl}/reviews/sort`);
  }

  getByEspecialidade(id): Observable<any> {
    return this.http.get(`${baseUrl}/especialidades/${id}`);
  }

  getByEspecialidadeMunicipio(id, municipio): Observable<any> {
    return this.http.get(`${baseUrl}/especialidades/${id}/municipio/${municipio}`);
  }

  getByNoEspecialidadeMunicipio(especialidade, municipio): Observable<any> {
    return this.http.get(`${baseUrl}/pesquisa/${especialidade}/${municipio}`);
  }

  getByName(nomeFormated): Observable<any> {
    return this.http.get(`${baseUrl}/perfil/${nomeFormated}`);
  }

  getByNameEspecialidadeMunicipio(nomeFormated, especialidadeFormated, municipioFormated): Observable<any> {
    return this.http.get(`${baseUrl}/perfil/${nomeFormated}/${especialidadeFormated}/${municipioFormated}`);
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
    console.log(`${baseUrl}/review/${id}`);
    return this.http.post(`${baseUrl}/review/${id}`, data);
  }

  getByUser(id): Observable<any> {
    return this.http.get(`${baseUrl}/usuario/${id}`);
  }
}
