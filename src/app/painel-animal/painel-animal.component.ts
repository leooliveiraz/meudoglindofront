import { Component, OnInit } from '@angular/core';
import { PesoService } from '../service/peso.service';
import { AnimalService } from '../service/animal.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Label } from 'ng2-charts';
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2';
import { MzToastService } from 'ngx-materialize';

@Component({
  selector: 'app-painel-animal',
  templateUrl: './painel-animal.component.html',
  styleUrls: ['./painel-animal.component.css']
})
export class PainelAnimalComponent implements OnInit {

  constructor(
    private animalService: AnimalService,
    private pesoService: PesoService,
    private activatedRoute: ActivatedRoute,
    private toastService: MzToastService,
    private router: Router
  ) {
    this.innerWidth = window.innerWidth;
   }

  idAnimal;
  animal: any;
  listaPeso: any = [];
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
    this.animalService.buscar(this.idAnimal).subscribe(res => {
      this.animal = res;
      if (this.animal == null) {
        Swal.fire('Desculpe, não conseguimos encontrar o registro do seu bichinho.', '', 'warning')
        .then(
          () => this.router.navigateByUrl('/meus-bichinhos')
        );
      }
      this.carregarPesos();
    });
  }

  carregarPesos() {
    this.pesoService.listarPorAnimal(this.idAnimal).subscribe(res => {
      this.listaPeso = res;
      this.configurarGrafico();
    });
  }

  configurarGrafico(){
    this.lineChartData[0].label = this.animal.nome;
    this.lineChartData[0].data = [];
    this.lineChartLabels = [];
    for (const item of this.listaPeso) {
      this.lineChartData[0].data.push(item.peso);
      this.lineChartLabels.push( new DatePipe('en-US').transform(item.dataPesagem, 'dd/MM/yy') );
    }
  }

  
  excluir(id) {
    Swal.fire({
      title: 'Tem certeza?',
      text: "Ao confirmar essa ação, você concorda em excluir essa pesagem.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Sim!'
    }).then((result) => {
      if (result.value) {
        this.pesoService.deletar(id).subscribe(res => {
          this.toastService.show('Pesagem Excluída!', 1000, 'red');
          this.carregarPesos();
        });
      }
    });
  }
}
