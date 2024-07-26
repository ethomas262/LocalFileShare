
import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common'
@Component({
  selector: 'app-file',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './file.component.html',
  styleUrl: './file.component.css'
})
export class FileComponent {

  @Input('File') File: any;
  public myMessage = false;

  constructor(){}
}
