import { Component, OnInit, AfterViewInit, ViewChild} from '@angular/core';
import { NgIf } from '@angular/common';
import { ActivatedRoute, Params, Router } from '@angular/router';

import Ship from '../model/ships/Ship';
import { ProgressBarComponent } from '../progress-bar/progress-bar.component';

import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator } from '@angular/material/paginator';
import { FormsModule } from '@angular/forms';
import { catchError, map, Observable, switchMap, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

import { HttpService } from '../httpService/http.service';

@Component({
  selector: 'app-docks-list',
  standalone: true,
  imports: [MatTableModule, MatIconModule, FormsModule, MatPaginator, NgIf, ProgressBarComponent],
  templateUrl: './docks-list.component.html',
  styleUrl: './docks-list.component.css'
})

export class DocksListComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  displayedColumns: string[] = ['id', 'length', 'toolsN', 'dockedShips', 'info'];
  dataSource$ = new Observable<Ship[]>();
  pageTotal: number = 0;

  searchString: string = "";
  searchStringUpdate = new Subject<string>();
  isLoading: boolean = false;

  constructor(private httpService: HttpService, private route: ActivatedRoute, private router: Router) {
    this.searchStringUpdate.pipe(debounceTime(500), distinctUntilChanged()).subscribe(value => {
      this.navigateRouter({ offset: this.paginator.pageIndex, searchString: value })
    });
  }

  ngOnInit(): void { 
    this.navigateRouter({})
    this.getDataFromApi();
  }

  ngAfterViewInit(): void {
    this.paginator.page.subscribe(() => {
      this.navigateRouter({ offset: this.paginator.pageIndex + 1, seaarchString: this.searchString })
    })
  }

  navigateRouter(querParams: object){
    this.router.navigate([''], {
        relativeTo: this.route,
        queryParams: querParams,
        queryParamsHandling: 'merge',
    });
  }
  
  getDataFromApi(){ 
    this.isLoading = true;
    this.dataSource$ = this.route.queryParams.pipe(
      switchMap((params: Params) => {
        const filters = { offset: params['offset'] || 1, searchString: params['searchString'] || '', amount: params['amount'] || 10};

        return this.httpService.getList<Ship>('http://localhost:5279/docks',filters).pipe(
          map((data) => {
            this.pageTotal = data.content.info.total;
            this.isLoading = false;
            return data.content.value;
          }),
          catchError(() => {
            this.pageTotal = 0;
            return [];  
          })
        )
      })
    )
  }

  
}