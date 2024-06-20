import { Injectable, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { HttpService } from '../httpService/http.service';
import { ActivatedRoute, Router } from '@angular/router';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import { ApiHttpRequest } from '../httpService/interfaces';

@Injectable({ providedIn: 'root' })
export class TableService<Type>{
    @ViewChild(MatPaginator) paginator!: MatPaginator;
    searchString: string = "";
    searchStringUpdate = new Subject<string>();

    constructor ( private httpService: HttpService,  private route: ActivatedRoute, private router: Router ) 
    {
        this.searchStringUpdate.pipe(debounceTime(500), distinctUntilChanged()).subscribe(value => {
            this.navigateRouter({ offset: this.paginator.pageIndex, searchString: value })
        });
        
    }

    getApiUrl(){
        return 'http://localhost:5279/ships'
    }

    init(): void{
        this.navigateRouter({})
        this.loadData();
    }

    afterView(): void{
        this.paginator.page.subscribe(() => {
            this.navigateRouter({ offset: this.paginator.pageIndex + 1, searchString: this.searchString })
        })
    }

    navigateRouter(querParams: object){
        this.router.navigate([''], {
            relativeTo: this.route,
            queryParams: querParams,
            queryParamsHandling: 'merge',
        });
    }

        
    loadData(): Observable<ApiHttpRequest<Type>> | boolean
    {
        this.route.queryParams.subscribe((p) => {
            const filters = { offset: p['offset'] || 0, searchString: p['searchString'] || '', amount: p['amount'] || 10} 
            return this.httpService.getList<Type>(this.getApiUrl(), filters)
        })
        return false
    }

}