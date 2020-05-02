import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/shared/employee.service';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  constructor(public service : EmployeeService, 
    private toastr : ToastrService
    ) { }

  ngOnInit() {
    this.resetForm();
  }

  resetForm(form? : NgForm){
    if(form != null)
    form.resetForm();    
    this.service.formData = {
      EmployeeID : null,
      EmpCode : '',
      Mobile : '',
      Position : '',
      FullName : ''
    }
  }

  onSubmit(form : NgForm){
    if(form.value.EmployeeID == null)
      this.insertRecord(form);
    else
      this.updateEmployee(form);
  }

  insertRecord(form : NgForm){
      this.service.postEmployee(form.value).subscribe(
        res => {
          this.toastr.success('Inserted Successfully', 'Employee Register');
          this.resetForm(form);
        });      
  }

  updateEmployee(form : NgForm){
    this.service.updateEmployee(form.value).subscribe(
      res => {
        this.toastr.info('Updated Successfully', 'Employee Register');
        this.service.getAllEmployees();
        this.resetForm(form);
      });
  }

  onDelete(employeeID:number){
    this.service.deleteEmployee(employeeID).subscribe(
      res => {
        //this.toastr.remove()
      }
    )
  }
}
