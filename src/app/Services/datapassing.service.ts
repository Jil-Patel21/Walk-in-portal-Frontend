import { EventEmitter, Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class DatapassingService {
   
  showIcon: EventEmitter<{ icon: boolean, clr: boolean }[]> = new EventEmitter<{ icon: boolean, clr: boolean }[]>();
  isBtnDisable: EventEmitter<boolean> = new EventEmitter<boolean>();
  isLoginComp: EventEmitter<boolean> = new EventEmitter<boolean>();
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
