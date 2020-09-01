import { PesoService } from './peso.service';
import { AnimalService } from './animal.service';
import { Injectable } from '@angular/core';
import { VermifugoService } from './vermifugo.service';
import { VacinaService } from './vacina.service';
import { OnlineOfflineService } from './online-offline.service';
import { MedicarService } from './medicar.service';

@Injectable({
  providedIn: 'root'
})
export class SincronizacaoService {

  constructor(
    private animalService: AnimalService,
    private pesoService: PesoService,
    private vermifugoService: VermifugoService,
    private vacinaService: VacinaService,
    private medicacaoService: MedicarService,
    private onOffService: OnlineOfflineService) { }


  iniciarBD() {
    const request = window.indexedDB.open('meupetlindo', 3);
  }

  syncPushNecessario(): boolean {
    const syncStatus = localStorage.getItem('syncStatus');
    if (syncStatus) {
      if (syncStatus === 'upload') {
        return true;
      }
    } else {
      localStorage.setItem('syncStatus', 'ok');
    }
    return false;
  }


  syncPush() {
    const syncStatus = localStorage.getItem('syncStatus');
    if (syncStatus) {
      if (syncStatus === 'upload') {
        if (this.onOffService.isOnline() && this.onOffService.getStatusServidor()) {
          localStorage.setItem('syncStatus', 'uploading');
          const animais = this.getTodosAnimais();
          const pesos = this.getTodosPesos();
          const vermifugos = this.getTodosVermifugos();
          const vacinas = this.getTodasVacinas();
          const animaisExcluir = this.getAnimaisExcluir();
          const pesosExcluir = this.getPesoExcluir();
          const vermifugosExcluir = this.getVermifugosExcluir();
          const vacinasExcluir = this.getVacinasExcluir();
          const medicacoesExcluir = this.getMedicacoesExcluir();
          const qtdAnimal = animais.length;
          let indiceAnimal = 1;
          for (const animal of animais ) {
            if (animal.id < 0 ) {
              animal.idNegativo = animal.id;
              animal.id = null;
            }
            this.animalService.salvar(animal).subscribe( res => {
                if (animal.srcImg && animal.imagemAlterada) {
                  this.animalService.uploadImagem(res, animal.srcImg ).subscribe();
                }
                for (const peso of pesos ) {
                  if (peso.idAnimal == animal.idNegativo) {
                    peso.idAnimal = res;
                  }
                  if ( peso.id < 0 ){
                    peso.id = null;
                  }
                  if (!peso.id) {
                    this.pesoService.salvar(peso).subscribe();
                  }
                }
                for (const vacina of vacinas ) {
                  if (vacina.idAnimal == animal.idNegativo) {
                    vacina.idAnimal = res;
                  }
                  if ( vacina.id < 0 ) {
                    vacina.id = null;
                  }
                  if (!vacina.id) {
                    this.vacinaService.salvar(vacina).subscribe();
                  }
                }
                for (const vermifugo of vermifugos ) {
                  if (vermifugo.idAnimal == animal.idNegativo) {
                    vermifugo.idAnimal = res;
                  }
                  if ( vermifugo.id < 0 ) {
                    vermifugo.id = null;
                  }
                  if (!vermifugo.id) {
                    this.vermifugoService.salvar(vermifugo).subscribe();
                  }
                }
            });
            indiceAnimal++;
            if (indiceAnimal >= animais.length) {
              localStorage.setItem('syncStatus', 'ok');
            }
          }
          for (const id of animaisExcluir) {
            if (id > 0) {
            this.animalService.deletar(id).subscribe();
            }
          }
          for (const id of pesosExcluir) {
            if (id > 0) {
            this.pesoService.deletar(id).subscribe();
            }
          }
          for (const id of vacinasExcluir) {
            if (id > 0) {
            this.vacinaService.deletar(id).subscribe();
            }
          }
          for (const id of vermifugosExcluir) {
            if (id > 0) {
            this.vermifugoService.deletar(id).subscribe();
            }
          }
          for (const id of medicacoesExcluir) {
            if (id > 0) {
            this.medicacaoService.deletar(id).subscribe();
            }
          }
          this.syncClean();
          localStorage.setItem('syncStatus', 'ok');
        }
      }
    } else {
      localStorage.setItem('syncStatus', 'ok');
    }
  }

  syncClean(){
    localStorage.setItem('animais', '[]');
    localStorage.setItem('pesos', '[]');
    localStorage.setItem('vermifugos', '[]');
    localStorage.setItem('vacinas', '[]');
    localStorage.setItem('animaisExcluir', '[]');
    localStorage.setItem('pesosExcluir', '[]');
    localStorage.setItem('vermifugosExcluir', '[]');
    localStorage.setItem('vacinasExcluir', '[]');
    localStorage.setItem('medicacaoExcluir', '[]');
  }

  syncPull() {
    const syncStatus = localStorage.getItem('syncStatus');
    if (syncStatus !== 'upload') {
      this.animalService.listar().subscribe(res => {
        const animais: any = res;
        localStorage.setItem('animais', JSON.stringify(animais));
      }, erro => { });
      this.pesoService.listar().subscribe(res => {
        const pesos: any = res;
        localStorage.setItem('pesos', JSON.stringify(pesos));
      }, erro => { });

      this.vacinaService.listar().subscribe(res => {
        const vacinas: any = res;
        localStorage.setItem('vacinas', JSON.stringify(vacinas));
      }, erro => { });

      this.vermifugoService.listar().subscribe(res => {
        const vermifugos: any = res;
        localStorage.setItem('vermifugos', JSON.stringify(vermifugos));
      }, erro => { });

      this.medicacaoService.listar().subscribe(res => {
        const medicacoes: any = res;
        localStorage.setItem('medicacoes', JSON.stringify(medicacoes));
      }, erro => { });
    }
  }

  getTodosAnimais() {
    const animais: any = JSON.parse(localStorage.getItem('animais'));
    return animais;
  }
  getTodosPesos() {
    const listaPeso: any = JSON.parse(localStorage.getItem('pesos'));
    return listaPeso;
  }
  getTodosVermifugos() {
    const listaVermifugo: any = JSON.parse(localStorage.getItem('vermifugos'));
    return listaVermifugo;
  }
  getTodasMedicacoes() {
    const listaMedicacao: any = JSON.parse(localStorage.getItem('medicacoes'));
    return listaMedicacao;
  }
  getTodasVacinas() {
    const listaVacina: any = JSON.parse(localStorage.getItem('vacinas'));
    return listaVacina;
  }

  getAnimal(id) {
    const animais: any = JSON.parse(localStorage.getItem('animais'));
    const animal = animais.find(a => a.id == id);
    return animal;
  }

  getPesos(id) {
    const listaPeso: any = JSON.parse(localStorage.getItem('pesos'));
    const pesos = listaPeso.filter(a => a.idAnimal == id);
    return pesos;
  }
  getVermifugos(id) {
    const listaVermifugo: any = JSON.parse(localStorage.getItem('vermifugos'));
    const vermifugos = listaVermifugo.filter(a => a.idAnimal == id);
    return vermifugos;
  }
  getVacinas(id) {
    const listaVacina: any = JSON.parse(localStorage.getItem('vacinas'));
    const vacinas = listaVacina.filter(a => a.idAnimal == id);
    return vacinas;
  }
  getMedicacao(id) {
    const listaMedicacao: any = JSON.parse(localStorage.getItem('medicacoes'));
    const medicacoes = listaMedicacao.filter(a => a.idAnimal == id);
    return medicacoes;
  }

  excluirAnimal(id) {
    let animaisExcluir: any = JSON.parse(localStorage.getItem('animaisExcluir'));
    if (animaisExcluir) {
      animaisExcluir.push(id);
    } else {
      animaisExcluir = [];
      animaisExcluir.push(id);
    }
    localStorage.setItem('animaisExcluir', JSON.stringify(animaisExcluir));
  }

  excluirPeso(id) {
    let pesoExcluir: any = JSON.parse(localStorage.getItem('pesosExcluir'));
    if (pesoExcluir) {
      pesoExcluir.push(id);
    } else {
      pesoExcluir = [];
      pesoExcluir.push(id);
    }
    localStorage.setItem('pesosExcluir', JSON.stringify(pesoExcluir));
  }

  excluirVermifugo(id) {
    let vermifugosExcluir: any = JSON.parse(localStorage.getItem('vermifugosExcluir'));
    if (vermifugosExcluir) {
      vermifugosExcluir.push(id);
    } else {
      vermifugosExcluir = [];
      vermifugosExcluir.push(id);
    }
    localStorage.setItem('vermifugosExcluir', JSON.stringify(vermifugosExcluir));
  }

  excluirVacina(id) {
    let vacinasExcluir: any = JSON.parse(localStorage.getItem('vacinasExcluir'));
    if (vacinasExcluir) {
      vacinasExcluir.push(id);
    } else {
      vacinasExcluir = [];
      vacinasExcluir.push(id);
    }
    localStorage.setItem('vacinasExcluir', JSON.stringify(vacinasExcluir));
  }


  excluirMedicacao(id) {
    let medicacoesExcluir: any = JSON.parse(localStorage.getItem('medicacacoesExcluir'));
    if (medicacoesExcluir) {
      medicacoesExcluir.push(id);
    } else {
      medicacoesExcluir = [];
      medicacoesExcluir.push(id);
    }
    localStorage.setItem('medicacacoesExcluir', JSON.stringify(medicacoesExcluir));
  }

  getAnimaisExcluir() {
    const animais: any = JSON.parse(localStorage.getItem('animaisExcluir'));
    return animais;
  }
  getPesoExcluir() {
    const pesos: any = JSON.parse(localStorage.getItem('pesosExcluir'));
    return pesos;
  }
  getVacinasExcluir() {
    const vacinas: any = JSON.parse(localStorage.getItem('vacinasExcluir'));
    return vacinas;
  }
  getVermifugosExcluir() {
    const vermifugos: any = JSON.parse(localStorage.getItem('vermifugosExcluir'));
    return vermifugos;
  }
  getMedicacoesExcluir() {
    const medicacoes: any = JSON.parse(localStorage.getItem('medicacoesExcluir'));
    return medicacoes;
  }

  getIndiceNegativo() {
    const ultimoIndice = localStorage.getItem('indice');
    if (ultimoIndice) {
      let indice: number = Number(ultimoIndice);
      indice--;
      localStorage.setItem('indice', String(indice));
      return indice;
    } else {
      const indice = -1;
      localStorage.setItem('indice', String(indice));
      return indice;
    }
  }
}
