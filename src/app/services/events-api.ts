import { Injectable,inject } from '@angular/core';
import {Event} from '../model/event';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EventsApi {
  private _httpClient=inject(HttpClient);
  private _baseURL='http://localhost:9090/api';
    
  public getAllEvents():Observable<Event[]>{
    
   return this._httpClient.get<Event[]>(`${this._baseURL}/events`);

  }
   
    
  public getEventDetails(eventId:number):Observable<Event>{
    
   return this._httpClient.get<Event>(`${this._baseURL}/events/${eventId}`);

  }

  

}
