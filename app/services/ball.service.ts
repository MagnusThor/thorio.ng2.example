import {Injectable} from '@angular/core'
import { Ball} from '../models/chatmessage';
import { ThorIO }  from '../thorio/thorio';
import { FactoryWrapper }  from '../thorio/factorywrapper';

@Injectable()

export class BallService {
    private _ballChannel: ThorIO.Channel;
    
    
    public Ball : Ball;
    
    constructor(channels:FactoryWrapper) {
        
        this.Ball = new Ball(100,100,"red");
  
        this._ballChannel  = channels.GetChannel("ball");
       
        this._ballChannel.On("ballCreated", (ball:Ball) => {
         this.Ball.x = ball.x;
         this.Ball.y = ball.y;
        });
        
        
        this._ballChannel.OnOpen = () =>
        {
              this._ballChannel.Invoke("getBall",{});
        }
        
        this._ballChannel.On("move",(ball:Ball) => {
         this.Ball.x = ball.x;
         this.Ball.y = ball.y; 
        });
        
      
        
   };
   
    public Move(x:number,y:number)
    {
        this._ballChannel.Invoke("move",{x:x,y:y});
    } 
  
   
}
