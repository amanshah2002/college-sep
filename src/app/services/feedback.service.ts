import { CallAPIService } from './../core/call-api-service.service';
import { Injectable } from '@angular/core';
import { apis } from '../enums/enum.enum';
import { feedback } from '../interfaces/interface';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

constructor(private callApiService: CallAPIService) { }

postFeedback = (feedbackPayload: feedback) => {
  return this.callApiService.callPostAPI(apis.feedback,feedbackPayload)
}

}
