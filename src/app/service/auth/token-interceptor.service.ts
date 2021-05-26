import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthorizationService } from '../auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(public auth: AuthorizationService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const usuario: any = this.auth.getUsuario();
    if(usuario)
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${usuario.idToken}`
        }
      });
    return next.handle(request);
  }
}
