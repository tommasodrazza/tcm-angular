import { Component, ViewChild } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { DocksListComponent } from '../docks-list/docks-list.component';
import { ShipsListComponent } from '../ships-list/ships-list.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tcm-home',
  standalone: true,
  imports: [MatTabsModule, DocksListComponent, ShipsListComponent],
  templateUrl: './tcm-home.component.html',
  styleUrl: './tcm-home.component.css'
})
export class TcmHomeComponent {
  @ViewChild(ShipsListComponent) shipsList!: ShipsListComponent;
  constructor(private router: Router) {
  }

  toEmptyParams(){
    this.shipsList.searchString = "";
    this.router.navigate([], {
      queryParams: { 'ammount': null, 'offset': null, 'searchString': null },
      queryParamsHandling: 'merge'
    })
  }

}