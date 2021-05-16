import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MzToastService } from 'ngx-materialize';
import { AnimalService } from '../service/animal.service';
import { ExameService } from '../service/exame.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { AntiPulgaService } from '../service/antiPulga.service';
import { SeoService } from '../service/seo.service';

@Component({
  selector: 'app-antipulga',
  templateUrl: './antipulga.component.html',
  styleUrls: ['./antipulga.component.css']
})
export class AntipulgaComponent implements OnInit {

  constructor(
    private animalService: AnimalService,
    private antiPulgaService: AntiPulgaService,
    private toastService: MzToastService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private seo: SeoService
  ) { 
      seo.addTitulo('Meu Pet Lindo - Registro de Antipulga');
  }
  
  idAnimal: number = null;
  nome = null;
  dataAntiPulga = '';
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
      Swal.fire('', 'Por favor, escolha o bichinho, e informe a data e o antipulga.', 'warning');
      return;
    }
    const exame: any = f.form.value;
    this.antiPulgaService.salvar(exame).subscribe(res => {
      this.toastService.show('O Antipulga foi adicionado nas informações do seu bichinho!', 1000, 'green');
      this.router.navigateByUrl(`/painel/${exame.idAnimal}`);
    }, erro => {
      this.toastService.show('Desculpe, não foi possível salvar esse registro!', 1000, 'red');
    });
  }

  carregarAnimais() {
      this.animalService.listar().subscribe(res => {
        this.listaAnimais = res;
      }, erro => {
        
      });
    
  }
}
