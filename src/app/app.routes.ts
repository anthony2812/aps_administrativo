import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './components/index/index.component';
import { DateTimeControlsComponent } from './components/date-time-controls/date-time-controls.component';
import { TablasComponent } from './components/tablas/tablas.component';
import { LoginComponent } from './components/login/login.component';



const ROUTES: Routes = [
    { path: 'Formas', component: IndexComponent },
    { path: 'Fecha-Horas', component: DateTimeControlsComponent },
    { path: 'Tablas', component: TablasComponent },
    { path: 'Login', component: LoginComponent },
    { path: '**', pathMatch: 'full', redirectTo: 'Formas' }];

export const APP_ROUTING = RouterModule.forRoot(ROUTES);
