
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication-service.service';
import { User } from '../models/user';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit{
  public formError: string = '';
  public credentials = {
    name: '',
    email: '',
    password: '',
    registration_key: ''
  };
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit() {}

  public onRegisterSubmit(): void {
    this.formError = '';
    if (!this.credentials.email || !this.credentials.password || !this.credentials.name || !this.credentials.registration_key) {
      this.formError = 'All fields are required, please try again';
    } else {
      this.doRegister();
    }
  }
  private doRegister(): void {
    console.log(this.credentials)
    this.authenticationService
    .register(this.credentials)
    .then(()=> this.router.navigateByUrl('main-app'))
    .catch((message) => (this.formError = "Invalid Credentials"))
  }

}
