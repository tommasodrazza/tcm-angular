import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TcmHomeComponent } from './tcm-home/tcm-home.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TcmHomeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'tcm-angular';
}
