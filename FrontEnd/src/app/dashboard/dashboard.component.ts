import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  
  sessionValue:any;
  constructor() { }
  
  ngOnInit(): void {
    this.sessionValue = localStorage.getItem('session');
  }

}
