// tslint:disable:no-var-requires

import { Injectable } from '@angular/core';
import { ChatEngineCore } from 'chat-engine';

@Injectable()
export class ChatEngine implements ChatEngineCore {
  instance: any;
  create: any;
  plugin: any;
  me: any = { state: {} };
  chat: any = {};
  chats: any[] = [];
  constructor() {
    this.instance = ChatEngineCore.create( // @ts-ignore
      {
        publishKey: 'pub-c-a326d2f6-fd6b-42e0-9cd9-7822e37db129',
        subscribeKey: 'sub-c-43809b02-79a4-11e8-bf94-e222e63eed43'
        
        // publishKey: 'pub-c-9b914983-9487-4be5-a0e4-0c27a20e6572',
        // subscribeKey: 'sub-c-acc8e784-cd70-11e8-b02a-a6a8b6327be1'
      },
      {
        debug: true,
        // globalChannel: 'chatengine-demo-chat'
      });

    this.create = ChatEngineCore.create.bind(this); // @ts-ignore
    this.plugin = ChatEngineCore.plugins; // @ts-ignore
  }

  newChat(user) {
    // define a channel
    let chat = new Date().getTime();
    // create a new chat with that channel
    let newChat = new this.instance.Chat(chat);
    // we need to auth ourselves before we can invite others
    newChat.on('$.connected', () => {
      // this fires a private invite to the user
      newChat.invite(user);
      // add the chat to the list
      this.chats.push(newChat);
    });
  }
}
