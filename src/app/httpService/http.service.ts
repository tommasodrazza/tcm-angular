import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiHttpRequest } from './interfaces';

@Injectable({ providedIn: 'root' })
export class HttpService {
    constructor(private http: HttpClient) {}

    getList<Type>(url: string, filters: { searchString?: string; offset?: string, amount: string  } = { searchString : '', offset: '', amount: '' }): Observable<ApiHttpRequest<Type>> {
        const params = new HttpParams({ fromObject: filters });
        return this.http.get<ApiHttpRequest<Type>>(
            url, { params }
        );
    }
}