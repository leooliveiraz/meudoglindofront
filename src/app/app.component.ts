import { Component, OnInit } from '@angular/core';
import { NavigationStart, NavigationEnd, NavigationError, Router, Event } from '@angular/router';
import { AuthService } from './service/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'MeuDogLindoFront';
  estaLogado = false;
  constructor(private router: Router, private authService: AuthService) {
    this.router.events.subscribe((event: Event) => {
        if (event instanceof NavigationStart) {
        }

        if (event instanceof NavigationEnd) {
          this.estaLogado = this.authService.estaLogado();
          console.log(this.estaLogado);
        }

        if (event instanceof NavigationError) {
          console.log(event.error);
        }
    });
  }
  ngOnInit() { }
}
