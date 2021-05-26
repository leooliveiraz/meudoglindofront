import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MzToastService } from 'ngx-materialize';
import { environment } from 'src/environments/environment';
import { AuthorizationService } from '../service/auth.service';
import { CompartilharAnimalService } from '../service/compartilhar-animal.service';
import { SeoService } from '../service/seo.service';

@Component({
  selector: 'app-adicionar-animal-compartilhado',
  templateUrl: './adicionar-animal-compartilhado.component.html',
  styleUrls: ['./adicionar-animal-compartilhado.component.css']
})
export class AdicionarAnimalCompartilhadoComponent implements OnInit {

  constructor(private service: CompartilharAnimalService,
    private route: ActivatedRoute,
    private toastService: MzToastService,
    private seo: SeoService,
    private auth: AuthorizationService,
    private router: Router
  ) { 
      this.seo.addTitulo('Meu Pet Lindo - Confirmar compartilhamento de animalzinho!');
      this.estaLogado = auth.estaLogado();
      setInterval(()  => {
        this.estaLogado = auth.estaLogado();
      }, 300);
  }

  codigo = '';
  dados:any = {};
  srcImg = null;
  estaLogado = false;

  ngOnInit() {
    this.codigo = this.route.snapshot.paramMap.get('codigo');
    this.carregarDados();
  }

  carregarDados(){
    this.service.carregar(this.codigo).subscribe(res => {
      this.dados = res;
      if (this.dados.arquivo) {
        this.srcImg = `${environment.API_URL}arquivo/${this.dados.arquivo}`;
      }
    });
  }

  confirmar(){
    this.service.confirmar(this.codigo).subscribe(res => {
      const dto:any = res;
      this.toastService.show('O animalzinho foi adicionado a sua lista!', 5000, 'green');
      
      this.router.navigateByUrl('/painel/'+dto.id);
    }, error => {
      if(error.error.message)
        this.toastService.show(error.error.message, 5000, 'red');
    });
  }

  autenticou(){
    this.toastService.show('Login realizado com sucesso!', 5000, 'green');
    location.reload();
  }

}
