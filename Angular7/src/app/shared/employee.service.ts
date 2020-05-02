import { Injectable } from '@angular/core';
import { Employee } from './employee.model';
import {  HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http : HttpClient) { }

  readonly baseUrl = "http://localhost:55226/api";
  formData : Employee
  employees = [];

  // Add new employee
  postEmployee(formdata : Employee){
    return this.http.post(this.baseUrl + '/Employee', formdata);
  }

  // Update existing employe
  updateEmployee(formData : Employee){
    return this.http.put(this.baseUrl + '/Employee/' + formData.EmployeeID, formData);
  }

  // remove employee
  deleteEmployee(id : number){
    alert(id);
    return this.http.delete(this.baseUrl + '/Employee/' + id)
  }

  // get all employees
  getAllEmployees(){
    return this.http.get(this.baseUrl + '/Employee').toPromise().then(
      res => { this.employees = res as Employee[]  });
  }
}
