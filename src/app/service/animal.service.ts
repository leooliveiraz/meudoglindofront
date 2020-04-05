import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AnimalService {
  constructor(private http: HttpClient) { }
  url = `${environment.API_URL}animal`;
  salvar(objeto: any) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
    return  this.http.post(`${this.url}`, objeto, { headers: headers });
  }


  alterar(objeto: any) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
    return  this.http.put(`${this.url}`, objeto, { headers: headers });
  }


  deletar(objeto: number) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
    return  this.http.delete(`${this.url}/${objeto}`, { headers: headers });
  }

  buscar(objeto: number) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
    return  this.http.get(`${this.url}/${objeto}`, { headers: headers });
  }

  listar() {
    const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
    return  this.http.get(`${this.url}`, { headers: headers });
  }

}
