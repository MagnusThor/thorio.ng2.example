
import {Component } from '@angular/core';
import { Injectable } from '@angular/core';
import { ChatMessage} from '../models/chatmessage';
import { ChatService } from '../services/chat.service';

@Component({
  selector: 'my-app',
  templateUrl: '../app/components/chat.template.html',

})

export class ChatComponent {
    public chatMessages: Array<ChatMessage>;
    public currentChatMessage:ChatMessage;
    constructor(private chatService:ChatService){     
        this.chatMessages = chatService.ChatMessages;
        this.currentChatMessage = new ChatMessage();
    }
    sendMessage(){
        if(this.currentChatMessage.message.length === 0) return;
        this.chatService.sendMessage(this.currentChatMessage);
        this.currentChatMessage = new ChatMessage();
    }
    setAge(){
        this.chatService.setAge(this.currentChatMessage.age);
    }
  
 }