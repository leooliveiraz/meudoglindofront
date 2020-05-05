import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-imagem-animal',
  templateUrl: './imagem-animal.component.html',
  styleUrls: ['./imagem-animal.component.css']
})
export class ImagemAnimalComponent implements OnInit {
  @Input() src;
  
  constructor() { }

  ngOnInit() {
  }

}
