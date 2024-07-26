import { CanActivateFn } from '@angular/router';
import { AuthenticationService } from './authentication-service.service'
import { Injectable, Inject } from '@angular/core'
import { Routes } from '@angular/router';


@Injectable()
export class AuthGuardLogin  {

  constructor(public auth: AuthenticationService) {}

  canActivate(): boolean {
    return this.auth.isLoggedIn();
  }

}