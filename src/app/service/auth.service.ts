import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  googleAuth2:any = null;
  constructor() { }

  guardarAutenticacao(googleUser) {
    const profile = googleUser.getBasicProfile();
    localStorage.setItem('g-user', googleUser);
    localStorage.setItem('profile', profile);

    console.log(profile);
    console.log('Token || ' + googleUser.getAuthResponse().id_token);
    console.log('ID: ' + profile.getId());
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail());
  }

  getUsario() {
    return localStorage.getItem('profile');
  }
  estaLogado() {
    return localStorage.getItem('profile') == null ? false : true;
  }

  setGoogleAuth2(obj){
    this.googleAuth2 = obj;
  }
  getGoogleAuth2(){
    return this.googleAuth2;
  }

  loadGoogleSDK() {
    window['googleSDKLoaded'] = () => {
      window['gapi'].load('auth2', () => {
        this.getGoogleAuth2 = window['gapi'].auth2.init({
          client_id: '831677366245-kst0gbnp03n8912pnv5bdqms1gk8giim.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin',
          scope: 'profile email'
        });
      });
    };

    (function(d, s, id) {
      let js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {
        js = d.getElementById(id)
        d.removeChild(js);
      }
      js = d.createElement(s); js.id = id;
      js.src = 'https://apis.google.com/js/platform.js?onload=googleSDKLoaded';
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'google-jssdk'));

  }

  logout() { 
    localStorage.clear();
    sessionStorage.clear();
  }
}
