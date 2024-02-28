import { Component, DoCheck, OnInit, inject } from '@angular/core';
import { DatapassingService } from '../Services/datapassing.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit,DoCheck {
  data = inject(DatapassingService);
  isLogin: boolean = true;
  loginName: string = "User";
  constructor(private jwt: JwtHelperService) {
    
  }
  ngOnInit(): void {
   
    this.data.isLoginComp.subscribe((data) => {
      this.isLogin = data;
    })
  }
  isExp: boolean = true;
  ngDoCheck(): void {
    if (localStorage.getItem("loginData")) {
      const loginDetails = JSON.parse(localStorage.getItem("loginData"));
      const token = loginDetails.token;
      const jsonToken = JSON.stringify(token);
      this.isExp = this.jwt.isTokenExpired(jsonToken);
      this.loginName = loginDetails.firstName;
    }
    if (this.isExp) {
      this.loginName = "User";
    }
  }

}
