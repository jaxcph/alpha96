import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChatEngine } from './chatEngine';

import { AppComponent } from './app.component';
import { AppChatsComponent } from './app.chats';
import { AppChatComponent } from './app.chat';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialModule } from './material';
import { SidebarModule } from 'ng-sidebar';

import { UserListComponent } from './user/user-list/user-list.component';
import { UserInputComponent } from './user/input/user-input.component';

import { AppUsersOnlineComponent } from './user/app.usersOnline';
import { VideoPlayerComponent } from './video-player/video-player.component';
import { ChatWindowDirective } from './chat-window.directive';



@NgModule({
  declarations: [
    AppComponent,
    AppUsersOnlineComponent,
    AppChatsComponent,
    AppChatComponent,
    UserInputComponent,
    UserListComponent,
    VideoPlayerComponent,
    ChatWindowDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    SidebarModule.forRoot(),
    
  ],
  providers: [ChatEngine],
  bootstrap: [AppComponent]
})
export class AppModule { }
