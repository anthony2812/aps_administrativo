import { RouterModule, Routes } from '@angular/router';

import { PagesComponent } from './components/pages/pages.component';
import { IndexComponent } from './components/pages/index/index.component';
import { DateTimeControlsComponent } from './components/pages/date-time-controls/date-time-controls.component';
import { TablasComponent } from './components/pages/tablas/tablas.component';
import { VentanasComponent } from './components/pages/ventanas/ventanas.component';
import { LoginComponent } from './components/login/login.component';





const ROUTES: Routes = [
    {
        path: '',
        component: PagesComponent,
        children: [
            { path: 'Formas', component: IndexComponent },
            { path: 'Fecha-Horas', component: DateTimeControlsComponent },
            { path: 'Tablas', component: TablasComponent },
            { path: 'Ventanas', component: VentanasComponent },
        ]
    },
    { path: 'Login', component: LoginComponent },
    { path: '', redirectTo: '/Login', pathMatch: 'full' },
    { path: '**', component: LoginComponent }];

export const APP_ROUTING = RouterModule.forRoot(ROUTES);
