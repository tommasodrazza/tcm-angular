import { Injectable } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class BreadcrumbService {

    constructor(private router: Router) {}

    public createBreadcrumbs(route: ActivatedRoute, breadcrumbs: Array<{ label: string, url: string }> = []): Array<{ label: string, url: string }> {
        const parents: Array<{ label: string, url: string }> = route.firstChild?.snapshot.data['parents'] ?? [];
        for (const parent of parents) {
            breadcrumbs.push(parent);
        }
        breadcrumbs.push({ label: route.firstChild?.snapshot.data['breadcrumb'] , url: this.router.url });
        return breadcrumbs;
    }
}