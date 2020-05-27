import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OnlineOfflineService {
  private statusConexao$ = new Subject<boolean>();
  private statusServidor = false;

  private urlStatusServidor = `${environment.API_URL}server/status`;

  constructor(private http: HttpClient) {
    window.addEventListener('online', () => this.atualizaStatusConexaoDispositivo());
    window.addEventListener('offline', () => this.atualizaStatusConexaoDispositivo());
    setInterval(()  => {
      this.atualizarStatusServidor();
   }, 5000);
  }

  atualizarStatusServidor() {
    const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
    return  this.http.get(`${this.urlStatusServidor}`, { headers: headers }).subscribe(res => {
      this.statusServidor = true;
    }, erro => {
      this.statusServidor = false ;
    });
  }

  isOnline(): boolean {
    return window.navigator.onLine;
  }

  statusConexaoDispositivo(): Observable<boolean> {
    return this.statusConexao$.asObservable();
  }

  atualizaStatusConexaoDispositivo() {
    this.statusConexao$.next(this.isOnline());
  }

  getStatusServidor() {
    return this.statusServidor;
  }
}
