import { Component, inject } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DatapassingService } from 'src/app/Services/datapassing.service';

@Component({
  selector: 'app-personal-information',
  templateUrl: './personal-information.component.html',
  styleUrls: ['./personal-information.component.scss'],
})
export class PersonalInformationComponent {
  formDetails: FormBuilder = inject(FormBuilder);
  route: Router = inject(Router);
  data = inject(DatapassingService);
  active: ActivatedRoute = inject(ActivatedRoute);

  form: FormGroup;
  jobDetailsId: number;
  checkArr: boolean[] = [false, false, false, false, false];
  sendUpdate: boolean = false;
  
  jobRoles: { name: string }[] = [
    { name: 'Instructional Designer' },
    { name: 'Software Engineer' },
    { name: 'Software Quality Engineer' },
  ];

  ngOnInit() {
    this.form = this.data.getFormDetails();
    this.data.LoginHeader(false);
    this.active.paramMap.subscribe((link) => {
      return this.jobDetailsId = +link.get('id');
    })

    const ar: FormArray = this.form.get('perosnalInfo.preferRoles') as FormArray;
    let i = 0;
    ar.controls.forEach((item: FormControl) => {
      if (item.value === this.jobRoles[i].name) {
        this.checkArr[i] = true;
      }
      i++;
    });

    const a = <FormArray>this.form.get('perosnalInfo.sendUpdate') as FormArray;
    a.controls.forEach((item: FormControl) => {
      console.log(item.value)
      if (item.value === 1) {
        this.sendUpdate = true;
      }
    });
    this.data.show([
      { icon: false, clr: true },
      { icon: false, clr: false },
      { icon: false, clr: false },
    ]);
  }
  onCheckboxChange(e) {
    if (e.target.checked) {
      (<FormArray>this.form.get('perosnalInfo.preferRoles')).push(
        new FormControl(e.target.value)
      );
    } else {
      let i: number = 0;
      (<FormArray>this.form.get('perosnalInfo.preferRoles')).controls.forEach(
        (item: FormControl) => {
          if (item.value == e.target.value) {
            (<FormArray>this.form.get('perosnalInfo.preferRoles')).removeAt(i);
            return;
          }
          i++;
        }
      );
    }
  }
  onchange(e) {
    if (e.target.checked) {
      (<FormArray>this.form.get('perosnalInfo.sendUpdate')).push(new FormControl(1));
    } else {
      (<FormArray>this.form.get('perosnalInfo.sendUpdate')).removeAt(0);
    }
  }
  submitPersonalInfo() {
    this.route.navigateByUrl('/register/qualification/'+ this.jobDetailsId);
  }
}
