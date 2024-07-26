
import { Component, OnInit, Input} from '@angular/core';
import { CommonModule } from '@angular/common'
import { File } from '../models/file'
import { Router } from '@angular/router'
import { FileDataService } from '../services/file-service.service'
import { FileComponent } from '../file/file.component'


@Component({
  selector: 'app-filesbox',
  standalone: true,
  imports: [CommonModule, FileComponent],
  templateUrl: './filesbox.component.html',
  styleUrl: './filesbox.component.css'
})
export class FilesboxComponent implements OnInit {
  constructor(private fileService: FileDataService, private router:Router){}

  files!: File[];
  message: string = ''


  private getData(): void{
    this.fileService.getFiles()
    .subscribe({
      next: (value: any) => {
        this.files=value;

        if(value.length > 0){
          this.message = "there are " + value.length + " files."
        }
        else{
          this.message = "There are no files in the database"
        }
        this.router.navigateByUrl('main-app')

      },
      error:(error: any) => {
        console.log('Error: ' + error);
      }
    })
  }
  public onSubmit(){
    this.ngOnInit()
  }
  
  ngOnInit(): void {
    this.getData()
  }

}
