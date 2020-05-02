import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/shared/employee.model';
import { EmployeeService } from 'src/app/shared/employee.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  constructor(public empService : EmployeeService, private toastr : ToastrService) { }
  
  ngOnInit() {
    this.empService.getAllEmployees();
  }

  populateFormData(emp : Employee){
    this.empService.formData = Object.assign({},emp);
  }

  onDelete(employeeID : number){
    if(confirm('Would you like to delete this record ?'))
      this.empService.deleteEmployee(employeeID).subscribe(
        res => {
          this.toastr.warning('Deleted Successfully', 'Employee Registration');
          this.empService.getAllEmployees();
        }
      );
  }
}
