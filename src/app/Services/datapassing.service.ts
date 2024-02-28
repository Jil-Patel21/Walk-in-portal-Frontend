import { EventEmitter, Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Job } from '../Types/job';
import { BehaviorSubject } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class DatapassingService {
   
  showIcon: EventEmitter<{ icon: boolean, clr: boolean }[]> = new EventEmitter<{ icon: boolean, clr: boolean }[]>();
  isBtnDisable: EventEmitter<boolean> = new EventEmitter<boolean>();
  isLoginComp: EventEmitter<boolean> = new EventEmitter<boolean>();
  loginName: EventEmitter<string> = new EventEmitter<string>();
  userID: EventEmitter<number> = new EventEmitter<number>();
  job: BehaviorSubject<Job[]>;

  constructor(private jwt: JwtHelperService) {
    
  }

  form: FormGroup;
  appliedForm: FormGroup;

  show(arr: { icon: boolean, clr: boolean }[]) {
    this.showIcon.emit(arr);
  }
  toggleBtnDisabilty(val:boolean) {
    this.isBtnDisable.emit(val);
  }

  LoginHeader(val:boolean) {
    this.isLoginComp.emit(val);
  }
   
  isAuthenticated():boolean {
    if (localStorage.getItem("loginData")) {
      const loginDetails = JSON.parse(localStorage.getItem("loginData"));
      const token = loginDetails.token;
      const jsonToken = JSON.stringify(token);
      return this.jwt.isTokenExpired(jsonToken);
    }
    return true;
  }
 
  setLoginName(val: any): number {
    
    this.loginName.emit(val.firstName);
    const user: number = +val.UID;
    this.userID.emit(user);
    return user;
  }
  setUserId(val: any): number{
    return val.uid;
  }
  setAppliedDetails(val: FormGroup) {
    this.appliedForm = val;
  }
  getAppliedDetails(): FormGroup {
    return this.appliedForm;
  }

  setFormDetails(val: FormGroup) {
    this.form = val;
  }
  getFormDetails():FormGroup {
    return this.form;
  }
}
