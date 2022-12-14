import emailjs, { EmailJSResponseStatus } from 'emailjs-com';
import { Injectable } from '@angular/core';
import { SnacbarService } from './snacbar.service';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  constructor(private snackbarService:SnacbarService) { }

  send = (serviceId:string,templateId:string,payload:any,publicKey:string) => {
    emailjs.send(serviceId,templateId,payload as any,publicKey).then(
      (result: EmailJSResponseStatus) => {},
      (error) => {
        this.snackbarService.open(error.text);
      }
    );
  }
}
