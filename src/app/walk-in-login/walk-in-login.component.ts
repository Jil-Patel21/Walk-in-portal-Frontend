import { Component, ElementRef, OnDestroy, OnInit, ViewChild, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DatapassingService } from '../Services/datapassing.service';

@Component({
  selector: 'app-walk-in-login',
  templateUrl: './walk-in-login.component.html',
  styleUrls: ['./walk-in-login.component.scss']
})
export class WalkInLoginComponent implements OnInit,OnDestroy {
  route: Router = inject(Router);
  active: ActivatedRoute = inject(ActivatedRoute);
  data = inject(DatapassingService);

  jobDetailsId: number;

  @ViewChild('image') ig: ElementRef;
  showPassword() {
    if (this.ig.nativeElement.type === 'password') {
      this.ig.nativeElement.type  = 'text';
    }
    else {
      this.ig.nativeElement.type  = 'password'
    }
  }
  ngOnInit(): void {
    this.active.paramMap.subscribe((link) => {
       return this.jobDetailsId = +link.get('id');
    })
    this.data.LoginHeader(false);
    
  }
  onSubmitAcc() {
    this.route.navigateByUrl('/register/personalinformation/'+this.jobDetailsId);
  }
  onSubmitLogin() {
    this.route.navigateByUrl('joblist/jobdetails/'+this.jobDetailsId);
  }
  ngOnDestroy(): void {
    this.data.LoginHeader(true);
  }
}
