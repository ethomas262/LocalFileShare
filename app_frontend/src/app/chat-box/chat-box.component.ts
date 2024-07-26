import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common'
import { RouterOutlet } from '@angular/router'
import { ChatMessageComponent } from '../chatmessage/chatmessage.component'
import { MessagePromptComponent } from '../message-prompt/message-prompt.component'
import { ChatDisplayComponent } from '../chat-display/chat-display.component'

@Component({
  selector: 'app-chat-box',
  standalone: true,
  imports: [CommonModule, RouterOutlet, ChatMessageComponent, MessagePromptComponent, ChatDisplayComponent],
  templateUrl: './chat-box.component.html',
  styleUrl: './chat-box.component.css'
})
export class ChatBoxComponent {

}
