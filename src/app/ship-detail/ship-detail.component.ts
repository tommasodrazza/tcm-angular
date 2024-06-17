import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-ship-detail',
  standalone: true,
  imports: [],
  templateUrl: './ship-detail.component.html',
  styleUrl: './ship-detail.component.css'
})
export class ShipDetailComponent implements OnInit {
  shipId: string = "";
  constructor(private route: ActivatedRoute) { }
  
  ngOnInit() {
    this.route.params.subscribe((params) => this.shipId = params['shipid']);
  }
}
