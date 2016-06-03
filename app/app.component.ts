import {Component } from '@angular/core';
import { Injectable } from '@angular/core';
import {ChatComponent} from './components/chat.component'
import {AboutComponent} from './components/about.component';
import { BallComponent} from './components/ball.component' 


import { RouteConfig, ROUTER_DIRECTIVES } from '@angular/router-deprecated';
import { FactoryWrapper }  from './thorio/factorywrapper'; 
import { ChatService }  from './services/chat.service';
import { BallService }  from './services/ball.service';


@Component({
    selector: 'my-app',
    templateUrl: './app/app.template.html',
    directives: [ROUTER_DIRECTIVES],
    providers: [
        BallService,ChatService,FactoryWrapper
    ]
})
@RouteConfig([
    { path: '/chat', name: 'Chat', component: ChatComponent,useAsDefault:true },
    { path: '/about', name: 'About', component: AboutComponent },
    { path: '/ball' ,name: 'Ball', component:BallComponent}
])
export class AppComponent {
    constructor() {
    }
}
