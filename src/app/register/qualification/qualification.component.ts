import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DatapassingService } from 'src/app/Services/datapassing.service';

@Component({
  selector: 'app-qualification',
  templateUrl: './qualification.component.html',
  styleUrls: ['./qualification.component.scss'],
})
export class QualificationComponent implements OnInit, OnDestroy {
  fs: FormBuilder = inject(FormBuilder);
  route: Router = inject(Router);
  data = inject(DatapassingService);
  active: ActivatedRoute = inject(ActivatedRoute);

  form1: FormGroup;
  form: FormGroup;
  diplayExp: boolean = true;
  displayNotice: boolean = true;
  displayTest: boolean = true;
  checkExpert: boolean[] = [false, false, false, false, false];
  checkFamiliar: boolean[] = [false, false, false, false, false];

  Tech: { name: string }[] = [
    { name: 'javascript' },
    { name: 'Angular JS' },
    { name: 'React' },
    { name: 'Node JS' },
    { name: 'Other' },
  ];
  jobDetailsId: number;

  ngOnInit(): void {
    this.form = this.data.getFormDetails();
    this.active.paramMap.subscribe((link) => {
      return (this.jobDetailsId = +link.get('id'));
    });

    let arr: FormArray;
    if (
      this.form.get('qualificationInfo.expForm')['controls'][0] !== undefined
    ) {
      arr = <FormArray>(
        this.form
          .get('qualificationInfo.expForm')
          ['controls'][0].get('expertiseTech')
      );
      let i = 0;
      arr.controls.forEach((item: FormControl) => {
        if (item.value === this.Tech[i].name) {
          this.checkExpert[i] = true;
        }
        i++;
      });
    }

    let ar: FormArray = <FormArray>(
      this.form.get('qualificationInfo.familiarTech')
    );
    let i = 0;
    ar.controls.forEach((item: FormControl) => {
      if (item.value === this.Tech[i].name) {
        this.checkFamiliar[i] = true;
      }
      i++;
    });

    if (
      this.form.get('qualificationInfo.applicantType').value === 'Experienced'
    ) {
      this.diplayExp = false;
    }
    if (
      this.form.get('qualificationInfo.expForm')['controls'][0] !== undefined
    ) {
      if (
        this.form
          .get('qualificationInfo.expForm')
          ['controls'][0].get('isOnNoticePeriod').value === 'yes'
      ) {
        this.displayNotice = false;
      }
    }

    this.data.show([
      { icon: true, clr: true },
      { icon: false, clr: true },
      { icon: false, clr: false },
    ]);
  }

  onCheckboxChangeExpertise(e) {
    if (e.target.checked) {
      (<FormArray>(
        this.form
          .get('qualificationInfo.expForm')
          ['controls'][0].get('expertiseTech')
      )).push(new FormControl(e.target.value));
    } else {
      let i: number = 0;
      (<FormArray>(
        this.form
          .get('qualificationInfo.expForm')
          ['controls'][0].get('expertiseTech')
      )).controls.forEach((item: FormControl) => {
        if (item.value == e.target.value) {
          (<FormArray>(
            this.form
              .get('qualificationInfo.expForm')
              ['controls'][0].get('expertiseTech')
          )).removeAt(i);
          return;
        }
        i++;
      });
    }
  }
  onCheckboxChangeFamiliar(e) {
    if (e.target.checked) {
      (<FormArray>this.form.get('qualificationInfo.familiarTech')).push(
        new FormControl(e.target.value)
      );
    } else {
      let i: number = 0;
      (<FormArray>(
        this.form.get('qualificationInfo.familiarTech')
      )).controls.forEach((item: FormControl) => {
        if (item.value == e.target.value) {
          (<FormArray>this.form.get('qualificationInfo.familiarTech')).removeAt(
            i
          );
          return;
        }
        i++;
      });
    }
  }
  onClickApplicantTypeExp() {
    this.diplayExp = true;
    (<FormArray>this.form.get('qualificationInfo.expForm')).removeAt(0);
  }
  onClickApplicantTypeFre() {
    if (this.diplayExp) {
      const formGrp = this.fs.group({
        yearOfPassing: ['', Validators.required],
        currentCTC: ['', Validators.required],
        expectedCTC: ['', Validators.required],
        expertiseTech: this.fs.array([], Validators.required),
        otherExpertiseTech: [''],
        isOnNoticePeriod: ['', Validators.required],
        noticeInfo: this.fs.array([]),
      });
      (<FormArray>this.form.get('qualificationInfo.expForm')).push(formGrp);
      this.diplayExp = false;
    }
  }

  onClickNoticeYes() {
    if (this.displayNotice) {
      const formGrp = this.fs.group({
        noticePeriodEnd: ['', Validators.required],
        noticePeriodDuration: ['', Validators.required],
      });
      (<FormArray>(
        this.form
          .get('qualificationInfo.expForm')
          ['controls'][0].get('noticeInfo')
      )).push(formGrp);
      this.displayNotice = false;
    }
  }
  onClickNoticeNo() {
    this.displayNotice = true;
    (<FormArray>(
      this.form
        .get('qualificationInfo.expForm')
        ['controls'][0].get('noticeInfo')
    )).removeAt(0);
  }

  onClickTestYes() {
    if (this.displayTest) {
      const formGrp = this.fs.group({
        previousRoleApplyFor: ['', Validators.required],
      });
      (<FormArray>this.form.get('qualificationInfo.zeusTest')).push(formGrp);
      this.displayTest = false;
    }
  }
  onClickTestNo() {
    this.displayTest = true;
    (<FormArray>this.form.get('qualificationInfo.zeusTest')).removeAt(0);
  }

  onSubmitNext() {
    this.route.navigateByUrl('register/review/' + this.jobDetailsId);
  }
  onSubmitPrevious() {
    this.route.navigateByUrl(
      'register/personalinformation/' + this.jobDetailsId
    );
  }

  ngOnDestroy(): void {
    // this.data.show([
    //   { icon: false, clr: true },
    //   { icon: false, clr: false },
    //   { icon: false, clr: false },
    // ]);
  }
}
