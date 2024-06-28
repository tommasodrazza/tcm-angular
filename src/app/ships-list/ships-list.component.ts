import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { NgIf } from '@angular/common';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive } from '@angular/router';
import Ship from '../model/ships/Ship';
import { ProgressBarComponent } from '../progress-bar/progress-bar.component';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator } from '@angular/material/paginator';
import { FormsModule } from '@angular/forms';
import { catchError, Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { HttpService } from '../httpService/http.service';
import { environment } from '../../environments/environment';


@Component({
  selector: 'app-ships-list',
  standalone: true,
  imports: [MatTableModule, MatIconModule, FormsModule, MatPaginator, NgIf, ProgressBarComponent, RouterLink, RouterLinkActive],
  templateUrl: './ships-list.component.html',
  styleUrl: './ships-list.component.css'
})

export class ShipsListComponent implements OnInit, AfterViewInit{
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  title: string = "";
  url!: string;

  displayedColumns: string[] = ['id', 'signature', 'length', 'draft', 'info'];
  dataSource$ = new Observable<Ship[]>();
  ships!: Ship[];
  pageTotal: number = 0;

  searchString: string = "";
  searchStringUpdate = new Subject<string>();
  isLoading: boolean = false;

  setUrl(): void {
    if(this.router.url.split('?')[0] == '/ships'){
      this.url = `${environment.API_URL}/ships`
      this.title = 'SHIPS LIST'
    }
      

    if (this.router.url.includes('/ships/dock')){
      this.route.params.forEach((param) => {
        this.url = `${environment.API_URL}/docked-ships/${param['dockid']}`
        this.title = `DOCK: ${param['dockid']} ships`
      })
    }

  }

  constructor(private httpService: HttpService, private route: ActivatedRoute, private router: Router) {
    this.searchStringUpdate.pipe(debounceTime(500), distinctUntilChanged()).subscribe(value => {
      this.navigateRouter({ offset: this.paginator.pageIndex, searchString: value })
    });
  }

  ngOnInit(): void {
    this.setUrl()
    this.navigateRouter({})
    this.loadData()
  }

  ngAfterViewInit(): void {
    this.paginator.page.subscribe(() => {
      this.navigateRouter({ offset: this.paginator.pageIndex + 1, searchString: this.searchString })
    })
  }

  navigateRouter(querParams: object){
    this.router.navigate([this.router.url.split('?')[0]], {
        relativeTo: this.route,
        queryParams: querParams,
        queryParamsHandling: 'merge',
    });
  }


  loadData(): void {
    this.route.queryParams.subscribe((p) => {
      this.isLoading = true;
      const filters = { offset: p['offset'] || 0, searchString: p['searchString'] || '', amount: p['amount'] || 10};
      this.httpService.getList<Ship>(this.url, filters).subscribe (
        (data) => {
          this.pageTotal = data.listInfo.total;
          this.isLoading = false;
          this.ships = data.content;
          this.isLoading = false;
        }),
        catchError((): any => {
          this.pageTotal = 0;
          this.ships = [];  
        })
    })
  }
}