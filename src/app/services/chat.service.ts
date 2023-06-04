import { Injectable } from '@angular/core';
import { loginData } from '../interfaces/interface';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private user!: loginData;

  set selectedUser(user:loginData) {
    this.user = user;
    localStorage.setItem('selectedUser', JSON.stringify(this.user));
  }
  get selectedUser() {
    // return this.user || JSON.parse(localStorage.getItem('selectedUser') || '');
    return this.user;
  }
}
