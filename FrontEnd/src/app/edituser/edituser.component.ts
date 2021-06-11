import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from '../apiservice.service';
import { ActivatedRoute } from '@angular/router';
import {FormGroup,FormBuilder,Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';


@Component({
  selector: 'app-edituser',
  templateUrl: './edituser.component.html',
  styleUrls: ['./edituser.component.css']
})
export class EdituserComponent implements OnInit {
  userid:String;
  editUserForm:FormGroup;
  data:any;

  constructor(private serviceObject:ApiserviceService,
    private route: ActivatedRoute,
    private formbuilder:FormBuilder,
    private toastr:ToastrService) { }

    get f(){
      return this.editUserForm.controls;
    }

  ngOnInit(): void {

    this.editUserForm = this.formbuilder.group({
      _id:[''],
      name:['',[Validators.required]],
      email:['',[Validators.required,Validators.email]],
      phone:['',[Validators.required]],
      address:['',[Validators.required]],
    });
   
    this.userid = this.route.snapshot.paramMap.get('id');
    this.serviceObject.getUserInfo(this.userid).subscribe(response => {
      if(response['status'] == 200)
      {
        this.editUserForm.patchValue({
          _id: response['data'][0]._id,
          name: response['data'][0].name,
          email: response['data'][0].email,
          phone: response['data'][0].phone,
          address:response['data'][0].address
        })
      }
    })
  }

  onSubmit()
  {
    this.serviceObject.updateUser(this.editUserForm.value).subscribe(response=>{
      if(response['status'] == 200)
      {
        this.toastr.success(response['message']);
        console.log(response['message']);
      }
      else{
        this.toastr.error(response['message']);
      }
    })
  }

}
