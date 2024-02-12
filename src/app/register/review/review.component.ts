import { Component, EventEmitter, OnDestroy, OnInit, Output, inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DatapassingService } from 'src/app/Services/datapassing.service';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss']
})
export class ReviewComponent implements OnInit,OnDestroy {
  route: Router = inject(Router);
  data = inject(DatapassingService);
  active: ActivatedRoute = inject(ActivatedRoute);

  form: FormGroup;
  check: boolean = true;
  jobDetailsId: number;

  ngOnInit(): void {
    this.form = this.data.getFormDetails();
    this.form = this.data.getFormDetails();
    this.active.paramMap.subscribe((link) => {
      return this.jobDetailsId = +link.get('id');
    })
    if (this.form.get('perosnalInfo.sendUpdate')['controls'][0] === undefined) {
      this.check = false;
    }
    this.data.show([{ icon: true, clr: true }, { icon: true, clr: true }, { icon: false, clr: true }]);
    this.data.toggleBtnDisabilty(false);
  }
  onSubmitPrevious() {
    this.route.navigateByUrl('register/qualification/'+ this.jobDetailsId);
  }
  onEditPi() {
    this.route.navigateByUrl('register/personalinformation/' + this.jobDetailsId);
  }
  ngOnDestroy(): void {
    this.data.toggleBtnDisabilty(true);
    // this.data.show([{ icon: true, clr: true }, { icon: true, clr: true }, { icon: false, clr: false }]);
  }
}
