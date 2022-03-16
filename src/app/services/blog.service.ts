import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from './../../environments/environment';

const baseUrl = environment.apiURL+'blogs';
const urlApi = environment.apiURL;
@Injectable({
  providedIn: 'root'
})

export class BlogService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<any> {
    return this.http.get(baseUrl);
  }
  
  getByEspecialidade(especialidade): Observable<any> {
    return this.http.get(`${baseUrl}/especialidade/${especialidade}`);
  }
  
  getByEspecialidadeName(nomeFormated): Observable<any> {
    return this.http.get(`${baseUrl}/nome/${nomeFormated}`);
  }

  getByTitle(titleFotmated): Observable<any> {
    return this.http.get(`${baseUrl}/link/${titleFotmated}`);
  }
  getAllTotalEspcBlog(): Observable<any> {
    return this.http.get(`${urlApi}especialidades-blog-total`);
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

  
}