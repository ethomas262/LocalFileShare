
import { Inject, Injectable } from '@angular/core';
import { STORAGE } from '../storage';
import { User } from '../models/user';
import { AuthResponse } from '../models/authresponse';
import { MessageDataService } from '../services/message-data-service.service';
import { registrationRequest } from '../models/registReq'
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  constructor(
    @Inject(STORAGE) private storage: Storage,
    private messageDataService: MessageDataService
  ) { }

  public getToken(): string {
    return String(this.storage.getItem('login-token'));
  }
  public saveToken(token: string): void {
    this.storage.setItem('login-token', token);
  }
  public saveUserName(name: string) : void{
    this.storage.setItem('username', name)
  }
  public getUserName() : string {
    return String(this.storage.getItem('username'))
  }
  public login(user: User): Promise<any> {
    return this.messageDataService.login(user).then((authResp: AuthResponse) => this.saveToken(authResp.token)).then(() => this.saveUserName(user.name))
  }
  public register(req: registrationRequest): Promise<any> {
    return this.messageDataService.register(req).then((authResp: AuthResponse) => this.saveToken(authResp.token)).then(() => this.saveUserName(req.name))
  }
  public logout(): void {
    this.storage.removeItem('travlr-token');
    this.storage.removeItem('id')
    this.storage.clear()
  }
  public isLoggedIn(): boolean {
    const token: string = this.getToken();
    if (token != 'null') {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp > Date.now() / 1000;
    } else {
      return false;
    }
  }

  public getCurrentUser(): User {
    if (this.isLoggedIn()) {
      const token: string = this.getToken();

      if (token != 'null') {
        const { email, name } = JSON.parse(atob(token.split('.')[1]));
        return { email, name } as User;
      }
    }

    const email: string = '';
    const name: string = '';
    return { email, name } as User;
  }
}
