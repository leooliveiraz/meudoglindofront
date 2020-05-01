import { TokenInterceptor } from './service/auth/token-interceptor.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CabecalhoComponent } from './cabecalho/cabecalho.component';
import { RodapeComponent } from './rodape/rodape.component';
import { ChartsModule } from 'ng2-charts';
import { MzSidenavModule, MzDatepickerModule, MzCheckboxModule } from 'ngx-materialize';
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
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { PesarComponent } from './pesar/pesar.component';
import { PainelAnimalComponent } from './painel-animal/painel-animal.component';
import { LoginGoogleComponent } from './login-google/login-google.component';
import { LogoutComponent } from './logout/logout.component';
import { SobreComponent } from './sobre/sobre.component';
import { SocialLoginModule, AuthServiceConfig } from 'angularx-social-login';
import { GoogleLoginProvider} from 'angularx-social-login';


const config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider('831677366245-kst0gbnp03n8912pnv5bdqms1gk8giim.apps.googleusercontent.com')
  }
]);

export function provideConfig() {
  return config;
}

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
    PainelAnimalComponent,
    LoginGoogleComponent,
    LogoutComponent,
    SobreComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    SocialLoginModule,
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
    MzCheckboxModule ,
    ChartsModule

  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }