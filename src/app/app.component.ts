import { Component, OnInit } from '@angular/core';
import { NavigationStart, NavigationEnd, NavigationError, Router, Event } from '@angular/router';
import { AuthorizationService } from './service/auth.service';
import { SwUpdate, SwPush } from '@angular/service-worker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'MeuDogLindo';
  estaLogado = false;
  constructor(private router: Router, private authService: AuthorizationService,
              private swUpdate: SwUpdate,private swPush: SwPush) {
    this.router.events.subscribe((event: Event) => {
        if (event instanceof NavigationStart) {
        }

        if (event instanceof NavigationEnd) {
          this.estaLogado = this.authService.estaLogado();
        }

        if (event instanceof NavigationError) {
        }
    });
  }
  ngOnInit() {
    this.reloadCache();
   }

  reloadCache() {
    if (this.swUpdate.isEnabled) {
      this.swUpdate.available.subscribe( () => {
          window.location.reload();
      });
    }
  }
}
