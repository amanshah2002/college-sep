import { CallAPIService } from './core/call-api-service.service';
import { AuthenticationService } from './services/authentication.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'sep-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit{

  userLoggedIn = false;

  constructor(
    private authenticationService:AuthenticationService){}
  ngOnInit(): void {
    this.authenticationService.autoLogin();
    this.authenticationService.isLoggedIn.subscribe(data => {
      this.userLoggedIn = data;
    })
  }
  title = 'college-sep';
}
