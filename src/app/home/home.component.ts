import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { AuthorizationService } from '../service/auth.service';
import { SeoService } from '../service/seo.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  estaLogado = false;
  constructor(
    private authService: AuthorizationService,
    private router: Router,
    private seo: SeoService
    ) { 
        seo.addTitulo('Meu Pet Lindo - O APP do seu PET');
    }

  ngOnInit() {
    this.estaLogado = this.authService.estaLogado();
  }

  autenticou(){
    this.router.navigateByUrl('/meus-bichinhos');
  }


}
