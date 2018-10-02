import { Component, OnInit } from '@angular/core';
import { IMyOptions } from 'ng-uikit-pro-standard';

@Component({
  selector: 'app-date-time-controls',
  templateUrl: './date-time-controls.component.html',
  styleUrls: ['./date-time-controls.component.scss']
})
export class DateTimeControlsComponent implements OnInit {
  public myDatePickerOptions: IMyOptions = {

  };

  constructor() { }

  ngOnInit() {
  }

}
