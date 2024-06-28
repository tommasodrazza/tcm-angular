import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';


@Injectable({ providedIn: 'root' })
export class SnackbarService {
    durationInSeconds = 5;

    constructor(private _snackBar: MatSnackBar) {}

    openSnackBar(message: string, type: string) {
        this._snackBar.open(message, undefined , {
            horizontalPosition: 'end',
            verticalPosition: 'top',
            duration: 5 * 1000,
            panelClass: [`${type}-snackbar`, 'text-body']
        })
    }
}