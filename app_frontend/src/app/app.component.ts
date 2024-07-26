import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ChatBoxComponent } from './chat-box/chat-box.component'
import { FilesboxComponent } from './filesbox/filesbox.component'
import { LoginComponent } from './login/login.component'
import { NavbarComponent } from './navbar/navbar.component'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,ChatBoxComponent, FilesboxComponent, LoginComponent, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})




export class AppComponent {
  title = 'app_frontend';
}
