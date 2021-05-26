import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CompartilharAnimalService {
  
  
  constructor(private http: HttpClient) { }
  url = `${environment.API_URL}compartilhar-animal`;

  gerar(idAnimal: any) {
    const header = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
    return  this.http.post(`${this.url}/${idAnimal}`, null, { headers: header });
  }

  carregar(codigo: string) {
    const header = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
    return  this.http.get(`${this.url}/${codigo}`, { headers: header });
  }

  confirmar(codigo: string) {
    const header = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
    return  this.http.post(`${this.url}/confirmar/${codigo}`, null, { headers: header });
  }
}
