import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VermifugoService { 

  constructor(private http: HttpClient) { }
  url = `${environment.API_URL}vermifugo`;
  
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

  listarPorAnimal(objeto: number) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
    return  this.http.get(`${this.url}/animal/${objeto}`, { headers: headers });
  }
  
  listar() {
    const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
    return  this.http.get(`${this.url}`, { headers: headers });
  }
}
