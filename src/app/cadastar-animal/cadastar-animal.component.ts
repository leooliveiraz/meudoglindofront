import { AnimalService } from './../service/animal.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MzToastService } from 'ngx-materialize';
import Swal from 'sweetalert2';
import { environment } from 'src/environments/environment';
import { SincronizacaoService } from '../service/sincronizacao.service';

@Component({
  selector: 'app-cadastar-animal',
  templateUrl: './cadastar-animal.component.html',
  styleUrls: ['./cadastar-animal.component.css']
})
export class CadastarAnimalComponent implements OnInit {

  constructor(private animalService: AnimalService,
              private toastService: MzToastService,
              private router: Router,
              private activateRoute: ActivatedRoute,
              private sync: SincronizacaoService ) { }

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
    dataAdocao = '';
    dataObito = '';
    declararObito = false;
    srcImagem = null;
    imagemAlterada = false;

  ngOnInit() {
    this.id = this.activateRoute.snapshot.paramMap.get('id');
    if (this.id != null) {
      this.animalService.buscar(this.id).subscribe(res => {
        const animal: any = res;
        this.configurar(animal, true);
      }, erro => {
        const animal = this.sync.getAnimal(this.id);
        this.configurar(animal, false);
      });
    }
  }

  private configurar(animal, online) {
    if (animal == null) {
      Swal.fire('Desculpe, não conseguimos encontrar o registro do seu bichinho.', '', 'warning')
      .then(
        () => this.router.navigateByUrl('/meus-bichinhos')
      );
    }
    this.nome = animal.nome;
    this.dataNascimento = animal.dataNascimento;
    this.dataAdocao = animal.dataAdocao;
    this.dataObito = animal.dataObito;
    this.declararObito = (this.dataObito != null && animal.dataObito.length > 0);
    if (online) {
      if (animal.idArquivo) {
        this.srcImagem = `${environment.API_URL}arquivo/${animal.idArquivo}`;
      }
    } else {
      if (animal.srcImg) {
        this.srcImagem = animal.srcImg;
      }
    }
  }

  cadastrar(form: any) {
    if ( this.id ) {
      this.animalService.alterar(form.form.value).subscribe(res => {
        this.toastService.show('Os dados do seu bichinho foram atualizados com sucesso!', 1000, 'green');
        if (this.srcImagem && this.imagemAlterada) {
          this.animalService.uploadImagem(this.id, this.srcImagem ).subscribe( () => {
            this.router.navigateByUrl('/meus-bichinhos');
          });
        } else {
          this.router.navigateByUrl('/meus-bichinhos');
        }
      }, error => {
        this.salvarOffline(form);
      });
    } else {
      this.animalService.salvar(form.form.value).subscribe(res => {
        const idAnimal = res;
        this.toastService.show('Salvo com sucesso!', 1000, 'green');
        if (this.srcImagem && this.imagemAlterada) {
          this.animalService.uploadImagem(idAnimal, this.srcImagem ).subscribe( () => {
            this.router.navigateByUrl('/meus-bichinhos');
          });
        } else {
          this.router.navigateByUrl('/meus-bichinhos');
        }
      }, erro => {
        this.salvarOffline(form);
      });
    }
  }
  salvarOffline(form) {
    const registro = form.form.value;
    if (!registro.id) {
      registro.id = this.sync.getIndiceNegativo();
    }
    if (this.srcImagem && this.imagemAlterada) {
      registro.srcImg = this.srcImagem;
      registro.imagemAlterada = true;
    }
    const listaAnimais = JSON.parse(localStorage.getItem('animais'));
    let registroEncontrado = false;
    for (let i = 0 ; i < listaAnimais.length ; i++) {
      if (listaAnimais[i].id == registro.id) {
        listaAnimais[i] = registro;
        registroEncontrado = true;
      }
    }
    if (!registroEncontrado) {
      listaAnimais.push(registro);
    }
    localStorage.setItem('animais', JSON.stringify(listaAnimais));
    localStorage.setItem('syncStatus', 'upload');
    this.toastService.show('Salvo com sucesso!', 1000, 'green');
    this.router.navigateByUrl('/meus-bichinhos');
  }

  alterarImagem(event) {
    this.srcImagem = event;
    this.imagemAlterada = true;
  }
}
