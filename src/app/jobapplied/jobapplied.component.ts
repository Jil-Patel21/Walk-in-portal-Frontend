import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { DatapassingService } from '../Services/datapassing.service';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-jobapplied',
  templateUrl: './jobapplied.component.html',
  styleUrls: ['./jobapplied.component.scss'],
})
export class JobappliedComponent implements OnInit,OnDestroy {
  data = inject(DatapassingService);
  form: FormGroup;
  timeSlot: Date[][];
  obj: any;
  job: any;
  dateOrdinal: string = 'th';

  ngOnInit(): void {
    this.form = this.data.getAppliedDetails();
    const data = JSON.parse(localStorage.getItem("timeSlotData"));
    this.timeSlot = data;

    const jobData = JSON.parse(localStorage.getItem("jobData"));

    if (!localStorage.getItem('form')) {
      this.obj = this.form.value;
      localStorage.setItem('form', JSON.stringify(this.form.value));
    } else {
      this.obj = JSON.parse(localStorage.getItem('form'));
    }

    this.job = jobData[this.obj.jobOpeningID];
    let date:number = +(this.job.start_date[8] + this.job.start_date[9]);
    if (date == 1) {
      this.dateOrdinal = 'st';
    }
    if (date == 2) {
      this.dateOrdinal = 'nd';
    }
    if (date == 3) {
      this.dateOrdinal = 'rd';
    }
  }
  ngOnDestroy(): void {
    localStorage.removeItem("timeSlotData");
    localStorage.removeItem('form');
  }
}
