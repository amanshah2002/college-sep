import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnacbarService {

  constructor(private snackbar: MatSnackBar) { }

  open = (message:string) => {
    this.snackbar.open(message,'Dismiss',{duration:5000,verticalPosition:'top'});
  }
}
