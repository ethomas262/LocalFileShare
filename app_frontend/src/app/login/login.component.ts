import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication-service.service';
import { User } from '../models/user';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})

export class LoginComponent implements OnInit {
  public formError: string = '';
  public credentials = {
    name: '',
    email: '',
    password: '',
  };

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit() {}
  public onLoginSubmit(): void {
    this.formError = '';
    if (!this.credentials.name || !this.credentials.password) {
      this.formError = 'All fields are required, please try again';
    } else {
      this.doLogin();
    }
  }

  private doLogin(): void {
    let user: User = {
      name: this.credentials.name,
      password: this.credentials.password
    }

    this.authenticationService
      .login(this.credentials)
      .then(() => this.router.navigateByUrl('main-app'))
      .catch((message) => (this.formError = message.message));
  }
  public register(){
    this.router.navigateByUrl('register')
  }
}
