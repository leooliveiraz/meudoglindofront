import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private http: HttpClient) { }
  url = `http://localhost:8080/subscribe`;

  inscrever(objeto: any) {
    const endpoint = objeto.endpoint;
    const key = objeto.getKey('p256dh');
    const auth = objeto.getKey('auth');
    const encodedKey = btoa(String.fromCharCode.apply(null, new Uint8Array(key)));
    const encodedAuth = btoa(String.fromCharCode.apply(null, new Uint8Array(auth)));
    
    const inscricao = {publicKey: encodedKey, auth: encodedAuth, notificationEndPoint: endpoint};
    console.log(inscricao)
    const header = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
    return  this.http.post(`${this.url}`, inscricao, { headers: header });
  }
}
