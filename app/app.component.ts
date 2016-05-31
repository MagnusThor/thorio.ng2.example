import {Component } from '@angular/core';
import { Injectable } from '@angular/core';
import {ChatComponent} from './components/chat.component'
import {AboutComponent} from './components/about.component';
import { RouteConfig, ROUTER_DIRECTIVES } from '@angular/router-deprecated';


import { FactoryWrapper }  from './thorio/factorywrapper'; 
import { ChatService }  from './services/chat.service';

@Component({
    selector: 'my-app',
    templateUrl: './app/app.template.html',
    directives: [ROUTER_DIRECTIVES],
    providers: [
        ChatService,FactoryWrapper
    ]
})


@RouteConfig([
    { path: '/chat', name: 'Chat', component: ChatComponent },
    { path: '/about', name: 'About', component: AboutComponent },
])


export class AppComponent {
    constructor() {
        
       
        //myChatService: ChatService
    }
}
