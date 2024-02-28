import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { JoblistComponent } from './joblist/joblist.component';
import { JobdetailsComponent } from './joblist/jobdetails/jobdetails.component';
import { JobappliedComponent } from './jobapplied/jobapplied.component';
import { WalkInLoginComponent } from './walk-in-login/walk-in-login.component';
import { HeaderComponent } from './header/header.component';
import { RegisterComponent } from './register/register.component';
import { PersonalInformationComponent } from './register/personal-information/personal-information.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ReviewComponent } from './register/review/review.component';
import { QualificationComponent } from './register/qualification/qualification.component';
import { JwtModule } from '@auth0/angular-jwt';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    AppComponent,
    JoblistComponent,
    JobdetailsComponent,
    JobappliedComponent,
    WalkInLoginComponent,
    HeaderComponent,
    RegisterComponent,
    PersonalInformationComponent,
    ReviewComponent,
    QualificationComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastrModule.forRoot({
      positionClass: 'toast-top-center',
      preventDuplicates: true,
    }),
    BrowserAnimationsModule,
    JwtModule.forRoot({ // for JwtHelperService
      config: {
        tokenGetter: () => {
          return '';
        }
      }
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }


