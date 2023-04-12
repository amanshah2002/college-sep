import { Injectable } from '@angular/core';
import { CallAPIService } from '../core/call-api-service.service';
import { apis, snackbarMessage } from '../enums/enum.enum';
import { catchError, tap, throwError } from 'rxjs';
import { SnacbarService } from './snacbar.service';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private callApiService: CallAPIService, private snackbarService: SnacbarService) { }

  assignWork(payload: {[key: string]:string}) {
    return this.callApiService.callPostAPI(apis.client, payload).pipe(
      tap(() => {
        this.snackbarService.open(snackbarMessage.assignWork)
      }),
      catchError((error) => {
        throw(error)
      })
    )
  }
}
