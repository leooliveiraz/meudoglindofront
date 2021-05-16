import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class SeoService {

  constructor(private meta: Meta,
    private title: Title) { }

  addMeta(tag,conteudo){
   this.meta.updateTag({name:tag, content:conteudo});
  }
  
  addTitulo(titulo){
    this.title.setTitle(titulo);
  }
}
