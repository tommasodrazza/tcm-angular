import { Routes } from '@angular/router';
import { DockDetailComponent } from './dock-detail/dock-detail.component';
import { ShipDetailComponent } from './ship-detail/ship-detail.component';
import { TcmHomeComponent } from './tcm-home/tcm-home.component';

export const routes: Routes = [
    { path: '', title: 'Tcm Home', component: TcmHomeComponent },
    { path: 'dock/:dockid', component: DockDetailComponent },
    { path: 'ship/:shipid', component: ShipDetailComponent },
];
