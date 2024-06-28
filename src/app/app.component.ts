import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TcmHomeComponent } from './tcm-home/tcm-home.component';
import { RouterLink } from '@angular/router';
import { Location } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TcmHomeComponent, RouterLink, MatIconModule, BreadcrumbComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'tcm-angular';

  constructor(
    private readonly location: Location
  ) {
  }

  goBack() {
    this.location.back();
  }
}
