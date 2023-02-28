import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CallAPIService } from '../core/call-api-service.service';
import { apis } from '../enums/enum.enum';
import { investmentDetails } from '../interfaces/interface';

@Injectable({
  providedIn: 'root'
})
export class InvestmentService {

  constructor(private callApiService: CallAPIService) { }

   invest = (investmentDetails: investmentDetails): Observable<any> => {
    return this.callApiService.callPostAPI(apis.invest, investmentDetails)
  };
}
