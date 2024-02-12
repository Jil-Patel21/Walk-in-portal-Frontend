import { Component, OnInit, inject } from '@angular/core';
import { DatapassingService } from '../Services/datapassing.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  isDisaable: { icon: boolean; clr: boolean }[] = [
    { icon: false, clr: true },
    { icon: false, clr: false },
    { icon: false, clr: false },
  ];
  data = inject(DatapassingService);
  fs: FormBuilder = inject(FormBuilder);
  route: Router = inject(Router);
  active: ActivatedRoute = inject(ActivatedRoute);

  form: FormGroup;
  isBtnDisable = true;
  jobDetailsId: number;

  ngOnInit(): void {
    this.data.showIcon.subscribe((data: any) => {
      this.isDisaable = data;
    });
    this.data.isBtnDisable.subscribe((data) => {
      this.isBtnDisable = data;
    });
    this.form = this.data.getFormDetails();
    this.active.paramMap.subscribe((link) => {
      return this.jobDetailsId = +link.get('id');
    })
    
    this.form = this.fs.group({
      perosnalInfo: this.fs.group({
        firstName: ['Jil',[ Validators.required,Validators.minLength(2)]],
        lastName: ['Patel', [Validators.required,Validators.minLength(2)]],
        email: ['jilpatel@gmail.com', [Validators.required,Validators.email]],
        phoneNumDomain: ['91', [ Validators.required,Validators.minLength(2)]],
        phoneNum: ['9999999999',[ Validators.required,Validators.minLength(10)]],
        resumeUrl: [''],
        portfolioUrl: [''],
        registerViaReferral: [''],
        sendUpdate: this.fs.array([]),
        imageUrl: [''],
        preferRoles: this.fs.array([]),
      }),
      qualificationInfo: this.fs.group({
        aggegatePercentage: ['99', Validators.required],
        yearOfPassing: ['2020', Validators.required],
        qualification: ['B.Tech', Validators.required],
        stream: ['science', Validators.required],
        college: ['L.D', Validators.required],
        otherCollege: [''],
        collegeLocation: ['Ahm', Validators.required],
        expForm:this.fs.array([]),
        familiarTech: this.fs.array([]),
        otherFamiliarTech:[''],
        noticePeriodDuration: [' ', Validators.required],
        // noticeInfo:this.fs.array([]),
        applicantType: ['', Validators.required],
        // isOnNoticePeriod: ['', Validators.required],
        appliedForAnyTestInZeus:['',Validators.required],
        zeusTest:this.fs.array([])
      }),
    })
    this.data.setFormDetails(this.form);
  }
  onCancelBtn() {
    this.route.navigateByUrl('/login/' + this.jobDetailsId);
  }
  onCreateBtn() {
    this.route.navigateByUrl('/joblist/jobdetails/' + this.jobDetailsId);
  }
}
