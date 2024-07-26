
import { Component, OnInit, Input} from '@angular/core';
import { CommonModule } from '@angular/common'
import { Message } from '../models/message'
import { Router } from '@angular/router'
import { ChatMessageComponent } from '../chatmessage/chatmessage.component'
import { MessageDataService } from '../services/message-data-service.service'
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from "@angular/forms";
import { AuthenticationService } from '../services/authentication-service.service'

@Component({
  selector: 'chat-display',
  standalone: true,
  imports: [CommonModule, ChatMessageComponent, ReactiveFormsModule],
  templateUrl: './chat-display.component.html',
  styleUrl: './chat-display.component.css'
})
export class ChatDisplayComponent implements OnInit {

  messages!: Message[];
  message: string = '';

  messageInput: any;
  submitted = false;
  message_model!: Message;
  
   



  constructor(private messageService: MessageDataService, private router: Router,private formBuilder: FormBuilder, private authService: AuthenticationService ){

  }

  public current_author = this.authService.getUserName()
  
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
          window.location.reload();
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

  private getData(): void{
    this.messageService.getMessages()
    .subscribe({
      next: (value: any) => {
        this.messages = value;
        if(value.length > 0){
          this.message = "there are" + value.length + "messages."
        }
        else{
          this.message = "There were no messages retrieved from database"
        }
        console.log(this.message)
        
      },
      error:(error: any) => {
        console.log('Error:' + error);
      }
    }) 
  }


  ngOnInit(): void {
    let messageBody = document.getElementById('scrollable')
    if(!messageBody){

    }else{
      messageBody.scrollTop = messageBody.scrollHeight - messageBody.clientHeight;
    }
    this.messageInput = this.formBuilder.group({
    message:['', Validators.required],
    })
    
    console.log('ngOnInit');
    this.getData()
    
  }


}
