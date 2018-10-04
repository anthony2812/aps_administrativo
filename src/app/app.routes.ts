import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './components/index/index.component';
import { DateTimeControlsComponent } from './components/date-time-controls/date-time-controls.component';
import { TablasComponent } from './components/tablas/tablas.component';



const ROUTES: Routes = [
    { path: 'Forms', component: IndexComponent },
    { path: 'Fecha-Horas', component: DateTimeControlsComponent },
    { path: 'Tablas', component: TablasComponent },
    { path: '**', pathMatch: 'full', redirectTo: 'Forms' }];

export const APP_ROUTING = RouterModule.forRoot(ROUTES);
