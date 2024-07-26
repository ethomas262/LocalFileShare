import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { File } from '../models/file'


@Injectable({
  providedIn: 'root'
})
export class FileDataService {

  constructor(private http: HttpClient) { }
  url = "http://localhost:3000/files"

  addFile(file_data: FormData) : Observable<File>{
    return this.http.post<File>(this.url, file_data)
  }

  getFiles() : Observable<File[]>{
    return this.http.get<File[]>(this.url)
  }

  
}
