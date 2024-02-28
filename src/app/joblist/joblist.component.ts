import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { JobsService } from '../Services/jobs.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatapassingService } from '../Services/datapassing.service';

@Component({
  selector: 'app-joblist',
  templateUrl: './joblist.component.html',
  styleUrls: ['./joblist.component.scss'],
  providers:[]
})
export class JoblistComponent implements OnInit{
  jobService: JobsService = inject(JobsService);
  route: Router = inject(Router);
  fs: FormBuilder = inject(FormBuilder);
  data = inject(DatapassingService);
  form: FormGroup;
  jobs: any;
 
  
  ngOnInit(): void {
    localStorage.removeItem("loginData");
    this.jobService.list().subscribe((res:any) => {
      this.jobs = res;
      localStorage.setItem("jobData", JSON.stringify(this.jobs));
    })
  }

  onSubmit(ind: number) {
   
    if (this.data.isAuthenticated()) {
      this.route.navigateByUrl('/login/'+ind);
    }
    else {
      this.route.navigateByUrl('/joblist/jobdetails/'+ind);
    }

  }
}
