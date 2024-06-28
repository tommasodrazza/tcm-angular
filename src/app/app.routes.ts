import { RouterModule, Routes } from '@angular/router';
import { DockDetailComponent } from './dock-detail/dock-detail.component';
import { ShipDetailComponent } from './ship-detail/ship-detail.component';
import { ShipsListComponent } from './ships-list/ships-list.component';
import { TcmHomeComponent } from './tcm-home/tcm-home.component';
import { NgModule } from '@angular/core';
import { ToolsListComponent } from './tools-list/tools-list.component';
import { ShipsAddComponent } from './ships-add/ships-add.component';
import { DocksListComponent } from './docks-list/docks-list.component';

const home = { label: "Home", url: "/home" }
const ships = { label: "Ships", url: "/ships" }
const docks = { label: "Docks", url: "/docks" }


export const routes: Routes = [
    { 
        path: '', 
        redirectTo: 'home',
        pathMatch: 'full'
    },
    { 
        title: 'Tcm Home', 
        path: 'home', 
        component: TcmHomeComponent,
        data: { breadcrumb: 'Home' }
    },
    {
        path: 'ships', 
        component: ShipsListComponent,
        data: { breadcrumb: 'Ships', parents: [home] }
    },
    {
        path: 'ships/:shipid', 
        component: ShipDetailComponent,
        data: { breadcrumb: 'Ship detail', parents: [home, ships] }
    },
    {
        path: 'ships/dock/:dockid', 
        component: ShipsListComponent,
        data: { breadcrumb: 'Docked ships',  parents: [home, docks] }
        
    },
    {
        path: 'docks', 
        component: DocksListComponent,
        data: { breadcrumb: 'Docks',  parents: [home] }
    },
    {
        path: 'docks/:dockid', 
        component: DockDetailComponent,
        data: { breadcrumb: 'Dock detail', parents: [home, docks] }
    },
    { 
        path: 'tools/:dockid', 
        component: ToolsListComponent,
        data: { breadcrumb: 'Dock tools',  parents: [home, docks] }
    },
    { 
        path: 'add-ship', 
        component: ShipsAddComponent,
        data: { breadcrumb: 'Add ship', parents: [home] }
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModules{ }
