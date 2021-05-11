import { Component, OnInit } from '@angular/core';
import { AnimalService } from '../service/animal.service';
import { MzToastService } from 'ngx-materialize';
import { ActivatedRoute, Router } from '@angular/router';
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
    private router: Router
  ) { }
  
  idAnimal: number = null;
  nome = null;
  dataMedicamento = '';
  dataProxima = '';
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
      Swal.fire('', 'Por favor, escolha o bichinho, e informe a data e a medicação.', 'warning');
      return;
    }
    this.salvando = true;
    const medicacao: any = f.form.value;
    this.medicarService.salvar(medicacao).subscribe(res => {
      this.toastService.show('A medicação foi adicionada nas informações do seu bichinho!', 1000, 'green');
      this.router.navigateByUrl(`/painel/${medicacao.idAnimal}`);
    }, erro => {
      this.salvando = false;
      this.toastService.show('Não foi possível salvar essa medicação! Tente novamente mais tarde', 1000, 'red');
    });
  }

  carregarAnimais() {
    this.animalService.listar().subscribe(res => {
        this.listaAnimais = res;
      }, erro => {
    });
  }


}
