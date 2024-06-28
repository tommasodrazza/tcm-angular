import { Component, OnInit, AfterViewInit, ViewChild} from '@angular/core';
import { NgIf } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ProgressBarComponent } from '../progress-bar/progress-bar.component';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator } from '@angular/material/paginator';
import { FormsModule } from '@angular/forms';
import { catchError, Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { HttpService } from '../httpService/http.service';
import { environment } from '../../environments/environment';
import Tool from '../model/Tool';


@Component({
  selector: 'app-docks-list',
  standalone: true,
  imports: [MatTableModule, MatIconModule, FormsModule, MatPaginator, NgIf, ProgressBarComponent, RouterLink],
  templateUrl: './tools-list.component.html',
  styleUrl: './tools-list.component.css'
})

export class ToolsListComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  displayedColumns: string[] = ['id', 'tooltype', 'isFree', 'usedBy'];
  dataSource$ = new Observable<Tool[]>();
  tools!: Tool[];
  pageTotal: number = 0;

  url!: string;
  title: string = "";

  searchString: string = "";
  searchStringUpdate = new Subject<string>();
  isLoading: boolean = false;

  constructor(private httpService: HttpService, private route: ActivatedRoute, private router: Router) {
    this.searchStringUpdate.pipe(debounceTime(500), distinctUntilChanged()).subscribe(value => {
      this.navigateRouter({ offset: this.paginator.pageIndex, searchString: value })
    });
  }

  setUrl(){
    this.route.params.forEach((p) => {
      this.url = `${environment.API_URL}/dock-tools/${p['dockid']}`
      this.title = `DOCK: ${p['dockid']} tools`
    })
  }

  ngOnInit(): void { 
    this.setUrl()
    this.navigateRouter({})
    this.loadData()
  }

  ngAfterViewInit(): void {
    this.paginator.page.subscribe(() => {
      this.navigateRouter({ offset: this.paginator.pageIndex + 1, seaarchString: this.searchString })
    })
  }

  navigateRouter(querParams: object){
    this.router.navigate([this.router.url.split('?')[0]], {
        relativeTo: this.route,
        queryParams: querParams,
        queryParamsHandling: 'merge',
    });
  }
  

  loadData(): void{
    this.route.queryParams.subscribe((p) => {
      this.isLoading = true;
      const filters = { offset: p['offset'] || 0, searchString: p['searchString'] || '', amount: p['amount'] || 10};
      this.httpService.getList<Tool>(this.url ,filters).subscribe(
          (data) => {
            this.pageTotal = data.listInfo.total;
            this.isLoading = false;
            this.tools = data.content;
            this.isLoading = false;
          }),
          catchError((): any => {
            this.pageTotal = 0;
            this.tools = [];  
          })
      })
  }

}