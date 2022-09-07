import { CallAPIService } from './core/call-api-service.service';
import { AuthenticationService } from './services/authentication.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'sep-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit{

  constructor(
    private authenticationService:AuthenticationService){}
  ngOnInit(): void {
    this.authenticationService.autoLogin();
  }
  title = 'college-sep';
}
