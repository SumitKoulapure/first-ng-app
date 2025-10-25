import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from '../model/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeesApi {
  private _httpClient=inject(HttpClient);
  private _baseURL='http://localhost:9090/api';
    
  public getAllEmployees():Observable<Employee[]>{
    
   return this._httpClient.get<Employee[]>(`${this._baseURL}/employees`);

  }

  public getEmployeeDetails(empId:number):Observable<Employee>{
      
     return this._httpClient.get<Employee>(`${this._baseURL}/employees/${empId}`);
  
    }
}
