import { Component, OnInit } from '@angular/core';
import { IMyOptions } from 'ng-uikit-pro-standard';

@Component({
  selector: 'app-date-time-controls',
  templateUrl: './date-time-controls.component.html',
  styleUrls: ['./date-time-controls.component.scss']
})
export class DateTimeControlsComponent implements OnInit {
  public myDatePickerOptions: IMyOptions = {
    // Strings and translations
    dayLabels: { su: 'Dom', mo: 'Lun', tu: 'Mar', we: 'Mie', th: 'Ju', fr: 'Vie', sa: 'Sab' },
    dayLabelsFull: { su: 'Domingo', mo: 'Lunes', tu: 'Martes', we: 'Miercoles', th: 'Jueves', fr: 'Viernes', sa: 'Sabado' },
    monthLabels: {
      1: 'Ene', 2: 'Feb', 3: 'Mar', 4: 'Abr', 5: 'May', 6: 'Jun', 7: 'Jul', 8: 'Ago', 9: 'Sep', 10: 'Oct', 11:
        'Nov', 12: 'Dic'
    },
    monthLabelsFull: {
      1: 'Enero', 2: 'Febrero', 3: 'Marzo', 4: 'Abril', 5: 'Mayo', 6: 'Junio', 7: 'Julio', 8: 'Agosto', 9:
        'Septiembre', 10: 'Octubre', 11: 'Noviembre', 12: 'Diciembre'
    },

    todayBtnTxt: 'Hoy',
    clearBtnTxt: 'Limpiar',
    closeBtnTxt: 'Cerrar',

    // Format
    dateFormat: 'dd/mmm/yyyy',

    // Year limits
    minYear: 2010,
    maxYear: 2030,


  };

  constructor() { }

  ngOnInit() {
  }

}
