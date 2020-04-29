import { environment } from 'src/environments/environment';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router) { }

  ngOnInit() {
    if (this.authService.getGoogleAuth2() == null) {
      this.authService.loadGoogleSDK();
    }
  }

  logout() {
    this.authService.logout();
    this.authService.getGoogleAuth2().disconnect().then(() => {
      this.authService.setGoogleAuth2(null);
      document.location.href = environment.APP_URL;
    });

  }

}
