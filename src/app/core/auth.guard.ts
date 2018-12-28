import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private snack: ToastrService) {

  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      console.log(this.auth.isLoggedIn);
      this.auth.isLoggedIn === false ? this.snack.show('Login then navigate to Tutorial Page.', 'Tip, to the Rescue') : '';
    return this.auth.isLoggedIn;
  }
}
