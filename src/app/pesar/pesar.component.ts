import { AnimalService } from './../service/animal.service';
import { Component, OnInit } from '@angular/core';
import { PesoService } from '../service/peso.service';
import { MzToastService } from 'ngx-materialize';
import { Router,ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-pesar',
  templateUrl: './pesar.component.html',
  styleUrls: ['./pesar.component.css']
})
export class PesarComponent implements OnInit {
  constructor(
    private animalService: AnimalService,
    private pesoService: PesoService,
    private toastService: MzToastService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) { }
  idAnimal: number = null;
  peso: number = null;
  dataPesagem = '';
  urlImagem = `${environment.API_URL}arquivo/979FEB8D61425164740D8D5739758DFDFE945CC59A9BFECB0ED602E13A6303AF`;

  listaAnimais:any = [];

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
    let animal = this.activatedRoute.snapshot.queryParamMap.get('animal');
    if(animal){
      this.idAnimal = parseInt(animal); ;
    }
    this.carregarAnimais();
  }

  cadastrar(f: any){
    let pesagem: any = f.form.value;
    pesagem.peso = parseFloat(pesagem.peso);

    this.pesoService.salvar(pesagem).subscribe(res => {
      this.toastService.show('A pesagem foi adicionada nas informações do seu bichinho!', 1000, 'green');
      this.router.navigateByUrl(`/painel/${pesagem.idAnimal}`);
    });
  }

  carregarAnimais() {
    this.animalService.listar().subscribe(res => {
      this.listaAnimais = res;
    });
  }
}
