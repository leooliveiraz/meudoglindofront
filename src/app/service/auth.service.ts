import { AuthService, GoogleLoginProvider } from 'angularx-social-login';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {

  constructor(
    private socialService: AuthService,
    private router: Router) { }

  loginComGoogle() {
    this.socialService.signIn(GoogleLoginProvider.PROVIDER_ID)
    .then(res => {
      this.guardarAutenticacao(res);
      this.router.navigateByUrl('/meus-bichinhos');
    });
  }

  guardarAutenticacao(googleUser) {
    localStorage.setItem('profile', JSON.stringify(googleUser));
  }

  getUsuario() {
    const usuarioJSON = localStorage.getItem('profile');
    return JSON.parse(usuarioJSON);
  }
  estaLogado() {
    return localStorage.getItem('profile') == null ? false : true;
  }

  logout() {
    localStorage.clear();
    sessionStorage.clear();
    this.socialService.signOut()
    .then(res => {
      this.router.navigateByUrl('/');
    });
  }
}
