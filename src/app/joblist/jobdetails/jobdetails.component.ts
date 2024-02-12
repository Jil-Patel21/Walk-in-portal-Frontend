import { Component, OnInit, inject } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DatapassingService } from 'src/app/Services/datapassing.service';
import { JobsService } from 'src/app/Services/jobs.service';
import { Job } from 'src/app/Types/job';

@Component({
  selector: 'app-jobdetails',
  templateUrl: './jobdetails.component.html',
  styleUrls: ['./jobdetails.component.scss'],
})
export class JobdetailsComponent implements OnInit {
  jobService: JobsService = inject(JobsService);
  active: ActivatedRoute = inject(ActivatedRoute);
  fs: FormBuilder = inject(FormBuilder);
  route: Router = inject(Router);
  data = inject(DatapassingService);

  job: Job;
  isArrowDown: Boolean = false;
  jobDetailsId: number;
  form: FormGroup;

  showMoreInfo() {
    this.isArrowDown = !this.isArrowDown;
  }
  moreJobInfo: boolean[] = [];
  ngOnInit() {
    this.form = this.fs.group({
      timeSlot: ['', Validators.required],
      preferRoles:this.fs.array([],Validators.required)
    })
    for (let i = 0; i < this.jobService.jobs.length; i++) {
      this.moreJobInfo.push(false);
    }
    this.active.paramMap.subscribe((link) => {
      return this.jobDetailsId = +link.get('id');
    })
    this.job = this.jobService.jobs[this.jobDetailsId]
  }
  onCheckBox(e) {
    const checkArray = this.form.get('preferRoles') as FormArray;
    if (e.target.checked) {
      checkArray.push(new FormControl(e.target.value));
    }
    else {
      let i: number = 0;
      //filter is not working here
      checkArray.controls.forEach((item: FormControl) => {
        if (item.value == e.target.value) {
          checkArray.removeAt(i);
          return;
        }
        i++;
      });
      console.log(checkArray);
    }
  }
  onClickApply() {
    this.data.setAppliedDetails(this.form);
    this.route.navigateByUrl(`joblist/jobdetails/jobapplied`);
  }
  showMoreInfoAboutJob(ind: number) {
    this.moreJobInfo[ind] = !this.moreJobInfo[ind];
  }
}
