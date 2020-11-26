import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ExameService { 

  constructor(private http: HttpClient) { }
  url = `${environment.API_URL}exames`;
  
  salvar(objeto: any) {
    const header = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
    return  this.http.post(`${this.url}`, objeto, { headers: header });
  }


  alterar(objeto: any) {
    const header = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
    return  this.http.put(`${this.url}`, objeto, { headers: header });
  }


  deletar(objeto: number) {
    const header = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
    return  this.http.delete(`${this.url}/${objeto}`, { headers: header });
  }

  buscar(objeto: number) {
    const header = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
    return  this.http.get(`${this.url}/${objeto}`, { headers: header });
  }

  listarPorAnimal(objeto: number) {
    const header = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
    return  this.http.get(`${this.url}/animal/${objeto}`, { headers: header });
  }
  
  listar() {
    const header = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
    return  this.http.get(`${this.url}`, { headers: header });
  }
}
