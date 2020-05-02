import { AnimalService } from './../service/animal.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MzToastService } from 'ngx-materialize';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cadastar-animal',
  templateUrl: './cadastar-animal.component.html',
  styleUrls: ['./cadastar-animal.component.css']
})
export class CadastarAnimalComponent implements OnInit {
  
  constructor(private animalService: AnimalService,
    private toastService: MzToastService,
    private router: Router,
    private activateRoute: ActivatedRoute, ) { }
    
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
  
    id = null;
    nome = '';
    dataNascimento = '';
    dataObito = '';
    declararObito = false;

  ngOnInit() {
    this.id = this.activateRoute.snapshot.paramMap.get('id');
    if (this.id != null) {
      this.animalService.buscar(this.id).subscribe(res => {
        const animal: any = res;
        if (animal == null) {
          Swal.fire('Desculpe, não conseguimos encontrar o registro do seu bichinho.', '', 'warning')
          .then(
            () => this.router.navigateByUrl('/meus-bichinhos')
          );
        }
        this.nome = animal.nome;
        this.dataNascimento = animal.dataNascimento;
        this.dataObito = animal.dataObito;
        this.declararObito = (this.dataObito != null && animal.dataObito.length > 0);
      });
    }
  }

  cadastrar(form: any) {
    if ( this.id ) {
      this.animalService.alterar(form.form.value).subscribe(res => {
        this.toastService.show('Os dados do seu bichinho foram atualizados com sucesso!', 1000, 'green');
        this.router.navigateByUrl('/meus-bichinhos');
      });
    } else {
      this.animalService.salvar(form.form.value).subscribe(res => {
        this.toastService.show('Salvo com sucesso!', 1000, 'green');
        this.router.navigateByUrl('/meus-bichinhos');
      });
    }
  }
}
