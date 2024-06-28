import { Component } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { SnackbarService } from '../snackbar/snackbar.service';
import { HttpService } from '../httpService/http.service';
import { environment } from '../../environments/environment';
import Ship from '../model/ships/Ship';
import { catchError, map } from 'rxjs';
import OilTanker from '../model/ships/OilTanker';
import ContainerCargo from '../model/ships/ContainerCargo';
import Yacht from '../model/ships/Yacht';
import Cruise from '../model/ships/Cruise';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-ships-add',
  standalone: true,
  imports: [NgFor, NgIf, FormsModule],
  templateUrl: './ships-add.component.html',
  styleUrl: './ships-add.component.css'
})
export class ShipsAddComponent {
  constructor(private snackbarService: SnackbarService, private httpService: HttpService) {}
  
  shipTypes: string[] = ['ship', 'oiltanker', 'containercargo', 'yacht', 'cruise']
  activeType: string = "ship"
  url: string = `${environment.API_URL}/make-ship`
  isLoading: boolean = false;
  requestBody = {
    signature: "",
    draft: 0,
    length: 0,
    dwt: 0,
    onBoardPeople: 0,
    peopleCapacity: 0,
    engineType: 1,
    nRooms: 0,
  };
  ship: Ship = new Ship();

  onChange(value: string){
    this.activeType = value;
  }

  addShip(){
    switch (this.activeType){
      case 'ship':
        this.sendShip<Ship>(this.requestBody);
        break;
      case 'oiltanker':
        this.sendShip<OilTanker>(this.requestBody);
        break;
      case 'containercargo':
        this.sendShip<ContainerCargo>(this.requestBody);
        break;
      case 'yacht':
        this.sendShip<Yacht>(this.requestBody);
        break;
      case 'cruise':
        this.sendShip<Cruise>(this.requestBody);
        break;
    }
  }

  sendShip<T>(body: object){
    //this.snackbarService.openSnackBar('message', 'success');
    this.isLoading = true;
    this.httpService.addShip<T>(`${this.url}/${this.activeType}`, body ).pipe(
      map(n => {
        if(!n.result)
          throw n
        else
          return n
      }),
      catchError(err => {
        throw new Error(err.error.result == false ? err.error.message : 'Generic error')
      })
    ).subscribe({
      next: x => { 
        this.isLoading = false;
        this.snackbarService.openSnackBar('Ship correctly created', 'success');
      },
      error: err => {
        this.isLoading = false;
        this.snackbarService.openSnackBar(err, 'error')
      } 
    })
  }
}
