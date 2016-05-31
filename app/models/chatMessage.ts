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