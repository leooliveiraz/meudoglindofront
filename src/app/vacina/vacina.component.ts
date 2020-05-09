import { AnimalService } from './../service/animal.service';
import { Component, OnInit } from '@angular/core';
import { MzToastService } from 'ngx-materialize';
import { Router, ActivatedRoute } from '@angular/router';
import { VacinaService } from '../service/vacina.service';


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
  ) { }
  
  idAnimal: number = null;
  nome = null;
  dataVacina = '';
  dataProximaVacina = '';

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
    const pesagem: any = f.form.value;
    pesagem.peso = parseFloat(pesagem.peso);

    this.vacinaService.salvar(pesagem).subscribe(res => {
      this.toastService.show('A vermifugação foi adicionada nas informações do seu bichinho!', 1000, 'green');
      this.router.navigateByUrl(`/painel/${pesagem.idAnimal}`);
    });
  }

  carregarAnimais() {
    this.animalService.listar().subscribe(res => {
      this.listaAnimais = res;
    });
  }

}
