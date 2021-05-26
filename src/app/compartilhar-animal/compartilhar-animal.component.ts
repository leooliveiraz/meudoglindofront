import { Component, OnInit, Input } from '@angular/core';
import { MzBaseModal, MzModalComponent, MzToastService } from 'ngx-materialize';
import { environment } from 'src/environments/environment';
import { CompartilharAnimalService } from '../service/compartilhar-animal.service';

@Component({
  selector: 'app-compartilhar-animal',
  templateUrl: './compartilhar-animal.component.html',
  styleUrls: ['./compartilhar-animal.component.css']
})
export class CompartilharAnimalComponent  extends MzBaseModal implements OnInit {
  
  @Input() animal: any;

  urlImagem = `${environment.API_URL}arquivo/`;
  urlCompartilhamento = `${environment.APP_URL}compartilhar/`;
  codigoCompartilhamento = '';
  navegador:any = navigator;

  constructor(private service: CompartilharAnimalService,
    private toastService: MzToastService,
    ) {
    super();
  }

  ngOnInit() {
    this.service.gerar(this.animal.id).subscribe(res =>{
      const gerado:any = res;
      this.codigoCompartilhamento = gerado.codigo;
      this.urlCompartilhamento = `${this.urlCompartilhamento}`;
    })
  }

  copiar(){
    this.navegador.clipboard.writeText(`${this.urlCompartilhamento}${this.codigoCompartilhamento}`).then().catch(e => console.error(e));
    this.toastService.show('Link copiado!', 5000, 'green');
  }

  compartilhar(){
    if (this.navegador.share) {
      this.navegador.share({
              title: 'Meu Pet Lindo - Compartilhar',    
              text: `${this.animal.nome}`,   
              url: `${this.urlCompartilhamento}${this.codigoCompartilhamento}`,  
        }).then(() => console.log('Successful share'))    
        .catch((error) => console.log('Error sharing', error));}
    this.toastService.show('Link Compartilhado!', 5000, 'green');

  }

}
