import { Component,HostListener } from '@angular/core';

@Component({
  templateUrl : "../app/components/about.template.html"
   
})
export class AboutComponent { 
  
  
 @HostListener('document:mousemove', ['$event'])
  onMousemove(event: MouseEvent) { 
    
    
    this.left = event.pageX;
    this.top = event.pageY;
  
}

  public left = 200;
  public top = 200;
  
  constructor(){
              console.log(this)
  }
 
  
}