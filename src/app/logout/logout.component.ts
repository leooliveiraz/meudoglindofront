import { environment } from 'src/environments/environment';
import { Component, OnInit } from '@angular/core';
import { AuthorizationService } from '../service/auth.service';
import { Router } from '@angular/router';
import { SincronizacaoService } from '../service/sincronizacao.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(
    private authService: AuthorizationService,
    private sync: SincronizacaoService,
    private router: Router) { }

  ngOnInit() { }

  logout() {
    this.authService.logout();
    // this.sync.syncClean();
    this.router.navigateByUrl('/');
  }

}
