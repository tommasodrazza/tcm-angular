declare var require: any
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from '../httpService/http.service';
import { AllShips } from './types';
import { environment } from '../../environments/environment';
import { NgIf } from '@angular/common';

import Ship from '../model/ships/Ship';
import ContainerCargo from '../model/ships/ContainerCargo';
import OilTanker from '../model/ships/OilTanker';
import Yacht from '../model/ships/Yacht';
import Cruise from '../model/ships/Cruise';

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
  image: any;
  
  ship: AllShips = new Ship();

  url: string = `${environment.API_URL}/ships`
  constructor(private route: ActivatedRoute, private router: Router, private httpService: HttpService) { }
  
  ngOnInit() {
    this.setShipIdFromRoute()
    this.setShipType(this.shipIdRoute)
    if(!this.shipType) this.router.navigate(['/'])

    
    switch (this.shipType){
      case 'ship':
        this.image = 'assets/ship.svg'
        this.httpService.getList<Ship>(`${this.url}/${this.shipIdRoute}`)
          .forEach((item) => { this.ship = Object.assign(new Ship(), item.content[0]); })
          .finally(() => { this.verifyShipResult(this.ship.id) })
        break;
      case 'containercargo':
        this.image = 'assets/containercargo.png'
        this.httpService.getList<ContainerCargo>(`${this.url}/${this.shipIdRoute}`)
          .forEach((item) => { this.ship = Object.assign(new ContainerCargo(), item.content[0]); })
          .finally(() => { this.verifyShipResult(this.ship.id) })
        break;
      case 'oiltanker':
        this.image = 'assets/oiltanker.png'
        this.httpService.getList<OilTanker>(`${this.url}/${this.shipIdRoute}`)
          .forEach((item) => { this.ship = Object.assign(new OilTanker(), item.content[0]); })
          .finally(() => { this.verifyShipResult(this.ship.id) })
        break;
      case 'cruise':
        this.image = 'assets/cruise.png'
        this.httpService.getList<Cruise>(`${this.url}/${this.shipIdRoute}`)
          .forEach((item) => { this.ship = Object.assign(new Cruise(), item.content[0]); })
          .finally(() => { this.verifyShipResult(this.ship.id) })
        break;
      case 'yacht':
        this.image = 'assets/yacht.png'
        this.httpService.getList<Yacht>(`${this.url}/${this.shipIdRoute}`)
          .forEach((item) => { this.ship = Object.assign(new Yacht(), item.content[0]); })
          .finally(() => { this.verifyShipResult(this.ship.id) })
        break;
      default:
        this.router.navigate(['/'])
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

  isContainerCargo(ship: AllShips): ship is ContainerCargo {
    return ship instanceof ContainerCargo;
  }
  isYacht(ship: AllShips): ship is Yacht {
    return ship instanceof Yacht;
  }
  isCruise(ship: AllShips): ship is Cruise {
    return ship instanceof Cruise;
  }
  isOilTanker(ship: AllShips): ship is OilTanker {
    return ship instanceof OilTanker;
  }

  verifyShipResult(id?: string){
    if(!id) this.router.navigate(['/'])
  }
}

