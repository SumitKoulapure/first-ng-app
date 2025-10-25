import { Component, inject, OnInit} from '@angular/core';
import { Event } from '../../model/event';
import { EventDetails } from '../event-details/event-details';
import { CommonModule } from '@angular/common';
import { DateGlobalizationPipe } from '../../pipes/date-globalization-pipe';
import { LowercaseTrunPipe } from '../../pipes/lowercase-trun-pipe';
import { FormsModule } from '@angular/forms';

import { NgxPaginationModule } from 'ngx-pagination';
import { provideRouter } from '@angular/router';

import { Subscription } from "rxjs";
import { EventsApi } from "../../services/events-api";
@Component({
  selector: 'app-event-list',
  imports: [
    CommonModule,
    EventDetails,
    DateGlobalizationPipe,
    LowercaseTrunPipe,
    FormsModule,
    NgxPaginationModule,
  ],
  templateUrl: './event-list.html',
  styleUrl: './event-list.css',
})
export class EventList implements OnInit{

  private _eventApi=inject(EventsApi);
  private _eventServiceSubscription: Subscription;
  
  
  ngOnInit():void{

   this._eventServiceSubscription= this._eventApi.getAllEvents().subscribe({
      next:eventsData=>{
        console.log(eventsData);
        this.events=eventsData;
        this.filteredEvents=[...this.events];
      },
      error:err=>{
        console.log(err);
      }
    });
  }

  protected title: string = 'Welcome To Bajaj Finserv Event List!';
  protected subTitle: string = 'Published by bajaj finserv HR departments!';

  protected columns: string[] = [
    'Event Code ',
    'Event Name ',
    'Start Date ',
    'Fees',
    'Show details',
  ];

  protected pageNumber: number = 1;
  protected pageSize: number = 2;
  private tempNumber: number = 0;

  protected events: Event[];

  //protected selectedEvent: Event;
  protected selectedEventId:number;
  protected onEventSelecction(eventId:number): void {
    console.log(event);
  //  this.selectedEvent = event;
     this.selectedEventId=eventId  ;
}

  protected childMessage: string;
  protected handleChildMessage(message: string): void {
    this.childMessage = message;
  }

  protected searchChars: string = '';
  protected filteredEvents: Event[];

  protected searchEvents(): void {
    if (!this.searchChars || this.searchChars == '') {
     
      if (this.tempNumber == 0) {
        this.pageNumber = 1;
      } else {
        this.pageNumber = this.tempNumber;

        this.tempNumber = 0;
      }

      console.log(this.searchChars);
      this.filteredEvents = this.events;
    } else {
       
      
      if (this.searchChars.length == 1 && this.tempNumber == 0) {
        this.tempNumber = this.pageNumber;
      }

      this.pageNumber = 1;

      this.filteredEvents = this.events.filter((event) =>
        event.eventName.toLocaleLowerCase().includes(this.searchChars.toLocaleLowerCase())
      );
      console.log(this.filteredEvents);
    }
  }
   
  ngOnDestroy():void{
    if(this._eventServiceSubscription){
      console.log("destroy")
      this._eventServiceSubscription.unsubscribe();

    }
  }

}
