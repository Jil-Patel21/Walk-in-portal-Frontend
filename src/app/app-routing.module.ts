import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JoblistComponent } from './joblist/joblist.component';
import { JobdetailsComponent } from './joblist/jobdetails/jobdetails.component';
import { JobappliedComponent } from './jobapplied/jobapplied.component';
import { RegisterComponent } from './register/register.component';
import { PersonalInformationComponent } from './register/personal-information/personal-information.component';
import { QualificationComponent } from './register/qualification/qualification.component';
import { ReviewComponent } from './register/review/review.component';
import { WalkInLoginComponent } from './walk-in-login/walk-in-login.component';
import { jobApply, jobDetails } from './guards/auth.guards';

const routes: Routes = [
  {
    path: 'register',
    component:RegisterComponent,
    children: [
      {
        path: 'personalinformation/:id',
        component: PersonalInformationComponent,
        pathMatch: 'full',
      },
      {
        path: 'qualification/:id',
        component: QualificationComponent,
        pathMatch: 'full',
      },
      {
        path: 'review/:id',
        component: ReviewComponent,
        pathMatch: 'full',
      },
    ]
  },
  {
    path: 'login/:id', component: WalkInLoginComponent, pathMatch:'full'
  },
  {
    path: 'joblist', component: JoblistComponent, pathMatch:'full'
  },
  {
    path:'joblist/jobdetails/jobapplied',component:JobappliedComponent,pathMatch:'full',canActivate:[jobApply]
  },
  {
    path:'joblist/jobdetails/:id',component:JobdetailsComponent,pathMatch:'full',canActivate:[jobDetails]
  },
  {
    path:'',component:JoblistComponent,pathMatch:'full'
  },
  {
    path:"**",component:JobappliedComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
