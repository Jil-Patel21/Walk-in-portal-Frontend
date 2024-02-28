import { Component, DoCheck, OnDestroy, OnInit, inject } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DatapassingService } from 'src/app/Services/datapassing.service';
import { JobsService } from 'src/app/Services/jobs.service';
import { Job } from 'src/app/Types/job';
import { jobDetail } from 'src/app/Types/jobRole';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-jobdetails',
  templateUrl: './jobdetails.component.html',
  styleUrls: ['./jobdetails.component.scss'],
})
export class JobdetailsComponent implements OnInit, OnDestroy {
  jobService: JobsService = inject(JobsService);
  active: ActivatedRoute = inject(ActivatedRoute);
  fs: FormBuilder = inject(FormBuilder);
  route: Router = inject(Router);
  data = inject(DatapassingService);
  toast = inject(ToastrService);

  job: Job;
  isArrowDown: Boolean = false;
  jobDetailsId: number;
  form: FormGroup;
  displayMba: boolean = false;

  showMoreInfo() {
    this.isArrowDown = !this.isArrowDown;
  }
  moreJobInfo: boolean[] = [];
  userID: number;
  jobRoleDetails: any;
  timeSlot: Date[][] = [];

  ngOnInit() {
    this.active.paramMap.subscribe((link) => {
      return (this.jobDetailsId = +link.get('id'));
    });

    this.jobService.getTimeSlot().subscribe((res: any) => {
      let l = res.length;
      for (let i = 0; i < l; i++) {
        let f: Date[] = [];
        let a: string[] = res[i].time_slot_start.split(':');
        let d: Date = new Date(0, 0, 0, +a[0], +a[1], +a[2]);
        f.push(d);
        let b: string[] = res[i].time_slot_end.split(':');
        let d1: Date = new Date(0, 0, 0, +b[0], +b[1], +b[2]);
        f.push(d1);
        this.timeSlot.push(f);
      }
      localStorage.setItem('timeSlotData', JSON.stringify(this.timeSlot));
    });

    const token = JSON.parse(localStorage.getItem('loginData'));
    this.userID = token.uid;

    const obj = { jobOpeningID: this.jobDetailsId };
    this.jobService.jobDetails(obj).subscribe({
      next: (res) => {
        this.jobRoleDetails = res;
      },
      error: (err) => {
        console.log(err.error);
      },
    });

    const jobs = JSON.parse(localStorage.getItem('jobData'));
    this.job = jobs[this.jobDetailsId];

    this.form = this.fs.group({
      jobOpeningID: [this.jobDetailsId + 1, Validators.required],
      userID: [this.userID, Validators.required],
      timeSlotID: ['', Validators.required],
      resumeUrl:[''],
      // resume: [''],
      preferRoles: this.fs.array([], Validators.required),
    });
  }

  onCheckBox(e) {
    const checkArray = this.form.get('preferRoles') as FormArray;
    if (e.target.checked) {
      checkArray.push(new FormControl(e.target.value));
    } else {
      let i: number = 0;
      //filter is not working here
      checkArray.controls.forEach((item: FormControl) => {
        if (item.value == e.target.value) {
          checkArray.removeAt(i);
          return;
        }
        i++;
      });
    }
  }

  uploadResume(event: any) {
    let file = event.target.files[0];
    const formobj = new FormData();
    if (file.type === 'application/pdf') {
      formobj.append('file', file);
      // this.form.value.resumeUrl = formobj;
    } else {
      this.toast.error("please select pdf format file");
    }
  }

  onSave() {
    this.data.setAppliedDetails(this.form);
    console.log(this.form.value);
    
    this.jobService.apply(this.form.value).subscribe({
      next: (v) => {
        this.toast.success('Successfully applied for job');
        this.route.navigateByUrl(`joblist/jobdetails/jobapplied`);
      },
      error: (e) => console.error(e),
    });
  }

  showMoreInfoAboutJob(ind: number) {
    this.moreJobInfo[ind] = !this.moreJobInfo[ind];
  }
  ngOnDestroy(): void {}
}
