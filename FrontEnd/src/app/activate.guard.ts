import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import {UserService} from '../app/user.service';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ActivateGuard implements CanActivate {

  constructor(private userServiceObject:UserService,
    private router:Router,
    private toastr:ToastrService){}

  canActivate():boolean {
    if(this.userServiceObject.isAuthenticated()){
      return true;
    }
    else{
      this.toastr.warning("You dont have permission to acces this page.Please login first");
      this.router.navigate(['']);
       
    }
  }
   
  
}
