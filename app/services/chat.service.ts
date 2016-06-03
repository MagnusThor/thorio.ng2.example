import {Injectable} from '@angular/core'
import { ChatMessage} from '../models/chatmessage';
import { ThorIO }  from '../thorio/thorio';
import { FactoryWrapper }  from '../thorio/factorywrapper';

@Injectable()

export class ChatService {
    private _chatChannel: ThorIO.Channel;
    public ChatMessages: Array<ChatMessage>;
    
    constructor(channels:FactoryWrapper) {
        
        this.ChatMessages = new Array<ChatMessage>();

        this._chatChannel  = channels.GetChannel("simplechat");
       
        this._chatChannel.On("say", (chatMessage: ChatMessage) => {
            this.ChatMessages.push(chatMessage);
        });
        
   };
    public SetAge(age: Number) {
        this._chatChannel.SetProperty("age", age);
    }
    public SendMessage(message: ChatMessage) {
        this._chatChannel.Invoke("sayTo", message);
    }
}
