import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, of } from 'rxjs';
import { ApiHttpRequest } from './interfaces';
import Ship from '../model/ships/Ship';
import ContainerCargo from '../model/ships/ContainerCargo';

@Injectable({ providedIn: 'root' })
export class HttpService {
    constructor(private http: HttpClient) {}

    getList<T>(url: string, filters: { searchString?: string; offset?: string, amount: string  } = { searchString : '', offset: '', amount: '' }): Observable<ApiHttpRequest<T>> {
        const params = new HttpParams({ fromObject: filters });
        return this.http.get<ApiHttpRequest<T>>( url, { params } )
    }

    addShip<T>(url: string, body: object): Observable<ApiHttpRequest<T>>{
        return this.http.post<ApiHttpRequest<T>>(url, body, { headers: {'Content-Type':'application/json'} })
    }
}