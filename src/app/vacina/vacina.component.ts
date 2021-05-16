import { AnimalService } from './../service/animal.service';
import { Component, OnInit } from '@angular/core';
import { MzToastService } from 'ngx-materialize';
import { Router, ActivatedRoute } from '@angular/router';
import { VacinaService } from '../service/vacina.service';
import { SincronizacaoService } from '../service/sincronizacao.service';
import { OnlineOfflineService } from '../service/online-offline.service';
import Swal from 'sweetalert2';
import { SeoService } from '../service/seo.service';


@Component({
  selector: 'app-vacina',
  templateUrl: './vacina.component.html',
  styleUrls: ['./vacina.component.css']
})
export class VacinaComponent implements OnInit {

  constructor(
    private animalService: AnimalService,
    private vacinaService: VacinaService,
    private toastService: MzToastService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private seo: SeoService
  ) { 
      seo.addTitulo('Meu Pet Lindo - Registro de Vacinas');
  }

  idAnimal: number = null;
  nome = null;
  dataVacina = '';
  dataProximaVacina = '';

  listaAnimais: any = [];
  salvando = false;

  diaSemana = ['Domingo', 'Segunda-Feira', 'Terca-Feira', 'Quarta-Feira', 'Quinta-Feira', 'Sexta-Feira', 'Sabado'];
  mesAno = ['Janeiro', 'Fevereiro', 'Marco', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
  public options: Pickadate.DateOptions = {
    format: 'dd/mm/yyyy',
    formatSubmit: 'yyyy-mm-dd',
    monthsFull: this.mesAno,
    monthsShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
    weekdaysFull: this.diaSemana,
    weekdaysShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
    weekdaysLetter: ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'],
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
    if (f.form.status === 'INVALID') {
      Swal.fire('', 'Por favor, escolha o bichinho, e informe a vacina e a data de aplicação.', 'warning');
      return;
    }
    this.salvando = true;
    const vacinacao: any = f.form.value;

    this.vacinaService.salvar(vacinacao).subscribe(res => {
      this.toastService.show('O registro de Vacina foi adicionada nas informações do seu bichinho!', 1000, 'green');
      this.router.navigateByUrl(`/painel/${vacinacao.idAnimal}`);
    }, erro => {
      this.salvando = false;
      this.toastService.show('Não foi possível salvar esse registro de vacina! Por favor, tente novamente mais tarde', 1000, 'red');
    });
  }

  carregarAnimais() {
    this.animalService.listar().subscribe(res => {
      this.listaAnimais = res;
    }, erro => {
    });
  }

}
