import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { EventList } from "./components/event-list/event-list";
import { EmployeeList } from "./components/employee-list/employee-list";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, EventList, EmployeeList],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
   protected  title:string ="Welcome to pune";
     protected readonly subTitle:string="the subtitile";

     protected badText:string="Hello <script>alert('you have been hacked!)</script> Bajaj Employees!";
     protected isEnabled:boolean=false;
      
     protected onTitleChange():void{
         this.title="Welcome To First Bajaj Angular Application";
     }




    } 
