import { Component, OnInit } from '@angular/core';
import { ChatEngine } from './chatEngine';

declare var require: any;
const random = require('chat-engine-random-username');
const search = require('chat-engine-online-user-search');

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private ce: any;

  
  private _opened: boolean = true;
  private _modeNum: number = 0;
  private _positionNum: number = 1;
  private _dock: boolean = true;
  private _closeOnClickOutside: boolean = false;
  private _closeOnClickBackdrop: boolean = true;
  private _showBackdrop: boolean = false;
  private _animate: boolean = true;
  private _trapFocus: boolean = true;
  private _autoFocus: boolean = true;
  private _keyClose: boolean = false;
  private _autoCollapseHeight: number = null;
  private _autoCollapseWidth: number = null;

  private _MODES: Array<string> = ['over', 'push', 'slide'];
  private _POSITIONS: Array<string> = ['left', 'right', 'top', 'bottom'];

  private _toggleOpened(): void {
    this._opened = !this._opened;
  }

  constructor(private chatEngine: ChatEngine) {
    this.ce = chatEngine;
   
  }

  ngOnInit() {
    this.ce.instance.connect('ss', {}, 'auth-key');

    this.ce.instance.on('$.ready', (data) => {
      this.ce.me = data.me;
      // random user TODO: replace with FB
      this.ce.me.plugin(random());


      // start global chat
      const channel = this.ce.instance.global.channel;
      const chat = new this.ce.instance.Chat(channel);
      this.ce.chats.push(chat);


      // when I get a private invit
      this.ce.me.direct.on('$.invite', (payload) => {
        const chat = new this.ce.instance.Chat(payload.data.channel);
        chat.onAny((a) => {
          console.log(a);
        });
        // create a new chat and render it in DOM
        this.ce.chats.push(chat);
      });



      // when I get a  direct message
      this.ce.me.direct.on('message', (payload) => {
        console.log('directMSG', payload.chat);
        const directChat = payload.chat;
        directChat.isPrivate = true;
        console.log('directMSG-directChat', directChat);
        // create a new chat and render it in DOM
        this.ce.chats.push(payload.chat);
      });


      this.ce.chat = this.ce.instance.global;
      this.ce.chat.plugin(search({ prop: 'state.username', caseSensitive: false }));
    });
  }

  private _toggleSidebar() {
    this._opened = !this._opened;
  }

  private _toggleMode(): void {
    this._modeNum++;

    if (this._modeNum === this._MODES.length) {
      this._modeNum = 0;
    }
  }

  private _toggleAutoCollapseHeight(): void {
    this._autoCollapseHeight = this._autoCollapseHeight ? null : 500;
  }

  private _toggleAutoCollapseWidth(): void {
    this._autoCollapseWidth = this._autoCollapseWidth ? null : 500;
  }

  private _togglePosition(): void {
    this._positionNum++;

    if (this._positionNum === this._POSITIONS.length) {
      this._positionNum = 0;
    }
  }

  private _toggleDock(): void {
    this._dock = !this._dock;
  }

  private _toggleCloseOnClickOutside(): void {
    this._closeOnClickOutside = !this._closeOnClickOutside;
  }

  private _toggleCloseOnClickBackdrop(): void {
    this._closeOnClickBackdrop = !this._closeOnClickBackdrop;
  }

  private _toggleShowBackdrop(): void {
    this._showBackdrop = !this._showBackdrop;
  }

  private _toggleAnimate(): void {
    this._animate = !this._animate;
  }

  private _toggleTrapFocus(): void {
    this._trapFocus = !this._trapFocus;
  }

  private _toggleAutoFocus(): void {
    this._autoFocus = !this._autoFocus;
  }

  private _toggleKeyClose(): void {
    this._keyClose = !this._keyClose;
  }

  private _onOpenStart(): void {
    console.info('Sidebar opening');
  }

  private _onOpened(): void {
    console.info('Sidebar opened');
  }

  private _onCloseStart(): void {
    console.info('Sidebar closing');
  }

  private _onClosed(): void {
    console.info('Sidebar closed');
  }

  private _onTransitionEnd(): void {
    console.info('Transition ended');
  }

  private _onBackdropClicked(): void {
    console.info('Backdrop clicked');
  }

}
