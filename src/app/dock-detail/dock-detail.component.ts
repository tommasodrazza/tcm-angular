import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { HttpService } from '../httpService/http.service';
import { environment } from '../../environments/environment';
import Dock from '../model/Dock';

@Component({
  selector: 'app-dock-detail',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './dock-detail.component.html',
  styleUrl: './dock-detail.component.css'
})
export class DockDetailComponent implements OnInit {
  dock: Dock = new Dock();
  dockIdRoute!: string;
  url: string = `${environment.API_URL}/docks`

  constructor(private httpService: HttpService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.setDockIdFromRoute()
    if(!this.dockIdRoute) this.router.navigate(['/'])
    
    this.httpService.getList<Dock>(`${this.url}/${this.dockIdRoute}`)
    .forEach((item) => { this.dock = Object.assign(new Dock(), item.content[0]); })
    .finally(() => this.verifyDockResult(this.dock.id))
  }

  setDockIdFromRoute() {
    this.route.params.forEach((params) => this.dockIdRoute = params['dockid'])
  }

  verifyDockResult(id?: string){
    if(!id) this.router.navigate(['/'])
  }

}
