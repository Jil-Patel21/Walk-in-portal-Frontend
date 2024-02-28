import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
  inject,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DatapassingService } from 'src/app/Services/datapassing.service';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss'],
})
export class ReviewComponent implements OnInit, OnDestroy {
  route: Router = inject(Router);
  data = inject(DatapassingService);
  active: ActivatedRoute = inject(ActivatedRoute);

  form: FormGroup;
  check: boolean = true;
  jobDetailsId: number;
  obj: any;
  enumData: any;

  ngOnInit(): void {
    this.form = this.data.getFormDetails();
    console.log(this.form);
    // if (!localStorage.getItem('formData')) {
    //   this.obj = this.form.value;
    //   localStorage.setItem('formData', JSON.stringify(this.form.value));
    // } else {
    //   this.obj = JSON.parse(localStorage.getItem('formData'));
    // }
    // console.log(this.obj);
    this.enumData = JSON.parse(localStorage.getItem("enumData"));

    this.active.paramMap.subscribe((link) => {
      return (this.jobDetailsId = +link.get('id'));
    });
    if (this.obj.perosnalInfo.sendUpdate[0] === undefined) {
      this.check = false;
    }
    this.data.show([
      { icon: true, clr: true },
      { icon: true, clr: true },
      { icon: false, clr: true },
    ]);
    this.data.toggleBtnDisabilty(false);
  }
  onSubmitPrevious() {
    this.route.navigateByUrl('register/qualification/' + this.jobDetailsId);
  }
  onEditPi() {
    this.route.navigateByUrl(
      'register/personalinformation/' + this.jobDetailsId
    );
  }
  ngOnDestroy(): void {
    this.data.toggleBtnDisabilty(true);
    localStorage.removeItem('formData');
  }
}
