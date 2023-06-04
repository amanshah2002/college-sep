import { Injectable } from '@angular/core';
import { CallAPIService } from '../core/call-api-service.service';
import { apis, emailMessage, emailjsIds, snackbarMessage } from '../enums/enum.enum';
import { Observable, catchError, map, tap, throwError } from 'rxjs';
import { SnacbarService } from './snacbar.service';
import { loginData } from '../interfaces/interface';
import { EmailService } from './email.service';

export interface clientResponse {
  id: string;
}
@Injectable({
  providedIn: 'root'
})


export class ClientService {

  constructor(private callApiService: CallAPIService, private snackbarService: SnacbarService, private emailService: EmailService) { }

  postClient(payload: {[key: string]:string}, currentUser: loginData, email: string):Observable<any> {
    return this.callApiService.callPostAPI(apis.client, payload).pipe(
      tap(() => {
        this.snackbarService.open(snackbarMessage.postClient)
      const emailPayload = {
        message: `${currentUser.name} ${emailMessage.postClient}`,
        email,
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

  getAllClients(): Observable<any> {
    return this.callApiService.callGetAPI(apis.client).pipe(
      map((res: any) => {
        return this.flattenClientResponse(res)
      })
    )
  }

  getClientById(companyId: string) {
    // return this.getAllClients().pipe(
    //   map((res: any) => {
    //     return res.filter((ele: any) => ele.companyEmail === companyEmail)
    //   })
    // )

    return this.callApiService.callGetAPI(`${apis.client}/${companyId}`).pipe(
      catchError((err) => {
        this.snackbarService.open(err.error.message);
        throw err;
      })
    )
  }

  private flattenClientResponse (resp: any): any[] {
    let flattenedRes: any[] = []
    Object.keys(resp).forEach(key => {
      flattenedRes.push({
        id: key,
        ...resp[key]
      })
    })
    return flattenedRes
  }
}
