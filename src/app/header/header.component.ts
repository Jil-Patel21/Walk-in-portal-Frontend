import { Component, OnInit, inject } from '@angular/core';
import { DatapassingService } from '../Services/datapassing.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  data = inject(DatapassingService);
  isLogin: boolean = true;
  
  ngOnInit(): void {
    this.data.isLoginComp.subscribe((data) => {
      this.isLogin = data;
     })
  }
}
