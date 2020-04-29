import { environment } from 'src/environments/environment';
import { Component, OnInit } from '@angular/core';
import { AuthorizationService } from '../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(
    private authService: AuthorizationService,
    private router: Router) { }

  ngOnInit() { }

  logout() {
    this.authService.logout();
    this.router.navigateByUrl('/');
  }

}
