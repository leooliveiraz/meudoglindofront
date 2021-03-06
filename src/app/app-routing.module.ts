import { SobreComponent } from './sobre/sobre.component';
import { HomeComponent } from './home/home.component';
import { ListaAnimalComponent } from './lista-animal/lista-animal.component';
import { CadastarAnimalComponent } from './cadastar-animal/cadastar-animal.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule, ExtraOptions } from '@angular/router';
import { PesarComponent } from './pesar/pesar.component';
import { PainelAnimalComponent } from './painel-animal/painel-animal.component';
import { AuthGuardService } from './service/auth/auth-guard.service';
import { VermifugarComponent } from './vermifugar/vermifugar.component';
import { VacinaComponent } from './vacina/vacina.component';
import { MedicarComponent } from './medicar/medicar.component';
import { ExameComponent } from './exame/exame.component';
import { AntipulgaComponent } from './antipulga/antipulga.component';
import { AdicionarAnimalCompartilhadoComponent } from './adicionar-animal-compartilhado/adicionar-animal-compartilhado.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'cadastrar', component: CadastarAnimalComponent, canActivate: [AuthGuardService] },
  { path: 'editar/:id', component: CadastarAnimalComponent, canActivate: [AuthGuardService] },
  { path: 'meus-bichinhos', component: ListaAnimalComponent, canActivate: [AuthGuardService] },
  { path: 'medicar', component: MedicarComponent, canActivate: [AuthGuardService] },
  { path: 'painel/compartilhado/:codigo', component: PainelAnimalComponent, canActivate: [AuthGuardService] },
  { path: 'painel/:idAnimal', component: PainelAnimalComponent, canActivate: [AuthGuardService] },
  { path: 'pesar', component: PesarComponent, canActivate: [AuthGuardService] },
  { path: 'vermifugar', component: VermifugarComponent, canActivate: [AuthGuardService] },
  { path: 'vacinar', component: VacinaComponent, canActivate: [AuthGuardService] },
  { path: 'antipulga', component: AntipulgaComponent, canActivate: [AuthGuardService] },
  { path: 'exame', component: ExameComponent, canActivate: [AuthGuardService] },
  { path: 'compartilhar/:codigo', component: AdicionarAnimalCompartilhadoComponent },
  { path: 'sobre', component: SobreComponent },
];
const routerOptions: ExtraOptions = {
  scrollPositionRestoration: 'enabled',
  anchorScrolling: 'enabled',
  scrollOffset: [0, 64],
};


@NgModule({
  imports: [RouterModule.forRoot(routes, routerOptions)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
