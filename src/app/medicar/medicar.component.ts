import { Component, OnInit } from '@angular/core';
import { AnimalService } from '../service/animal.service';
import { MzToastService } from 'ngx-materialize';
import { ActivatedRoute, Router } from '@angular/router';
import { SincronizacaoService } from '../service/sincronizacao.service';
import { OnlineOfflineService } from '../service/online-offline.service';
import Swal from 'sweetalert2';
import { environment } from 'src/environments/environment';
import { MedicarService } from '../service/medicar.service';

@Component({
  selector: 'app-medicar',
  templateUrl: './medicar.component.html',
  styleUrls: ['./medicar.component.css']
})
export class MedicarComponent implements OnInit {

  constructor(
    private animalService: AnimalService,
    private medicarService: MedicarService,
    private toastService: MzToastService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private sync: SincronizacaoService,
    private onOffService: OnlineOfflineService
  ) { }
  
  idAnimal: number = null;
  nome = null;
  dataMedicacao = '';
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
      Swal.fire('', 'Por favor, escolha o bichinho, e informe a data e a medicação.', 'warning');
      return;
    }
    const medicacao: any = f.form.value;
    this.medicarService.salvar(medicacao).subscribe(res => {
      this.toastService.show('A medicação foi adicionada nas informações do seu bichinho!', 1000, 'green');
      this.router.navigateByUrl(`/painel/${medicacao.idAnimal}`);
    }, erro => {
      medicacao.id = this.sync.getIndiceNegativo();
      let listaMedicacao = this.sync.getTodasMedicacoes();
      if (listaMedicacao) {
        listaMedicacao.push(medicacao);
      } else {
        listaMedicacao = [];
        listaMedicacao.push(medicacao);
      }
      localStorage.setItem('medicacoes', JSON.stringify(listaMedicacao));
      localStorage.setItem('syncStatus', 'upload');
      this.toastService.show('A medicação foi adicionada nas informações do seu bichinho!', 1000, 'green');
      this.router.navigateByUrl(`/painel/${medicacao.idAnimal}`);
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
