import { Observable, Subject } from 'rxjs';
export class TableInstance<Type>{
    
    constructor(displayedColumns: string[], dataSource$: Observable<Type[]>, pageTotal: number, searchStringUpdate: Subject<string>, url: string) {
        this.displayedColumns = displayedColumns;
        this.dataSource$ = dataSource$;
        this.pageTotal = pageTotal;
        this.searchStringUpdate = searchStringUpdate;
        this.url = url;
    }

    displayedColumns: string[];
    dataSource$: Observable<Type[]>;
    pageTotal: number;
    searchString: string = "";
    searchStringUpdate: Subject<string>;
    isLoading: boolean = false;
    url: string;
}
