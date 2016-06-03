import {Provider} from  '@angular/core';
import {Injectable} from '@angular/core'
import { bootstrap }  from '@angular/platform-browser-dynamic';
import { ROUTER_PROVIDERS } from '@angular/router-deprecated';
import { AppComponent } from './app.component';
import { ChatService } from './services/chat.service';
import { BallService } from './services/ball.service';
import { FactoryWrapper } from '../app/thorio/factorywrapper'

bootstrap(AppComponent, [
    ROUTER_PROVIDERS,
    new Provider("MyChannels", {
        useClass: FactoryWrapper
    }),
    new Provider("ChatService",
        { useClass: ChatService }
    ),
     new Provider("BallService",
        { useClass: BallService }
    )
]
);
