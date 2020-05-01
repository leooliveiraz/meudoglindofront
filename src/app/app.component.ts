import { Component, OnInit } from '@angular/core';
import { NavigationStart, NavigationEnd, NavigationError, Router, Event } from '@angular/router';
import { AuthorizationService } from './service/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'MeuDogLindo';
  estaLogado = false;
  constructor(private router: Router, private authService: AuthorizationService) {
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
  ngOnInit() { }
}
