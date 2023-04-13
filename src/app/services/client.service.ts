import { Injectable } from '@angular/core';
import { CallAPIService } from '../core/call-api-service.service';
import { apis, emailMessage, emailjsIds, snackbarMessage } from '../enums/enum.enum';
import { catchError, tap, throwError } from 'rxjs';
import { SnacbarService } from './snacbar.service';
import { loginData } from '../interfaces/interface';
import { EmailService } from './email.service';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private callApiService: CallAPIService, private snackbarService: SnacbarService, private emailService: EmailService) { }

  assignWork(payload: {[key: string]:string}, currentUser: loginData) {
    return this.callApiService.callPostAPI(apis.client, payload).pipe(
      tap(() => {
        this.snackbarService.open(snackbarMessage.assignWork)
      const emailPayload = {
        message: `${currentUser.name} ${emailMessage.assignWork}`,
        email: payload['companyEmail'],
      };
      this.emailService.send(
        emailjsIds.companyAddedServiceId,
        emailjsIds.rejectApproveTemplateId,
        emailPayload,
        emailjsIds.companyAddedPublicKey
      );
      }),
      catchError((error) => {
        throw(error)
      })
    )
  }
}
