export /**
 * ChatMessage model
 */
class ChatMessage {
    public message:string;
    public created: Date;
    public age: Number;
    constructor() {
        this.created = new Date();
        this.age = 10;
    }
}

export /**
 * name
 */
class Ball {
    
    public x:Number;
    public y:Number;
    public c:string
    
    constructor(x:Number,y:Number,color:string) {
        this.x = x;
        this.y = y;
        this.c = color;
    }
}