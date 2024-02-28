import { Component, ElementRef, ViewChild, inject } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DatapassingService } from 'src/app/Services/datapassing.service';
import { JobsService } from 'src/app/Services/jobs.service';

@Component({
  selector: 'app-personal-information',
  templateUrl: './personal-information.component.html',
  styleUrls: ['./personal-information.component.scss'],
})
export class PersonalInformationComponent {
  @ViewChild('image') ig: ElementRef;

  formDetails: FormBuilder = inject(FormBuilder);
  route: Router = inject(Router);
  data = inject(DatapassingService);
  active: ActivatedRoute = inject(ActivatedRoute);
  jobService: JobsService = inject(JobsService);

  form: FormGroup;
  jobDetailsId: number;
  checkArr: boolean[] = [false, false, false, false, false];
  sendUpdate: boolean = false;
  jobRoles: { job_role_name: string, id: number }[];

  ngOnInit() {
    this.form = this.data.getFormDetails();
    this.data.LoginHeader(false);
    this.active.paramMap.subscribe((link) => {
      return this.jobDetailsId = +link.get('id');
    })

    this.jobService.getEnumDetails().subscribe((res: any) => {
      this.jobRoles = res.enumJData;
      localStorage.setItem("enumData",JSON.stringify(res));
      const ar: FormArray = this.form.get('perosnalInfo.preferRoles') as FormArray;
      let i = 0;
      ar.controls.forEach((item: FormControl) => {
        if (+item.value === this.jobRoles[i].id) {
          this.checkArr[i] = true;
        }
        i++;
      });
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
  showPassword() {
    if (this.ig.nativeElement.type === 'password') {
      this.ig.nativeElement.type = 'text';
    } else {
      this.ig.nativeElement.type = 'password';
    }
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
