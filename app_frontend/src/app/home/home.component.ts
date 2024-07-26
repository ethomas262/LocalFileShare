import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthenticationService } from '../services/authentication-service.service';
import { ChatBoxComponent } from '../chat-box/chat-box.component'
import { FilesboxComponent } from '../filesbox/filesbox.component'
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ChatBoxComponent, FilesboxComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  constructor(private authService: AuthenticationService, private router: Router) {}
  public loggedIn = false
  public isLoggedIn(): void {
    if(this.authService.isLoggedIn()){
      this.loggedIn = true;
    }else{
      this.router.navigateByUrl('')
    }
  }
  public onLoginClick(){
    this.router.navigateByUrl('')
  }

  ngOnInit() {
    this.isLoggedIn()
  }

  
}