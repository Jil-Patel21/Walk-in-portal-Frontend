import { Injectable } from '@angular/core';
import { Job } from '../Types/job';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class JobsService {
  constructor(private http: HttpClient) {}
  private url: string = 'https://localhost:7225/api/Practice';
  j: any;
  list() {
    return this.http.get(this.url);
  }
  private loginUrl: string = 'https://localhost:7225/api/Practice/login';
  loginUser(loginDetails: any) {
    return this.http.post(this.loginUrl, loginDetails);
  }
  
  private registerPiUrl: string =
    'https://localhost:7225/api/Practice/register/personalinformation';

  registerUser(registerDetails: any) {
    return this.http.post(this.registerPiUrl, registerDetails.perosnalInfo);
  }
  private appliedUrl: string = 'https://localhost:7225/api/Practice/applied';

  apply(appliedData: any) {
    return this.http.post(this.appliedUrl, appliedData,this.getHeaders());
  }

  private jobUrl: string = 'https://localhost:7225/api/Practice/jobdata';

  jobDetails(val: { jobOpeningID: number }) {
    return this.http.post(this.jobUrl, val, this.getHeaders());
  }

  private enumUrl: string = 'https://localhost:7225/api/Practice/enumData';
  getEnumDetails() {
    return this.http.get(this.enumUrl);
  }

  private timeSlotUrl: string =
    'https://localhost:7225/api/Practice/getTimeSlot';
  getTimeSlot() {
    return this.http.get(this.timeSlotUrl,this.getHeaders());
  }
  getToken() {
    const data: any = JSON.parse(localStorage.getItem('loginData')).token;
    return data;
  }
  getHeaders() {
    return {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.getToken()
      })
    };
  }
}
