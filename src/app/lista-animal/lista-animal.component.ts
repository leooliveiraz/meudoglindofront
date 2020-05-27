import { environment } from 'src/environments/environment';
import { Component, OnInit } from '@angular/core';
import { AnimalService } from '../service/animal.service';
import Swal from 'sweetalert2';
import { MzToastService } from 'ngx-materialize';
import { SincronizacaoService } from '../service/sincronizacao.service';

@Component({
  selector: 'app-lista-animal',
  templateUrl: './lista-animal.component.html',
  styleUrls: ['./lista-animal.component.css']
})
export class ListaAnimalComponent implements OnInit {

  constructor(
    private service: AnimalService,
    private toastService: MzToastService,
    private sync: SincronizacaoService) { }

  lista: any = [];
  carregando = false;
  urlImagem = `${environment.API_URL}arquivo/`;


  ngOnInit() {
    this.carregar();
  }

  excluir(id) {
    Swal.fire({
      title: 'Tem certeza?',
      text: 'Se confirmar, você irá excluir esse animalzinho e seu histórico.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Sim'
    }).then((result) => {
      if (result.value) {
        this.service.deletar(id).subscribe(res => {
          this.toastService.show('Animalzinho Excluído!', 1000, 'red');
          this.carregar();
        }, erro => {
          this.excluirOffline(id);
        });
      }
    });
  }

  excluirOffline(id) {
    this.sync.excluirAnimal(id);
    const animais: any = JSON.parse(localStorage.getItem('animais'));
    const index = animais.findIndex(a => a.id == id );
    animais.splice(index, 1);
    const indexLista = this.lista.findIndex(a => a.id == id );
    this.lista.splice(indexLista, 1);
    localStorage.setItem('animais', JSON.stringify(animais));
  }

  carregar() {
    this.carregando = true;
    this.service.listar().subscribe(res => {
      this.lista = res;
      this.carregando = false;
    }, erro => {
      const animais = localStorage.getItem('animais');
      if (animais) {
        this.lista = JSON.parse(animais);
      }
      this.carregando = false;
    });
  }

}
