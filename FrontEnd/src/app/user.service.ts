import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }
  public isAuthenticated(): boolean{
   
    const token = localStorage.getItem('session');

    if(token){
      return true;
    }
    else{
      return false;
    }
  }
}
