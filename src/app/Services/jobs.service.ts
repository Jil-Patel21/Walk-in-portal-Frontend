import { Injectable } from '@angular/core';
import { Job } from '../Types/job';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class JobsService {
  constructor(private http: HttpClient) { }
  url: string = "https://localhost:7225/api/Practice";
  j: any;
  list() {
    // this.http.get(this.url).subscribe({
    //   next: res => {
    //     this.j = res;
    //   },
    //   error: err => {
    //     console.log(err);
    //   }
    // })
    return this.http.get(this.url);
  }
  jobs: Job[] =
    [
      {
        expires: {
          isExpire: true,
          expireMsg: 'Expires in 5 days',
        },
        jobRole: 'Walk in for multple job role',
        isApplyBtnPresent: false,
        date: '10-Jul-2021 to 11-Jul-2021',
        location: 'Mumbai',
        jobRoles: [
          {
            jobImage:
              'https://thumbor.forbes.com/thumbor/fit-in/900x510/https://www.forbes.com/advisor/wp-content/uploads/2022/06/software_engineer.jpeg.jpg',
            jobRoleName: 'Instructional Designer',
          },
        ],
        mba: {
          isMbaInternship: false,
          mbaMsg:"Internship Opportunity for MCA Students"
        },
        isviewBtnPresent: true,
        isMoreDetailsBtnPresent: false,
      },
      {
        expires: {
          isExpire: false,
          expireMsg: 'Expires in 5 days',
        },
        jobRole: 'Walk in for multple job roles',
        isApplyBtnPresent: false,
        date: '03-Jul-2021 to 04-Jul-2021',
        location: 'mumbai',
        jobRoles: [
          {
            jobImage:
              'https://thumbor.forbes.com/thumbor/fit-in/900x510/https://www.forbes.com/advisor/wp-content/uploads/2022/06/software_engineer.jpeg.jpg',
            jobRoleName: 'Instructional Designer',
          },
          {
            jobImage:
              'https://thumbor.forbes.com/thumbor/fit-in/900x510/https://www.forbes.com/advisor/wp-content/uploads/2022/06/software_engineer.jpeg.jpg',
            jobRoleName: 'Software Engineer',
          },
          {
            jobImage:
              'https://thumbor.forbes.com/thumbor/fit-in/900x510/https://www.forbes.com/advisor/wp-content/uploads/2022/06/software_engineer.jpeg.jpg',
            jobRoleName: 'Software Quality Engineer',
          }
        ],
        mba: {
          isMbaInternship: true,
          mbaMsg:"Internship Opportunity for MCA Students"
        },
        isviewBtnPresent: true,
        isMoreDetailsBtnPresent: false,
      },
      {
        expires: {
          isExpire: false,
          expireMsg: 'Expires in 5 days',
        },
        jobRole: 'Walk in for Design and Developement Job Role',
        isApplyBtnPresent: false,
        date: '10-Jul-2021 to 11-Jul-2021',
        location: 'mumbai',
        jobRoles: [
          {
            jobImage:
              'https://thumbor.forbes.com/thumbor/fit-in/900x510/https://www.forbes.com/advisor/wp-content/uploads/2022/06/software_engineer.jpeg.jpg',
            jobRoleName: 'Instructional Designer',
          },
          {
            jobImage:
              'https://thumbor.forbes.com/thumbor/fit-in/900x510/https://www.forbes.com/advisor/wp-content/uploads/2022/06/software_engineer.jpeg.jpg',
            jobRoleName: 'Software Engineer',
          }
        ],
        mba: {
          isMbaInternship: false,
          mbaMsg:"Internship Opportunity for MCA Students"
        },
        isviewBtnPresent: true,
        isMoreDetailsBtnPresent: false,
      },
  ]  
}
