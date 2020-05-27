import { Component, OnInit } from '@angular/core';
import { PesoService } from '../service/peso.service';
import { AnimalService } from '../service/animal.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Label } from 'ng2-charts';
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2';
import { MzToastService } from 'ngx-materialize';
import { environment } from 'src/environments/environment';
import { VermifugoService } from '../service/vermifugo.service';
import { VacinaService } from '../service/vacina.service';
import { SincronizacaoService } from '../service/sincronizacao.service';

@Component({
  selector: 'app-painel-animal',
  templateUrl: './painel-animal.component.html',
  styleUrls: ['./painel-animal.component.css']
})
export class PainelAnimalComponent implements OnInit {

  constructor(
    private animalService: AnimalService,
    private pesoService: PesoService,
    private vermifugoService: VermifugoService,
    private vacinaService: VacinaService,
    private activatedRoute: ActivatedRoute,
    private toastService: MzToastService,
    private sync: SincronizacaoService,
    private router: Router
  ) {
    this.innerWidth = window.innerWidth;
   }

  idAnimal;
  carregando = false;
  animal: any;
  srcImg = null;
  tempoDeVida = '';
  listaPeso: any = [];
  listaVermifugo: any = [];
  listaVacina: any = [];
  public innerWidth: any;
  public lineChartData: any[] = [
    { data: [], label: '' },
  ];
  public lineChartLabels: Label[] = [];
  public lineChartOptions: any = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      xAxes: [{
        ticks: {
          stepSize: 1,
          min: 0,
          maxRotation: 89,
          minRotation: (this.innerWidth < 900 ? 80 : 0),
          autoSkip: false
       }
      }],
      yAxes: [
        {
          id: 'y-axis-0',
          position: 'left',
        },

      ]
    }
  };

  ngOnInit() {
    this.idAnimal = this.activatedRoute.snapshot.paramMap.get('idAnimal');
    this.carregarAnimal();
  }

  carregarAnimal() {
    this.carregando = true;
    this.animalService.buscar(this.idAnimal).subscribe(res => {
      this.animal = res;
      if (this.animal.idArquivo) {
        this.srcImg = `${environment.API_URL}arquivo/${this.animal.idArquivo}`;
      }
      if (this.animal == null) {
        Swal.fire('Desculpe, não conseguimos encontrar o registro do seu bichinho.', '', 'warning')
        .then(
          () => this.router.navigateByUrl('/meus-bichinhos')
        );
      }
      this.carregarPesos();
      this.carregarVermifugos();
      this.carregarVacinas();
    }, erro => {
      this.carregarOffline();
      this.carregando = false;
    });
  }

  carregarOffline() {
    this.animal = this.sync.getAnimal(this.idAnimal);
    this.listaPeso = this.sync.getPesos(this.idAnimal);
    this.listaVermifugo = this.sync.getVermifugos(this.idAnimal);
    this.listaVacina = this.sync.getVacinas(this.idAnimal);
    this.configurarGrafico();
  }

  carregarPesos() {
    this.pesoService.listarPorAnimal(this.idAnimal).subscribe(res => {
      this.listaPeso = res;
      this.carregando = false;
      this.configurarGrafico();
    }, erro => this.carregando = false);
  }

  carregarVermifugos() {
    this.vermifugoService.listarPorAnimal(this.idAnimal).subscribe(res => {
      this.listaVermifugo = res;
      this.carregando = false;
      this.configurarGrafico();
    }, erro => this.carregando = false);
  }

  carregarVacinas() {
    this.vacinaService.listarPorAnimal(this.idAnimal).subscribe(res => {
      this.listaVacina = res;
      this.carregando = false;
      this.configurarGrafico();
    }, erro => this.carregando = false);
  }

  configurarGrafico() {
    this.lineChartData[0].label = this.animal.nome;
    this.lineChartData[0].data = [];
    this.lineChartLabels = [];
    for (const item of this.listaPeso) {
      this.lineChartData[0].data.push(item.peso);
      this.lineChartLabels.push( new DatePipe('en-US').transform(item.dataPesagem, 'dd/MM/yy') );
    }
  }


  excluirPeso(id) {
    Swal.fire({
      title: 'Tem certeza?',
      text: 'Ao confirmar essa ação, você concorda em excluir essa pesagem.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Sim'
    }).then((result) => {
      if (result.value) {
        this.pesoService.deletar(id).subscribe(res => {
          this.toastService.show('Pesagem Excluída!', 1000, 'red');
          this.carregarPesos();
        }, erro => {
          this.excluirPesoOffline(id);
        });
      }
    });
  }

  excluirVermifugo(id) {
    Swal.fire({
      title: 'Tem certeza?',
      text: 'Ao confirmar essa ação, você concorda em excluir essa vermifugação.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Sim'
    }).then((result) => {
      if (result.value) {
        this.vermifugoService.deletar(id).subscribe(res => {
          this.toastService.show('Vermifugação Excluída!', 1000, 'red');
          this.carregarVermifugos();
        }, erro => {
          this.excluirVermifugoOffline(id);
        });
      }
    });
  }

  excluirVacina(id) {
    Swal.fire({
      title: 'Tem certeza?',
      text: 'Ao confirmar essa ação, você concorda em excluir essa vacina.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Sim'
    }).then((result) => {
      if (result.value) {
        this.vacinaService.deletar(id).subscribe(res => {
          this.toastService.show('Vacina Excluída!', 1000, 'red');
          this.carregarVacinas();
        }, erro => {
          this.excluirVacinaOffline(id);
        });
      }
    });
  }

  
  excluirPesoOffline(id) {
    this.sync.excluirPeso(id);
    const pesos: any = JSON.parse(localStorage.getItem('pesos'));
    const index = pesos.findIndex(a => a.id == id );
    pesos.splice(index, 1);
    const indexLista = this.listaPeso.findIndex(a => a.id == id );
    this.listaPeso.splice(indexLista, 1);
    this.configurarGrafico();
    localStorage.setItem('pesos', JSON.stringify(pesos));
    localStorage.setItem('syncStatus', 'update');
  }
  
  excluirVermifugoOffline(id) {
    this.sync.excluirVermifugo(id);
    const vermifugos: any = JSON.parse(localStorage.getItem('vermifugos'));
    const index = vermifugos.findIndex(a => a.id == id );
    vermifugos.splice(index, 1);
    const indexLista = this.listaVermifugo.findIndex(a => a.id == id );
    this.listaVermifugo.splice(indexLista, 1);
    localStorage.setItem('vermifugos', JSON.stringify(vermifugos));
    localStorage.setItem('syncStatus', 'update');
  }
  
  excluirVacinaOffline(id) {
    this.sync.excluirVacina(id);
    const vacinas: any = JSON.parse(localStorage.getItem('vacinas'));
    const index = vacinas.findIndex(a => a.id == id );
    vacinas.splice(index, 1);
    const indexLista = this.listaVacina.findIndex(a => a.id == id );
    this.listaVacina.splice(indexLista, 1);
    localStorage.setItem('vacinas', JSON.stringify(vacinas));
    localStorage.setItem('syncStatus', 'update');
  }

}
