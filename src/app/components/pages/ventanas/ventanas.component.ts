import { Component } from '@angular/core';
import { MatBottomSheet } from '@angular/material';
import { BottonSheetComponent } from './botton-sheet.component';

@Component({
  selector: 'app-ventanas',
  templateUrl: './ventanas.component.html',
  styleUrls: ['./ventanas.component.scss']
})
export class VentanasComponent {

  constructor(private bottonSheet: MatBottomSheet) {

  }

  openBottomSheet() {
    const sheet = this.bottonSheet.open(BottonSheetComponent, {
      backdropClass: 'my-backdrop',
      hasBackdrop: true,
      data: {
        myString: 'MY STRING'
      }
    });

    sheet.backdropClick().subscribe(() => {
      console.log('bd clicked');
    });

    sheet.afterDismissed().subscribe(() => {

    });
  }
}
