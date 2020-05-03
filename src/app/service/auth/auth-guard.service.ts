import { AuthorizationService } from './../auth.service';
import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthGuardService implements CanActivate {

          constructor(public auth: AuthorizationService, public router: Router) { }

          canActivate() {
                    if (!this.auth.estaLogado()) {
                              this.router.navigateByUrl('/');
                              return false;
                    }
                    return true;
          }

}
