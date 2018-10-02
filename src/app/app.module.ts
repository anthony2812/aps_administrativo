import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MDBBootstrapModulesPro } from 'ng-uikit-pro-standard';
import { MDBSpinningPreloader } from 'ng-uikit-pro-standard';


import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule, MatInputModule, MatSelectModule, MatAutocompleteModule, MatButtonModule } from '@angular/material';
import { MatToolbarModule, MatSidenavModule, MatIconModule, MatListModule, MatCardModule, MatChipsModule } from '@angular/material';
import { LayoutModule } from '@angular/cdk/layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DatepickerModule, WavesModule } from 'ng-uikit-pro-standard';

import { APP_ROUTING } from './app.routes';

// Componentes
import 'hammerjs'; // Revisar

import { AppComponent } from './app.component';
import { MainNavComponent } from './components/shared/main-nav/main-nav.component';
import { MenuTopRightComponent } from './components/shared/menu-top-right/menu-top-right.component';
import { IndexComponent } from './components/index/index.component';
import { DateTimeControlsComponent } from './components/date-time-controls/date-time-controls.component';

@NgModule({
  declarations: [
    AppComponent,
    MainNavComponent,
    MenuTopRightComponent,
    IndexComponent,
    DateTimeControlsComponent,
  ],
  imports: [
    BrowserModule,
    APP_ROUTING,
    MDBBootstrapModulesPro.forRoot(),
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
    DatepickerModule,
    WavesModule

  ],
  providers: [
    MDBSpinningPreloader
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
