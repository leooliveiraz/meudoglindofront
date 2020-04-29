import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AuthorizationService } from '../service/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  estaLogado = false;
  constructor(private authService: AuthorizationService) {}

  ngOnInit() {
    this.estaLogado = this.authService.estaLogado();
    
  }


}
