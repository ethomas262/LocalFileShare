import { CommonModule } from '@angular/common'
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from "@angular/forms";
import { ChatMessageComponent } from '../chatmessage/chatmessage.component'
import { Component, OnInit, Input } from '@angular/core';
import { MessageDataService } from '../services/message-data-service.service'
import { AuthenticationService } from '../services/authentication-service.service'

import { Message } from '../models/message'

@Component({
  selector: 'message-prompt',
  standalone: true,
  imports: [ChatMessageComponent, ReactiveFormsModule, CommonModule],
  templateUrl: './message-prompt.component.html',
  styleUrl: './message-prompt.component.css'
})
export class MessagePromptComponent implements OnInit{

  messageInput: any;
  submitted = false;
  message_model!: Message;
  message : string ='';
  

  constructor(
    private messageService: MessageDataService,
    private formBuilder: FormBuilder,
    private authService: AuthenticationService
  ){}

  public current_author = this.authService.getUserName()

  

 
  ngOnInit():void{
    this.messageInput = this.formBuilder.group({
    message:['', Validators.required],
    })

  }

  public onSubmit(){
    this.submitted = true
    if(this.messageInput?.valid){
      
      let newMessage : Message = {
        author: this.current_author,
        message: this.messageInput.value.message
        }
      
      this.messageService.addMessage(newMessage)
      .subscribe({
        next:(value: any) => {
          console.log(value);
          this.ngOnInit();
        },
        error:(error:any) => {
          console.log('Error: ' + error)
        }
      })
    }
    else{
      console.log(this.messageInput.value)
    }

  }

  get f() {return this.messageInput.controls;}
}
