import { SincronizacaoService } from './service/sincronizacao.service';
import { environment } from 'src/environments/environment';
import { Component, OnInit } from '@angular/core';
import { NavigationStart, NavigationEnd, NavigationError, Router, Event } from '@angular/router';
import { AuthorizationService } from './service/auth.service';
import { SwUpdate, SwPush, } from '@angular/service-worker';
import { OnlineOfflineService } from './service/online-offline.service';
import { MzToastService } from 'ngx-materialize';

import { AppService } from './service/app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'MeuDogLindo';
  estaLogado = false;
  constructor(private router: Router,
    private authService: AuthorizationService,
    private toastService: MzToastService,
    private swUpdate: SwUpdate,
    private swPush: SwPush,
    private appService: AppService,
    private onOffService: OnlineOfflineService,
    private sincronizacaoService: SincronizacaoService,) {

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
      }
    });
    setInterval(()  => {
      this.sincronizar();
    }, 5000);
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
