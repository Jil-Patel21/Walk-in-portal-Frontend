import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { DatapassingService } from '../Services/datapassing.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { JobsService } from '../Services/jobs.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit,OnDestroy {
  isDisaable: { icon: boolean; clr: boolean }[] = [
    { icon: false, clr: true },
    { icon: false, clr: false },
    { icon: false, clr: false },
  ];
  jobService: JobsService = inject(JobsService);
  data = inject(DatapassingService);
  fs: FormBuilder = inject(FormBuilder);
  route: Router = inject(Router);
  active: ActivatedRoute = inject(ActivatedRoute);
  private http = inject(HttpClient);
  toast = inject(ToastrService);


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
      return (this.jobDetailsId = +link.get('id'));
    });


    this.form = this.fs.group({
      perosnalInfo: this.fs.group({
        firstName: ['Jil', [Validators.required, Validators.minLength(2)]],
        lastName: ['Patel', [Validators.required, Validators.minLength(2)]],
        email: ['jilpatel@gmail.com', [Validators.required, Validators.email]],
        password:['',[Validators.required,Validators.minLength(8)]],
        phoneNumDomain: ['91', [Validators.required, Validators.minLength(2)]],
        phoneNum: [
          '9999999999',
          [Validators.required, Validators.minLength(10)],
        ],
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
        qualification: [, Validators.required],
        stream: [, Validators.required],
        college: [, Validators.required],
        otherCollege: [''],
        collegeLocation: ['Ahm', Validators.required],
        expForm: this.fs.array([]),
        familiarTech: this.fs.array([]),
        otherFamiliarTech: [''],
        applicantType: ['', Validators.required],
        appliedForAnyTestInZeus: ['', Validators.required],
        zeusTest: this.fs.array([]),
      }),
    });
    this.data.setFormDetails(this.form);
  }
  onCancelBtn() {
    this.route.navigateByUrl('/login/' + this.jobDetailsId);
  }
  private registerQiUrl: string =
    'https://localhost:7225/api/Practice/register/qualification';
  onCreateBtn() {
    console.log(this.form.value);
    this.jobService.registerUser(this.form.value).subscribe({
      next: (res) => {
        const id = this.data.setUserId(res);
        const obj = { ...this.form.value.qualificationInfo, uid: id };
        this.http
        .post(this.registerQiUrl, obj)
        .subscribe({
          next: (res) => {
            this.toast.success('You are registered successfully');
            this.route.navigateByUrl('/login/'+this.jobDetailsId);
          },
          error: (err) => {
            console.log(err.error);
          },
        });
      },
      error: (err) => {
        console.log(err.error);
      },
    });
   
  }
  ngOnDestroy(): void {
    localStorage.removeItem("enumData");
  }
}
