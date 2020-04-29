import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AuthorizationService } from '../service/auth.service';
import { Router } from '@angular/router';
import { AuthService } from 'angularx-social-login';
import { GoogleLoginProvider } from 'angularx-social-login';
 
@Component({
  selector: 'app-login-google',
  templateUrl: './login-google.component.html',
  styleUrls: ['./login-google.component.css']
})
export class LoginGoogleComponent implements OnInit {

  @ViewChild('loginRef', {static: true }) loginElement: ElementRef;
  auth2: any;
  constructor(
    private authService: AuthorizationService
    ) { }

  ngOnInit() {
  }

  loginGoogle(): void {
    this.authService.loginComGoogle();
  }


}
