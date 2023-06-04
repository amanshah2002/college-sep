import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { io } from 'socket.io-client';
import { loginData } from 'src/app/interfaces/interface';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'sep-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {
  users = {};
  userList: any[] = [];

  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private chatService: ChatService
  ) {}

  ngOnInit() {
    this.getAllUsers();
  }

  getAllUsers = () => {
    this.authService.getAllUsers().subscribe((users: any) => {
      this.users = users;
      this.userList = [
        ...users.employees,
        ...users.investors,
        ...users.clients,
      ];
    });
  };



  onChat = (user: loginData) => {
    console.log(user);
    this.router.navigate(['/message']);
    this.chatService.selectedUser = user;
  };
}
