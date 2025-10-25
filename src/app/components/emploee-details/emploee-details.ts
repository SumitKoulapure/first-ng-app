import { Component, Input ,Output,EventEmitter, inject, SimpleChanges} from '@angular/core';
import { Employee } from '../../model/employee';
import { CommonModule } from '@angular/common';
import { EmployeesApi } from '../../services/employees-api';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-emploee-details',
  imports: [CommonModule],
  templateUrl: './emploee-details.html',
  styleUrl: './emploee-details.css'
})
export class EmploeeDetails {
protected title:string="Details of :-"

// @Input() public employee:Employee;

@Input() public employeeId:number;
protected employee:Employee;



  private _employeeApi=inject(EmployeesApi);
  private _eventEmployeesSubscription: Subscription;
  
  
  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
    this._eventEmployeesSubscription=this._employeeApi.getEmployeeDetails(this.employeeId).subscribe({
      next:data=>{
        this.employee=data;
      },
      error:err=>{
       console.log(err)
      }
    })
  }

@Output() sendEmployeeName:EventEmitter<string>=new EventEmitter<string>();

protected onEventProcess():void{

  //this will fire an event to send the data to parent components
  this.sendEmployeeName.emit(`The following ${this.employeeId}  data has  been processed and stored in Oracle DB!`);
}


ngOnDestroy():void{
    if(this._eventEmployeesSubscription){
      console.log("destroy")
      this._eventEmployeesSubscription.unsubscribe();

    }
  }

}
