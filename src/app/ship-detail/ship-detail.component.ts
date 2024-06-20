import { Component, OnInit, Type } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from '../httpService/http.service';
import Ship from '../model/ships/Ship';
import ContainerCargo from '../model/ships/ContainerCargo';
import OilTanker from '../model/ships/OilTanker';
import Yacht from '../model/ships/Yacht';
import Cruise from '../model/ships/Cruise';
import { environment } from '../../environments/environment';
import { map } from 'rxjs';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-ship-detail',
  standalone: true,
  imports: [NgIf],
  templateUrl: './ship-detail.component.html',
  styleUrl: './ship-detail.component.css'
})
export class ShipDetailComponent implements OnInit {
  shipIdRoute!: string;
  shipType: string = "";

  ship?: Ship;
  containerCargo?: ContainerCargo;
  yacht?: Yacht;
  cruise?: Cruise;
  oilTanker?: OilTanker;


  url: string = `${environment.API_URL}/ships`
  constructor(private route: ActivatedRoute, private router: Router, private httpService: HttpService) { }
  
  ngOnInit() {
    this.setShipIdFromRoute()
    this.setShipType(this.shipIdRoute)
    if(!this.shipType) this.router.navigate(['/'])

    
    switch (this.shipType){
      case 'ship':
        this.httpService.getList<Ship>(`${this.url}/${this.shipIdRoute}`).forEach((item) => { this.ship = item.content[0] as Ship; })
        break;
      case 'containercargo':
        this.httpService.getList<ContainerCargo>(`${this.url}/${this.shipIdRoute}`).forEach((item) => { this.containerCargo = item.content[0] as ContainerCargo; })
        break;
      case 'oiltanker':
        this.httpService.getList<OilTanker>(`${this.url}/${this.shipIdRoute}`).forEach((item) => this.oilTanker = item.content[0] as OilTanker)
        break;
      case 'cruise':
        this.httpService.getList<Cruise>(`${this.url}/${this.shipIdRoute}`).forEach((item) => this.cruise = item.content[0] as Cruise)
        break;
      case 'yacht':
        this.httpService.getList<Yacht>(`${this.url}/${this.shipIdRoute}`).forEach((item) => this.yacht = item.content[0] as Yacht)
        break;
      default:
        alert('Unexpected ship type');
        break;
    }
  }

  setShipIdFromRoute() {
    this.route.params.forEach((params) => this.shipIdRoute = params['shipid'])
  }

  setShipType(id: string):void {
    let splittedId = id.split('-')
    if(splittedId.length == 3) this.shipType = splittedId[1]
  }

  isContainerCargo(ship: Ship | ContainerCargo): ship is ContainerCargo {
    return ship instanceof ContainerCargo;
  }
}

