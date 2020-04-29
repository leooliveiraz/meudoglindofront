import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-google',
  templateUrl: './login-google.component.html',
  styleUrls: ['./login-google.component.css']
})
export class LoginGoogleComponent implements OnInit {

  @ViewChild('loginRef', {static: true }) loginElement: ElementRef;
  auth2: any;
  constructor(
    private authService: AuthService,
    private router: Router) { }

  ngOnInit() {
    if (this.authService.getGoogleAuth2() == null) {
      this.googleSDK();
    } else {
      this.prepareLoginButton();
    }
    
  }


  googleSDK() {
    window['googleSDKLoaded'] = () => {
      window['gapi'].load('auth2', () => {
        this.auth2 = window['gapi'].auth2.init({
          client_id: '831677366245-kst0gbnp03n8912pnv5bdqms1gk8giim.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin',
          scope: 'profile email'
        });
        this.authService.setGoogleAuth2(this.auth2);
        this.prepareLoginButton();
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

  prepareLoginButton() {
    this.authService.getGoogleAuth2().attachClickHandler(this.loginElement.nativeElement, {},
      (googleUser) => {
        this.authService.guardarAutenticacao(googleUser);
        this.router.navigateByUrl('/meus-bichinhos');

      }, (error) => {
        console.log(error);
      });
  }

}
