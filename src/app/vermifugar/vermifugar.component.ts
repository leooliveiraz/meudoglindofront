import { AnimalService } from './../service/animal.service';
import { Component, OnInit } from '@angular/core';
import { PesoService } from '../service/peso.service';
import { MzToastService } from 'ngx-materialize';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { VermifugoService } from '../service/vermifugo.service';
import Swal from 'sweetalert2';

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
  ) { }
  
  idAnimal: number = null;
  nome = null;
  dataVermifugo = '';
  dataProximoVermifugo = '';
  urlImagem = `${environment.API_URL}arquivo/979FEB8D61425164740D8D5739758DFDFE945CC59A9BFECB0ED602E13A6303AF`;

  listaAnimais: any = [];
  salvando = false;

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
      Swal.fire('', 'Por favor, escolha o bichinho, e informe o vermífugo e a data de vermifugação.', 'warning');
      return;
    }
    this.salvando = true;
    const vermifugacao: any = f.form.value;
    this.vermifugoService.salvar(vermifugacao).subscribe(res => {
      this.toastService.show('A vermifugação foi adicionada nas informações do seu bichinho!', 1000, 'green');
      this.router.navigateByUrl(`/painel/${vermifugacao.idAnimal}`);
    }, erro => {
      this.salvando = false;
      this.toastService.show('Desculpe, não conseguimos salvar essa vermifugação! Tente novamente mais tarde', 1000, 'red');
      
    });
  }

  carregarAnimais() {
    this.animalService.listar().subscribe(res => {
      this.listaAnimais = res;
    }, erro => {
    });
  }

}
