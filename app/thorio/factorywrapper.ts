import {Injectable} from '@angular/core';
import { ThorIO }  from '../thorio/thorio';
@Injectable()
 
 export
 class FactoryWrapper {
     factory: ThorIO.Factory;
     constructor() {
         const wsUrl = "ws:thorio.azurewebsites.net:80";
         
         this.factory = new ThorIO.Factory(wsUrl,["simplechat"],{});
         this.factory.onopen = (channels) => {
           channels.forEach(function(channel:ThorIO.Channel){
                channel.connect();   
           });
         };
     }
      getChannels(name:string):ThorIO.Channel{
         return this.factory.getChannel(name);
     }
 }