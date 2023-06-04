import { ChatService } from './../../../services/chat.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { io } from 'socket.io-client';
import { loginData, message } from 'src/app/interfaces/interface';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'sep-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {

  selectedUser!: loginData;
  socket: any;
  messageForm = new FormGroup({
    msg: new FormControl(''),
  });
  currentUser: loginData = {};
  constructor(private router: Router, private chatService: ChatService, private authService: AuthenticationService) { }

  ngOnInit() {
    this.getCurrentUser();
    this.selectedUser = this.chatService.selectedUser;
    this.setSocketConnection();
  }

  onBack = () => {
    this.router.navigate(['chat']);
  };

  addToMessageList = (msg: string, isCurrentUser = true) => {
    const element = document.createElement('li');
    const { style } = element;
    element.innerHTML = msg;
    style.width = 'fit-content';
    style.maxWidth = '35%';
    style.background = isCurrentUser ? '#808080' : 'black';
    style.color = isCurrentUser ? 'black' : 'white';
    style.padding = '10px 20px';
    style.margin = isCurrentUser ?  '10px 0px 10px auto' : '10px auto 10px 0px';
    style.borderRadius = '6px';
    style.textAlign = isCurrentUser ? 'right' : 'left';
    style.listStyleType = 'none';
    document.getElementById('message-list')?.appendChild(element);
    element.scrollIntoView();
  };

  sendMessage = () => {
    console.log(`${this.currentUser._id}${this.selectedUser._id}`);

    const message = this.messageForm.controls['msg'];
    const msgConfig = {
      message: message.value,
      from: this.currentUser._id,
      to: this.selectedUser._id
    }
    if(message.value.trim()) {
      this.socket.emit('message', msgConfig);
      this.addToMessageList(message.value);
    }
    message.setValue('');
  };


  private setSocketConnection() {
    this.socket = io('http://localhost:3000');
    const ids = [this.currentUser._id, this.selectedUser._id].sort();
    console.log(ids);
    this.socket.emit('join', {id: `${ids[0]}${ids[1]}`});
    this.socket.on('new_msg', (data: message) => {
      if (data) {
        console.log(data);
        if(data?.from !== this.currentUser._id) {
          this.addToMessageList(data.message, false);
        }
      }
    });
  }

  private getCurrentUser = () => {
    this.authService.getUser.subscribe(user => {
      this.currentUser = user;
    })
  }
}
