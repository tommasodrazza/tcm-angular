import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import {ThemePalette} from '@angular/material/core';

@Component({
  selector: 'app-tcm-home',
  standalone: true,
  imports: [MatTabsModule, RouterLink, RouterOutlet],
  templateUrl: './tcm-home.component.html',
  styleUrl: './tcm-home.component.css'
})
export class TcmHomeComponent implements AfterViewInit {
  constructor(private router: Router) {
  }

  toEmptyParams(){
    this.router.navigate([], {
      queryParams: { 'ammount': null, 'offset': null, 'searchString': null },
      queryParamsHandling: 'merge'
    })
  }

  ngAfterViewInit(): void {
    this.toEmptyParams()
  }

  links = ['Ships', 'Docks'];
  activeLink = this.links[0];
  background: ThemePalette = undefined;

  toggleBackground() {
    this.background = this.background ? undefined : 'primary';
  }
}