import { Component, OnInit, Input } from '@angular/core';
import { ChatEngine } from '../../chatEngine';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  private ce: any;


  

  constructor(private chatEngine: ChatEngine) {
    this.ce = chatEngine;
  }

  ngOnInit() {

  }


  getUsers(obj) {
    let users: any = [];

    if (obj) {
      Object.keys(obj).forEach((key) => {
        users.push(obj[key]);
      });
    }

    return users;
  }

  directChat(user) {
    console.log('direct', user);
    // user = this.ce.users[user];
    user.direct.connect();
    user.direct.emit('message', {text: 'hello buddy!'});
    return false;
  }
  
}
