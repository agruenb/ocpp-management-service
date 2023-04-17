import { RedisClientType } from "./RedisClient";
import EventEmitter from "events";

export default class RedisSubscribe extends EventEmitter{

    _redisClient:RedisClientType;
    _channel:string;

    constructor(redisClient:RedisClientType, channel:string){
        super()
        this._redisClient = redisClient.duplicate();
        this._channel = channel;
    }

    connect(){
        this._redisClient.connect();
        this._redisClient.subscribe(this._channel, (message:string) => {
            this.emit("message", message);
        });
    }
}