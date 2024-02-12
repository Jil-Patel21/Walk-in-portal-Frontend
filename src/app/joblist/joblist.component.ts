import { Component, OnInit, inject } from '@angular/core';
import { Job } from '../Types/job';
import { JobsService } from '../Services/jobs.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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

  form: FormGroup;
  jobs: Job[] = this.jobService.jobs;
  // jobs: Job[];
  // j: Job[];
  constructor(private p: JobsService) {
    // this.p.list().subscribe((res) => {
    //   console.log(res);
    //   this.j = res;
    // })
    function result(res) {
      console.log(res);
      this.jobs = res;
    }
    this.p.list().subscribe(result);
  }
  ngOnInit(): void {
    // this.form = this.fs.group({
    //   timeSlot: ['', Validators.required],
    //   preferRoles:this.fs.array([],Validators.required)
    // })
    // this.jobService.list().subscribe((res) => {
    //   this.j = res;
    // })
    // console.log(this.j);
  }
  func() {
    console.log(this.jobs.length);
    console.log(this.jobs[0].jobRole);
  }
  onSubmit(ind:number) {
    this.route.navigateByUrl('/login/'+ind);
  }
}
