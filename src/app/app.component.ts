import { environment } from 'src/environments/environment';
import { Component, OnInit } from '@angular/core';
import { NavigationStart, NavigationEnd, NavigationError, Router, Event } from '@angular/router';
import { AuthorizationService } from './service/auth.service';
import { SwUpdate, SwPush,  } from '@angular/service-worker';
import { OnlineOfflineService } from './service/online-offline.service';
import { MzToastService } from 'ngx-materialize';
import { PushNotificationOptions, PushNotificationService } from 'ngx-push-notifications';

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
              private onOffService: OnlineOfflineService,
              private appService: AppService,
              private _pushNotificationService: PushNotificationService) {
    this.onOffService.statusConexao().subscribe(online => {
      if ( online ) {
        this.toastService.show('Aplicação Online.', 500, 'green');
      } else {
        this.toastService.show('Sem conexão com a internet no momento.', 1000, 'red');
      }
    });
    this.router.events.subscribe((event: Event) => {
        if (event instanceof NavigationStart) {
        }

        if (event instanceof NavigationEnd) {
          this.estaLogado = this.authService.estaLogado();
        }

        if (event instanceof NavigationError) {
        }
    });
  }
  ngOnInit() {
    this.reloadCache();
    this._pushNotificationService.requestPermission();
  }

  reloadCache() {
    if (this.swUpdate.isEnabled) {
      this.swUpdate.available.subscribe( () => {
          window.location.reload();
      });
    }
  }

  habilitar() {
    this._pushNotificationService.requestPermission();
  }
  notificar() {
    const title = 'Meu Pet Lindo';
    const options = new PushNotificationOptions();
    options.body = 'Native Push Notification';
    options.icon = 'https://img.icons8.com/color/96/000000/dog-house.png';
 
    this._pushNotificationService.create(title, options).subscribe((notif) => {
      if (notif.event.type === 'show') {
        console.log('onshow');
        setTimeout(() => {
          notif.notification.close();
        }, 3000);
      }
      if (notif.event.type === 'click') {
        console.log('click');
        notif.notification.close();
      }
      if (notif.event.type === 'close') {
        console.log('close');
      }
    },
    (err) => {
         console.log(err);
    });
  }
}
