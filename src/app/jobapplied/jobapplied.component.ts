import { Component, OnInit, inject } from '@angular/core';
import { DatapassingService } from '../Services/datapassing.service';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-jobapplied',
  templateUrl: './jobapplied.component.html',
  styleUrls: ['./jobapplied.component.scss'],
})
export class JobappliedComponent implements OnInit {
  data = inject(DatapassingService);
  form: FormGroup;

  ngOnInit(): void {
    this.form = this.data.getAppliedDetails();
  }
}
