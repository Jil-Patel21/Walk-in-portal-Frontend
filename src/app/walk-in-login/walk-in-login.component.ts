import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  Query,
  ViewChild,
  inject,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DatapassingService } from '../Services/datapassing.service';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { JobsService } from '../Services/jobs.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-walk-in-login',
  templateUrl: './walk-in-login.component.html',
  styleUrls: ['./walk-in-login.component.scss'],
})
export class WalkInLoginComponent implements OnInit, OnDestroy {
  jobService: JobsService = inject(JobsService);
  route: Router = inject(Router);
  active: ActivatedRoute = inject(ActivatedRoute);
  data = inject(DatapassingService);
  fs: FormBuilder = inject(FormBuilder);
  toast = inject(ToastrService);


  jobDetailsId: number;
  form: FormGroup;
  isExp: boolean=true;

 
  @ViewChild('image') ig: ElementRef;
  showPassword() {
    if (this.ig.nativeElement.type === 'password') {
      this.ig.nativeElement.type = 'text';
    } else {
      this.ig.nativeElement.type = 'password';
    }
  }
  ngOnInit(): void {
    this.form = this.fs.group({
      email: ['jilpatel@gmail.com', [Validators.required, Validators.email]],
      password: ['12345678', [Validators.required, Validators.minLength(8)]],
      rememberMe: this.fs.array([new FormControl(0)]),
    });

    this.active.paramMap.subscribe((link) => {
      return (this.jobDetailsId = +link.get('id'));
    });
    this.data.LoginHeader(false);
  }
  onSubmitAcc() {
    this.route.navigateByUrl(
      '/register/personalinformation/' + this.jobDetailsId
    );
  }
  rememberMe(e) {
    const formArray:FormArray = <FormArray>this.form.get("rememberMe");
    if (e.target.checked) {
      formArray.removeAt(0);
      formArray.push(new FormControl(1));
    }
    else {
      formArray.removeAt(0);
      formArray.push(new FormControl(0));
    }
  }

  onSubmitLogin() {
    this.jobService.loginUser(this.form.value).subscribe(
      {
        next: (data) => {
          this.toast.success('You are Logged successfully');
          localStorage.setItem("loginData", JSON.stringify(data));
          this.route.navigate(['joblist','jobdetails',this.jobDetailsId]);
        },
        error: (e) => console.error(e),
      }
    );
  }
  ngOnDestroy(): void {
    this.data.LoginHeader(true);
  }
}
