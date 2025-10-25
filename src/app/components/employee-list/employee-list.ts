import { Component, inject } from '@angular/core';
import { Employee } from '../../model/employee';
import { EmploeeDetails } from "../emploee-details/emploee-details";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { EmployeesApi } from '../../services/employees-api';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-employee-list',

  templateUrl: './employee-list.html',
  styleUrl: './employee-list.css',
  imports: [EmploeeDetails,CommonModule,FormsModule,NgxPaginationModule]
})
export class EmployeeList {




  private _employeeApi=inject(EmployeesApi);
  private _eventEmployeesSubscription: Subscription;
  
  
  ngOnInit():void{

   this._eventEmployeesSubscription= this._employeeApi.getAllEmployees().subscribe({
      next:empData=>{
        console.log(empData);
        this.employees=empData;
        this.filteredEmployess=[...this.employees];
      },
      error:err=>{
        console.log(err);
      }
    });
  }






protected title:string="Welcome To Bajaj Finserv Employee List!";
  protected subTitle:string="Published by bajaj finserv HR departments!";



  protected columns:string[]=["Employee Name  ","Employee City  ","Employee Email ","Employee Phone "];
  
protected employees:Employee[]=[];





  protected epageNumber:number=1;
  protected epageSize:number=2;
  
  protected etempNumber:number=1;
  

//protected selectedEmployee:Employee;

protected selectedEmployeeId:number;
onEventSelecction(employeeId:number) {
this.selectedEmployeeId=employeeId;
}

protected employeeName:string;
protected handleEmployeeName(name:string):void{
  this.employeeName=name;
}

protected searchName:string="";
   protected filteredEmployess:Employee[]=[...this.employees];

   protected searchEmployess(): void {
    if (!this.searchName || this.searchName == '') {
      this.epageNumber=this.etempNumber;
      console.log(this.searchName);
    } else {
      if(this.searchName.length==1){
      
      this.filteredEmployess = this.employees;
    }
      this.epageNumber=1;
      this.filteredEmployess = this.employees.filter(employee => employee.employeeName.toLocaleLowerCase().includes(this.searchName.toLocaleLowerCase()));
      console.log(this.filteredEmployess);
    }
  }
    
  ngOnDestroy():void{
    if(this._eventEmployeesSubscription){
      console.log("destroy")
      this._eventEmployeesSubscription.unsubscribe();

    }
  }

}
