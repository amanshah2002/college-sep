import { AuthenticationService } from './../../services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { startupCategory } from 'src/app/enums/enum.enum';
import { loginData } from 'src/app/interfaces/interface';

@Component({
  selector: 'sep-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {
  constructor(private authenticationService: AuthenticationService) {}

  startupType = [
    { label: 'Tech', value: startupCategory.tech },
    { label: 'AI', value: startupCategory.AI },
    { label: 'Finance', value: startupCategory.finance },
    { label: 'NGO', value: startupCategory.NGO },
    { label: 'agricultural', value: startupCategory.agriculture },
  ];

  isLoggedIn:boolean = false;
  user:loginData = {};

  ngOnInit(): void {
    this.getCurrentUser();
    console.log(this.isLoggedIn);
  }

  getCurrentUser = () => {
    this.authenticationService.isLoggedIn.subscribe((data) => {
      if (data) {
        this.isLoggedIn = data;
      }
    });

    this.authenticationService.getUser.subscribe(data => {
      this.user = data
    }
    )
  };
}
