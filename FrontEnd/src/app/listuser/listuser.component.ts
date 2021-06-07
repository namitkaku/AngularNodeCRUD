import { Component, OnInit } from '@angular/core';
import {ApiserviceService} from '../apiservice.service';
import {ConfirmationService} from 'primeng/api';

@Component({
  selector: 'app-listuser',
  templateUrl: './listuser.component.html',
  styleUrls: ['./listuser.component.css']
})
export class ListuserComponent implements OnInit {

  data:any;
  constructor(private serviceObject:ApiserviceService,
    private confirmationService: ConfirmationService) { }

    confirm() {
      this.confirmationService.confirm({
          message: 'Are you sure that you want to perform this action?',
          accept: () => {
              //Actual logic to perform a confirmation
          }
      });
  }

    ngOnInit(): void {
      
      this.listUsers();

    }
    
    listUsers()
    {
      this.serviceObject.listUsers().subscribe(response => {
      this.data = response['data'];  
      })
    }

}
