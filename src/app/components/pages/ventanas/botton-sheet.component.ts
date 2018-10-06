import { Component, OnInit } from '@angular/core';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material';

@Component({
  selector: 'app-botton-sheet',
  templateUrl: './botton-sheet.component.html',
  styles: []
})
export class BottonSheetComponent implements OnInit {

  constructor(
    // @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
    private bottomSheetRef: MatBottomSheetRef<BottonSheetComponent>) { }

  ngOnInit() {
  }
  myAction(str) {
    this.bottomSheetRef.dismiss(str);
  }
}
