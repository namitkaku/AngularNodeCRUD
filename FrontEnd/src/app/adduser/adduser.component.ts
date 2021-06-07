import { Component, OnInit } from '@angular/core';
import {FormGroup,FormBuilder,Validators} from '@angular/forms';
import {ApiserviceService} from '../apiservice.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.css']
})
export class AdduserComponent implements OnInit {

  addUserForm:FormGroup;

  constructor(private formBuilder:FormBuilder,
    private serviceObject:ApiserviceService,
    private toastr:ToastrService) { }

  get f(){
    return this.addUserForm.controls;
  }

  ngOnInit(): void {
    this.addUserForm = this.formBuilder.group({
      name:['',[Validators.required]],
      email:['',[Validators.required,Validators.email]],
      phone:['',[Validators.required,Validators.maxLength(10)]],
      address:['',[Validators.required]]
    })
  }

  onSubmit()
  {
    this.serviceObject.addUser(this.addUserForm.value).subscribe(response => {
      console.log(response);
      if(response['status'] == 200)
      {
        this.toastr.success(response['message']);
        this.addUserForm.reset();
      }
      else
      {
        this.toastr.error(response['message']);
      }
    })
    console.log(this.addUserForm.value);
  }

}
