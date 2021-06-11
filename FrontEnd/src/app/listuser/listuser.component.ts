import { Component, OnInit } from '@angular/core';
import {ApiserviceService} from '../apiservice.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-listuser',
  templateUrl: './listuser.component.html',
  styleUrls: ['./listuser.component.css']
})
export class ListuserComponent implements OnInit {

  data:any;
  constructor(private serviceObject:ApiserviceService,
    private toastr:ToastrService) { }

    
    ngOnInit(): void {
      this.listUsers();
    }
    
    listUsers()
    {
      this.serviceObject.listUsers().subscribe(response => {
      this.data = response['data'];  
      })
    }
    deleteUser(id:String)
    {
      var c = confirm("Are you sure you want to delete this record ?");
      if(c)
      {
        this.serviceObject.deleteUser(id).subscribe(response => {
          console.log(response);
          if(response['status'] == 200)
          {
            this.toastr.success(response['message']);
            this.ngOnInit();
          }
          else{
            this.toastr.error(response['message']);
          }
        })
      }
      else
      {
        return false;
      }
      
    }

    deactivateUser(id:String)
    {
      this.serviceObject.deactivateUser(id).subscribe(response => {
        if(response['status'] == 200)
        {
          this.toastr.success(response['message']);
          this.ngOnInit();
        }
        else{
          this.toastr.error(response['message']);
        }
      })
    }

    activateUser(id:String)
    {
      this.serviceObject.activateUser(id).subscribe(response => {
        if(response['status'] == 200)
        {
          this.toastr.success(response['message']);
          this.ngOnInit();
        }
        else{
          this.toastr.error(response['message']);
        }
      })
    }

}
