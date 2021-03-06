import { SincronizacaoService } from './service/sincronizacao.service';
import { environment } from 'src/environments/environment';
import { Component, OnInit } from '@angular/core';
import { NavigationStart, NavigationEnd, NavigationError, Router, Event } from '@angular/router';
import { AuthorizationService } from './service/auth.service';
import { SwUpdate, SwPush, } from '@angular/service-worker';
import { OnlineOfflineService } from './service/online-offline.service';
import { MzToastService } from 'ngx-materialize';
import { filter } from 'rxjs/operators';

import { AppService } from './service/app.service';
import { SeoService } from './service/seo.service';
declare let gtag: Function;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'MeuPetLindo';
  estaLogado = false;

  constructor(private router: Router,
    private authService: AuthorizationService,
    private toastService: MzToastService,
    private swUpdate: SwUpdate,
    private swPush: SwPush,
    private appService: AppService,
    public onOffService: OnlineOfflineService,
    private sincronizacaoService: SincronizacaoService,
    private seo: SeoService) {
      seo.addTitulo('Meu Pet Lindo - O APP do seu PET');
      this.serverOnline();
      setInterval(()  => {
        this.serverOnline();
      }, 1000);
      this.onOffService.statusConexaoDispositivo().subscribe(online => {
        if (online) {
          this.toastService.show('Aplicação Online.', 500, 'green');
        } else {
          this.toastService.show('Sem conexão com a internet no momento.', 1000, 'red');
      }
      
    });

    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this.estaLogado = this.authService.estaLogado();
        if (this.estaLogado) {
          this.sincronizacaoService.syncPull();
        }
        gtag('event', 'page_view', {
          page_path: event.urlAfterRedirects
        })
      }
    });
    
  }

  ngOnInit() {
    this.reloadCache();
    this.subscribeToNotifications();
    this.sincronizacaoService.iniciarBD();
    this.sincronizacaoService.syncPull();
  }

  sincronizar(){
    this.sincronizacaoService.syncPush();
  }

  serverOnline(){
    this.onOffService.atualizarStatusServidor();
  }

  reloadCache() {
    if (this.swUpdate.isEnabled) {
      this.swUpdate.available.subscribe(() => {
        window.location.reload();
      });
    }
  }

  subscribeToNotifications() {
    if (this.swPush.isEnabled) {
      this.swPush.requestSubscription({
        serverPublicKey: 'BDx9spiF2Yfn6h7QSpMEeu43O_Scs70dTLNE_g3G6teYFZ1fcN4KwTrRiRFyzpSBVMWnKOTKpJEcIqEsZakxlok'
      })
      .then(sub => {
        this.appService.inscrever(sub).subscribe(res => {
          console.log(res)
        });
      })
      .catch(err => console.error('Could not subscribe to notifications', err));
    }
  }
}
