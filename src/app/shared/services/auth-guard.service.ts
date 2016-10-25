import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Rx';

import { UserService } from './user.service';

@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(
    private router: Router,
    private userService: UserService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    this.verifyAuthenticated();
    return this.userService.isAuthenticated.take(1);

  }

  verifyAuthenticated(): void {
    this.userService.isAuthenticated.subscribe(authenticated => {
      if (!authenticated) {
        this.router.navigate(['login']);
      }
    });
  }
}
