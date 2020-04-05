import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CabecalhoComponent } from './cabecalho/cabecalho.component';
import { RodapeComponent } from './rodape/rodape.component';
import { ChartsModule } from 'ng2-charts';
import { MzSidenavModule, MzDatepickerModule } from 'ngx-materialize';
import { MzIconModule, MzIconMdiModule } from 'ngx-materialize';
import { MzInputModule } from 'ngx-materialize'
import { MzNavbarModule } from 'ngx-materialize';
import { MzButtonModule } from 'ngx-materialize';
import { MzToastModule } from 'ngx-materialize';
import { MzCollectionModule } from 'ngx-materialize';
import { MzSelectModule } from 'ngx-materialize';
import { SidebarComponent } from './sidebar/sidebar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CadastarAnimalComponent } from './cadastar-animal/cadastar-animal.component';
import { PaginaAnimalComponent } from './pagina-animal/pagina-animal.component';
import { ListaAnimalComponent } from './lista-animal/lista-animal.component';
import { HomeComponent } from './home/home.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PesarComponent } from './pesar/pesar.component';
import { PainelAnimalComponent } from './painel-animal/painel-animal.component';

@NgModule({
  declarations: [
    AppComponent,
    CabecalhoComponent,
    RodapeComponent,
    SidebarComponent,
    CadastarAnimalComponent,
    PaginaAnimalComponent,
    ListaAnimalComponent,
    HomeComponent,
    PesarComponent,
    PainelAnimalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MzSidenavModule,
    MzIconModule,
    MzIconMdiModule,
    MzNavbarModule,
    MzInputModule,
    MzCollectionModule,
    MzDatepickerModule,
    MzButtonModule,
    MzToastModule,
    MzSelectModule,
    ChartsModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }