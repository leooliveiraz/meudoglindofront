import { AnimalService } from './../service/animal.service';
import { Component, OnInit } from '@angular/core';
import { PesoService } from '../service/peso.service';
import { MzToastService } from 'ngx-materialize';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { VermifugoService } from '../service/vermifugo.service';
import { SincronizacaoService } from '../service/sincronizacao.service';

@Component({
  selector: 'app-vermifugar',
  templateUrl: './vermifugar.component.html',
  styleUrls: ['./vermifugar.component.css']
})
export class VermifugarComponent implements OnInit {

  constructor(
    private animalService: AnimalService,
    private vermifugoService: VermifugoService,
    private toastService: MzToastService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private sync: SincronizacaoService
  ) { }
  
  idAnimal: number = null;
  nome = null;
  dataVermifugo = '';
  dataProximoVermifugo = '';
  urlImagem = `${environment.API_URL}arquivo/979FEB8D61425164740D8D5739758DFDFE945CC59A9BFECB0ED602E13A6303AF`;

  listaAnimais: any = [];

  diaSemana = [ 'Domingo', 'Segunda-Feira', 'Terca-Feira', 'Quarta-Feira', 'Quinta-Feira', 'Sexta-Feira', 'Sabado' ];
    mesAno = [ 'Janeiro', 'Fevereiro', 'Marco', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro' , 'Dezembro' ];
    public options: Pickadate.DateOptions = {
      format: 'dd/mm/yyyy',
      formatSubmit: 'yyyy-mm-dd',
      monthsFull: this.mesAno,
      monthsShort: [ 'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez' ],
      weekdaysFull: this.diaSemana,
      weekdaysShort: [ 'Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab' ],
      weekdaysLetter: [ 'D', 'S', 'T', 'Q', 'Q', 'S', 'S' ],
      selectMonths: true,
      selectYears: true,
      clear: 'Limpar',
      today: 'Hoje'
    };

  ngOnInit() {
    const animal = this.activatedRoute.snapshot.queryParamMap.get('animal');
    if (animal) {
      this.idAnimal = parseInt(animal);
    }
    this.carregarAnimais();
  }

  cadastrar(f: any) {
    const vermifugacao: any = f.form.value;
    this.vermifugoService.salvar(vermifugacao).subscribe(res => {
      this.toastService.show('A vermifugação foi adicionada nas informações do seu bichinho!', 1000, 'green');
      this.router.navigateByUrl(`/painel/${vermifugacao.idAnimal}`);
    }, erro => {
      vermifugacao.id = this.sync.getIndiceNegativo();
      let listaVermifugacao = this.sync.getTodosVermifugos();
      if (listaVermifugacao) {
        listaVermifugacao.push(vermifugacao);
      } else {
        listaVermifugacao = [];
        listaVermifugacao.push(vermifugacao);
      }
      localStorage.setItem('vermifugos', JSON.stringify(listaVermifugacao));
      localStorage.setItem('syncStatus', 'upload');
      this.toastService.show('A vermifugação foi adicionada nas informações do seu bichinho!', 1000, 'green');
      this.router.navigateByUrl(`/painel/${vermifugacao.idAnimal}`);
    });
  }

  carregarAnimais() {
    this.animalService.listar().subscribe(res => {
      this.listaAnimais = res;
    }, erro => {
      this.listaAnimais = this.sync.getTodosAnimais();
    });
  }

}
