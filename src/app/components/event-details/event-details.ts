import { Component, Input, Output, EventEmitter, inject, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';

import { Event } from './../../model/event';
import { CommonModule } from '@angular/common';

import { EventsApi } from './../../services/events-api';
import { Subscription } from "rxjs";

@Component({
  selector: 'app-event-details',
  imports: [CommonModule],
  templateUrl: './event-details.html',
  styleUrl: './event-details.css',
})
export class EventDetails implements OnChanges ,OnDestroy{
  
  protected title: string = 'Details of :-';

  //@Input() public event:Event;

  @Input() public eventId: number;

  protected event: Event;

  private _eventsApi=inject(EventsApi);
  private _eventsApiSubscription:Subscription;




  @Input() public subTitle: string;

  @Output() sendConfiramtionMessage: EventEmitter<string> = new EventEmitter<string>();

  protected onEventProcess(): void {
    //this will fire an event to send the data to parent components
    this.sendConfiramtionMessage.emit(
      `Event ${this.eventId} has been processed and stored in Oracle DB!`
    );
  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
    this._eventsApiSubscription=this._eventsApi.getEventDetails(this.eventId).subscribe({
      next:data=>{
        this.event=data;
      },
      error:err=>{
       console.log(err)
      }
    })
  }
  ngOnDestroy(): void {
    if(this._eventsApiSubscription) this._eventsApiSubscription.unsubscribe();
    
  }
}
