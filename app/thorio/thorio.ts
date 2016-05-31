

export namespace ThorIO {
    export class Factory {
        private ws: WebSocket;
        private toQuery(obj: any) {
            return `?${Object.keys(obj).map(key => (encodeURIComponent(key) + "=" +
                encodeURIComponent(obj[key]))).join("&")}`;
        }
        private channels: Array<ThorIO.Channel>;
        constructor(url: string, controllers: Array<string>, params: any) {
            var self = this;
            this.channels = new Array<ThorIO.Channel>();
            this.ws = new WebSocket(url + this.toQuery(params));
            this.ws.onmessage = event => {
                var message = JSON.parse(event.data);
                this.getChannel(message.C).dispatch(message.T, message.D);
            };
            this.ws.onopen = event => {
                this.onopen.apply(this, [this.channels]);
            };
            controllers.forEach(alias => {
                self.channels.push(
                    new Channel(alias, self.ws)
                );
            });
        }
        close() {
            this.ws.close();
        };
        getChannel(alias: string):ThorIO.Channel {
            var channel = this.channels.find(pre => (pre.alias === alias));
            return channel;
        };
        removeChannel() {
            throw "Not yet implemented";
        }
        onopen(event: any) {
        };
    }
    export class Message {
        private _T: string;
        get T(): string {
            return this._T;
        }
        set T(v: string) {
            this._T = v;
        }
        private _D: any;
        get D(): any {
            return this._D;
        }
        set D(v: any) {
            this._D = v;
        }
        private _C: string;
        get C(): string { return this._C };
        set C(value: string) { this._C = value };
        get JSON(): any {
            return {
                T: this.T, D: JSON.stringify(this.D), C: this.C
            }
        };
        constructor(topic: string, object: any, controller: string) {
            this.D = object;
            this.T = topic;
            this.C = controller;
        }
        toString() {
            return JSON.stringify(this.JSON);
        }


    }

    export class Listener {
        fn: Function;
        topic: string;
        constructor(topic: string, fn: Function) {
            this.fn = fn;
            this.topic = topic;
        }
    }

    export class Channel {
        alias: string;
        ws: WebSocket;
        isConnected: boolean;
        listeners: Array<ThorIO.Listener>;
        constructor(alias: string, ws: WebSocket) {
            this.listeners = new Array<ThorIO.Listener>();
            this.alias = alias;
            this.ws = ws;
            this.isConnected = false;
        }
        connect() {
            this.ws.send(new ThorIO.Message("$connect_", {}, this.alias));
            return this;
        };
        close() {
            this.ws.send(new ThorIO.Message("$close_", {}, this.alias));
            return this;
        };
        subscribe(t: string, fn: any) {
            this.on(t, fn);
            this.ws.send(new ThorIO.Message("subscribe", { topic: t, controller: this.alias }, this.alias));
            return this;
        };
        unsubscribe(t: string) {
            this.ws.send(new ThorIO.Message("unsubscribe", { topic: t, controller: this.alias }, this.alias));
            return this;
        };
        on(t: string, fn: any) {
            this.listeners.push(new ThorIO.Listener(t, fn));
            return this;
        };
        off(t: string) {
            var index =
                this.listeners.findIndex(function(pre: Listener) {
                    return pre.topic === t;
                })
            if (index >= 0) this.listeners.slice(index, 1);
            return this;
        };
        invoke(t: string, d: any, c?: string) {
            this.ws.send(new ThorIO.Message(t, d, c || this.alias));
            return this;
        };
        setProperty(name: string, value: any, controller?: string) {
            const property = `$set_${name}`;
            this.invoke(property, value, controller || this.alias);
            return this;
        };
        dispatch(t: string, d: any) {
            if (t === "$open_") {
                d = JSON.parse(d);
                localStorage.setItem("pid", d.PI);
                this.isConnected = true;
                this.onopen(d);
                return;
            } else if (t === "$close_") {
                this.onclose([JSON.parse(d)]);
                this.isConnected = false;
            } else if (this.hasOwnProperty(t)) {
                // this[t].apply(this, [JSON.parse(d)]);
            } else {
                var listener = this.listeners.find(pre => (pre.topic === t));
                if (listener) listener.fn(JSON.parse(d));
            }
        };
        onopen(message: any) {
        };

        onclose(message: any) {
        };
    }
}

