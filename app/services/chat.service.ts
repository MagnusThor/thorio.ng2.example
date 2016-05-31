import {Injectable} from '@angular/core'
import { ChatMessage} from '../models/chatmessage';
import { ThorIO }  from '../thorio/thorio';
import { FactoryWrapper }  from '../thorio/factorywrapper';

@Injectable()

export class ChatService {
    private chatChannel: ThorIO.Channel;
    public ChatMessages: Array<ChatMessage>;
    
    constructor(channels:FactoryWrapper) {
        
        this.ChatMessages = new Array<ChatMessage>();
        this.chatChannel  = channels.getChannels("simplechat");
        
        this.chatChannel.on("say", (chatMessage: ChatMessage) => {
            this.ChatMessages.push(chatMessage);
        });
        
   };
    public setAge(age: Number) {
        this.chatChannel.setProperty("age", age);
    }
    public sendMessage(message: ChatMessage) {
        this.chatChannel.invoke("sayTo", message);
    }
}
