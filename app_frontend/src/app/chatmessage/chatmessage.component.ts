import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common'
import { STORAGE } from '../storage';
import { Message } from '../models/message'
import { Inject, Injectable } from '@angular/core';
import { AuthenticationService } from '../services/authentication-service.service'

@Component({
  selector: 'chatmessage',
  standalone: true,
  imports: [CommonModule,],
  templateUrl: './chatmessage.component.html',
  styleUrl: './chatmessage.component.css'
})
export class ChatMessageComponent implements OnInit {

  constructor(private authService: AuthenticationService){}

  @Input('message') Message: any;
  public myMessage = false;
  public checkMessage(): void{
    console.log(this.authService.getUserName())
    if(this.Message.author == this.authService.getUserName()){
      this.myMessage = true
    }
  }
 

  ngOnInit(): void {
    this.checkMessage()
  }

}
