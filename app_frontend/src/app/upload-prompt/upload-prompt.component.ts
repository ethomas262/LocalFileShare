import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication-service.service';
import { File } from '../models/file'
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FileDataService } from '../services/file-service.service'

@Component({
  selector: 'app-upload-prompt',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './upload-prompt.component.html',
  styleUrl: './upload-prompt.component.css'
})
export class UploadPromptComponent implements OnInit {

  constructor(private router: Router, private fileService: FileDataService){}

  ngOnInit(){}


}
