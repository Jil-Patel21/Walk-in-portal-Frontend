import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WalkInLoginComponent } from './walk-in-login.component';

describe('WalkInLoginComponent', () => {
  let component: WalkInLoginComponent;
  let fixture: ComponentFixture<WalkInLoginComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WalkInLoginComponent]
    });
    fixture = TestBed.createComponent(WalkInLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
