import { Component, OnInit } from '@angular/core';
import {FormGroup,FormBuilder,Validators} from '@angular/forms';
import {ApiserviceService} from '../apiservice.service';
import { ToastrService } from 'ngx-toastr';
import {Router} from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm:FormGroup;

  constructor(private formBuilder:FormBuilder,
    private serviceObject: ApiserviceService,
    private toastr:ToastrService,
    private router:Router) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email:['',[Validators.required,Validators.email]],
      password:['',[Validators.required,Validators.minLength]]
    })
  }
  get f(){
    return this.loginForm.controls;
  }
  onSubmit()
  {
    this.serviceObject.adminLogin(this.loginForm.value).subscribe(response => {
      if(response['status'] == 200)
      {
       localStorage.setItem('session', response['data']);
       this.router.navigate(['dashboard']);
       this.toastr.success(response['message']);
      }
       else
       this.toastr.error(response['message']);
    })
    console.log(this.loginForm.value);
  }

}
