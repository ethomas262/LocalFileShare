import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, lastValueFrom } from 'rxjs';
import { Message } from '../models/message'
import { AuthResponse } from '../models/authresponse';
import { config } from 'dotenv'
import { User } from '../models/user';
import { registrationRequest } from '../models/registReq'

@Injectable({
  providedIn: 'root'
})
export class MessageDataService {

  constructor(private http: HttpClient) {}
  url = "http://localhost:3000/api";
  

  addMessage(message_data: Message) : Observable<Message>{

    return this.http.post<Message>(this.url + "/messages", message_data)
    //return this.http.post<Message>(this.url, formData)
  }
  getOthers(homeAuthor: string) : Observable<Message[]> {
    return this.http.get<Message[]>(this.url + '/otherMessages/' + ":" + homeAuthor)
  }

  getMessages() : Observable<Message[]> {
    return this.http.get<Message[]>(this.url + '/oldMessages')
  }


  login(user: User): Promise<AuthResponse> {
    let url = `${this.url}/login`
    return this.makeAuthApiCall('login', user)
  }

  register(req: registrationRequest) : Promise<AuthResponse> {
    let url = `${this.url}/register`
    return this.makeAuthRegistrationCall('register', req)
  }
  private async makeAuthRegistrationCall(urlPath: string, req: registrationRequest) : Promise<AuthResponse>{
    const url: string = `${this.url}/${urlPath}`;
    return (await lastValueFrom(this.http.post(url, req))) as AuthResponse;

  }


  private async makeAuthApiCall(
    urlPath: string,
    user: User
  ): Promise<AuthResponse> {
    const url: string = `${this.url}/${urlPath}`;
    return (await lastValueFrom(this.http.post(url, user))) as AuthResponse;
  }

}

