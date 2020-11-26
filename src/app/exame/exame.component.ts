import { ExameService } from './../service/exame.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MzToastService } from 'ngx-materialize';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { AnimalService } from '../service/animal.service';
import { MedicarService } from '../service/medicar.service';
import { OnlineOfflineService } from '../service/online-offline.service';
import { SincronizacaoService } from '../service/sincronizacao.service';

@Component({
  selector: 'app-exame',
  templateUrl: './exame.component.html',
  styleUrls: ['./exame.component.css']
})
export class ExameComponent implements OnInit {

  constructor(
    private animalService: AnimalService,
    private exameService: ExameService,
    private toastService: MzToastService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private sync: SincronizacaoService,
    private onOffService: OnlineOfflineService
  ) { }
  
  idAnimal: number = null;
  nome = null;
  dataMedicamento = '';
  dataProxima = '';
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
    if (f.form.status === 'INVALID') {
      Swal.fire('', 'Por favor, escolha o bichinho, e informe a data e o exame realizado.', 'warning');
      return;
    }
    const exame: any = f.form.value;
    this.exameService.salvar(exame).subscribe(res => {
      this.toastService.show('O Exame foi adicionado nas informações do seu bichinho!', 1000, 'green');
      this.router.navigateByUrl(`/painel/${exame.idAnimal}`);
    }, erro => {
      console.log(erro)
      this.toastService.show('Desculpe, não foi possível salvar esse exame!', 1000, 'red');
      // medicacao.id = this.sync.getIndiceNegativo();
      // let listaMedicacao = this.sync.getTodasMedicacoes();
      // if (listaMedicacao) {
      //   listaMedicacao.push(medicacao);
      // } else {
      //   listaMedicacao = [];
      //   listaMedicacao.push(medicacao);
      // }
      // localStorage.setItem('medicacoes', JSON.stringify(listaMedicacao));
      // localStorage.setItem('syncStatus', 'upload');
      // this.toastService.show('A medicação foi adicionada nas informações do seu bichinho!', 1000, 'green');
      // this.router.navigateByUrl(`/painel/${medicacao.idAnimal}`);
    });
  }

  carregarAnimais() {
    if (this.onOffService.isOnline && this.onOffService.getStatusServidor()) {
      this.animalService.listar().subscribe(res => {
        this.listaAnimais = res;
      }, erro => {
        this.listaAnimais = this.sync.getTodosAnimais();
      });
    } else {
      this.listaAnimais = this.sync.getTodosAnimais();
    }
  }

}
