import { Component, OnInit } from '@angular/core';
import { MatFormFieldAppearance } from '@angular/material/form-field';
import { loginData } from '../interfaces/interface';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'sep-edit-account',
  templateUrl: './edit-account.component.html',
  styleUrls: ['./edit-account.component.scss']
})
export class EditAccountComponent implements OnInit {

  constructor(private authService: AuthenticationService) { }

  user:loginData = {};
  appearance:MatFormFieldAppearance = 'outline'
  ngOnInit(): void {
    this.getUser();
  }

  getUser = () => {
    this.authService.getUser.subscribe(user => {
      console.log(user);
      this.user = user;
    })
  }

}
