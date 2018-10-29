import {Component, 
        Input, ViewChild, ElementRef,
        OnInit, AfterViewChecked,
      } from '@angular/core';
import {ChatEngine} from './chatEngine';

declare var require: any;
const typing = require('chat-engine-typing-indicator');

import {animate, state, style, transition, trigger} from '@angular/animations';



@Component({
  selector: 'app-chat',
  templateUrl: './templates/app.chat.html',
   styleUrls: ['./app.component.css'],

  

})
export class AppChatComponent implements OnInit, AfterViewChecked {
  private ce: any;
  @Input() chat: any;
  @Input() index: number;
  messages: any[] = [];
  message: string;
  mysearch: string = '';
  users: any[] = [];

  @ViewChild('scroller') private feedContainer: ElementRef;
  
  constructor(private chatEngine: ChatEngine) {
    this.ce = chatEngine;
   

  }

  ngOnInit() {

    

      // Message History
     
           // search for 50 old message emits / publishes on the channel
           this.chat.search({
             
            reverse: true,
            event: 'message',
            limit: 25
        }).on('message', (data) => {
          // when messages are returned, log them like normal messages
       
          this.messages.unshift(data);
        }).on('$.search.finish', () => {
          console.log('we have all messages loaded!')
      });
      

    this.chat.plugin(typing({ timeout: 5000 }));

    this.chat.on('message', (payload) => {
      // if the last message was sent from the same user
      payload.sameUser = this.messages.length > 0 && payload.sender.uuid === this.messages[this.messages.length - 1].sender.uuid;

      // if this message was sent by this client
      payload.isSelf = payload.sender.name === 'Me';

      // add the message to the array
      this.messages.push(payload);

      this.scrollToBottom;
    });

    
    // when we get notified of a user typing
    this.chat.on('$typingIndicator.startTyping', (event) => {
      event.sender.isTyping = true;
    });

    // when we get notified a user stops typing
    this.chat.on('$typingIndicator.stopTyping', (event) => {
      event.sender.isTyping = false;
    });

  
      


  }


  scrollToBottom(): void {
    this.feedContainer.nativeElement.scrollTop
    = this.feedContainer.nativeElement.scrollHeight;
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }
 

  // getUsers(obj) {
  //   let users: any = [];

  //   if (obj) {
  //     Object.keys(obj).forEach((key) => {
  //       users.push(obj[key]);
  //     });
  //   }

  //   return users;
  // }

  leave() {
    this.chat.leave();
    this.ce.chats.splice(this.index, 1);

    return false;
  }

 invite(user) {
    this.chat.invite(user);
    this.users = [];

    return false;
  }

 

  send() {
    this.chat.emit('message', { text: this.message });
    this.message = '';
  }



  search() {
    if (this.mysearch.length >= 2) {
      this.users = this.ce.chat.onlineUserSearch.search(this.mysearch);
    } else {
      this.users = [];
    }
  }
}




