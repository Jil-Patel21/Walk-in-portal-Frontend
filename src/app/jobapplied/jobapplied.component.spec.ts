import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobappliedComponent } from './jobapplied.component';

describe('JobappliedComponent', () => {
  let component: JobappliedComponent;
  let fixture: ComponentFixture<JobappliedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JobappliedComponent]
    });
    fixture = TestBed.createComponent(JobappliedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
