import { BrowserModule } from '@angular/platform-browser';
import { MDBBootstrapModulesPro } from 'ng-uikit-pro-standard';
import { MDBSpinningPreloader } from 'ng-uikit-pro-standard';
import { NgModule, LOCALE_ID } from '@angular/core';


import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {
  MatFormFieldModule, MatInputModule, MatSelectModule, MatAutocompleteModule, MatButtonModule,
  MatTableModule,
  MatPaginatorModule,
  MatCheckboxModule,
  MatRadioModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatToolbarModule,
  MatSidenavModule,
  MatIconModule, MatListModule,
  MatCardModule,
  MatChipsModule,
  MatBottomSheetModule
} from '@angular/material';
import { LayoutModule } from '@angular/cdk/layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  DateAdapter, MAT_DATE_FORMATS, MatDatepickerIntl, MatDatepickerModule,
  MatMomentDateModule, MomentDateAdapter
} from '@coachcare/datepicker';
import { MAT_MOMENT_DATE_FORMATS } from './services/moment-date-formats';

import { DatepickerEsp } from './services/datepicker-esp';

import { APP_ROUTING } from './app.routes';

// Componentes
import 'hammerjs'; // Revisar

import * as moment from 'moment';
import './services/moment.es';
moment.locale('es');

import { AppComponent } from './app.component';
import { MainNavComponent } from './components/shared/main-nav/main-nav.component';
import { MenuTopRightComponent } from './components/shared/menu-top-right/menu-top-right.component';
import { IndexComponent } from './components/pages/index/index.component';
import { DateTimeControlsComponent } from './components/pages/date-time-controls/date-time-controls.component';
import { TablasComponent } from './components/pages/tablas/tablas.component';
import { LoginComponent } from './components/login/login.component';
import { PagesComponent } from './components/pages/pages.component';
import { VentanasComponent } from './components/pages/ventanas/ventanas.component';
import { BottonSheetComponent } from './components/pages/ventanas/botton-sheet.component';

@NgModule({
  declarations: [
    AppComponent,
    MainNavComponent,
    MenuTopRightComponent,
    IndexComponent,
    DateTimeControlsComponent,
    TablasComponent,
    LoginComponent,
    PagesComponent,
    VentanasComponent,
    BottonSheetComponent,
  ],
  imports: [
    BrowserModule,
    APP_ROUTING,
    BrowserAnimationsModule,
    MDBBootstrapModulesPro.forRoot(),
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatButtonModule,
    LayoutModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    ReactiveFormsModule,
    FormsModule,
    MatCardModule,
    MatChipsModule,
    MatTableModule,
    MatPaginatorModule,
    MatCheckboxModule,
    MatRadioModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatDatepickerModule,
    MatMomentDateModule,
    MatBottomSheetModule
  ],
  providers: [
    MDBSpinningPreloader,
    // { provide: MAT_DATE_LOCALE, useValue: 'es' },
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [LOCALE_ID] },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
    { provide: LOCALE_ID, useValue: 'es' },
    { provide: MatDatepickerIntl, useClass: DatepickerEsp }
  ],
  entryComponents: [BottonSheetComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
