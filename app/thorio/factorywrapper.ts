import {Injectable} from '@angular/core';
import { ThorIO }  from '../thorio/thorio';
@Injectable()
 
 export
 class FactoryWrapper {
     factory: ThorIO.Factory;
     constructor() {
         
         const wsUrl = "ws://thorio.azurewebsites.net:80";//"ws://localhost:1337";
         
         this.factory = new ThorIO.Factory(wsUrl,["simplechat","ball"],{});
         this.factory.OnOpen = (channels) => {
           channels.forEach(function(channel:ThorIO.Channel){
                channel.Connect();   
           });
         };
     }
     public GetChannel(name:string):ThorIO.Channel{
         return this.factory.GetChannel(name);
     }
 }