import { Component, OnInit } from '@angular/core';
import { SeoService } from '../service/seo.service';

@Component({
  selector: 'app-sobre',
  templateUrl: './sobre.component.html',
  styleUrls: ['./sobre.component.css']
})
export class SobreComponent implements OnInit {

  constructor(private seo: SeoService
    ) { 
        seo.addTitulo('Meu Pet Lindo - Sobre o App');
    }

  ngOnInit() {
  }

}
