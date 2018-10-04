import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatFormFieldModule, MatInputModule, MatSelectModule, MatAutocompleteModule, MatButtonModule,
  MatTableModule,
  MatPaginatorModule,
  MatCheckboxModule,
  MatRadioModule,
  MatSliderModule,
  MatSlideToggleModule
} from '@angular/material';
import { MatToolbarModule, MatSidenavModule, MatIconModule, MatListModule, MatCardModule, MatChipsModule } from '@angular/material';
import { LayoutModule } from '@angular/cdk/layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerIntl, MatDatepickerModule, MatMomentDateModule } from '@coachcare/datepicker';
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
import { IndexComponent } from './components/index/index.component';
import { DateTimeControlsComponent } from './components/date-time-controls/date-time-controls.component';
import { TablasComponent } from './components/tablas/tablas.component';

@NgModule({
  declarations: [
    AppComponent,
    MainNavComponent,
    MenuTopRightComponent,
    IndexComponent,
    DateTimeControlsComponent,
    TablasComponent,
  ],
  imports: [
    BrowserModule,
    APP_ROUTING,
    BrowserAnimationsModule,
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
    MatMomentDateModule

  ],
  providers: [
    // MDBSpinningPreloader,
    { provide: MatDatepickerIntl, useClass: DatepickerEsp }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
