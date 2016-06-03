import { Component,HostListener } from '@angular/core';
import { Injectable } from '@angular/core';
import { BallService } from '../services/ball.service';
import { Ball} from '../models/chatmessage';

@Component({
  selector: 'my-app',
  templateUrl: '../app/components/ball.template.html'
})

export class BallComponent {
    
    public Ball:Ball;
    
     @HostListener('document:mousemove', ['$event'])
      onMousemove(event: MouseEvent) { 
        this.ballService.Move(event.pageX,event.pageY);
   }
      
    constructor(private ballService:BallService) {
      console.log(".",ballService);  
      
      
      
      this.Ball = ballService.Ball;
      
      console.log(this.Ball);
      
      
    }
}