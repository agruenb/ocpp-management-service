import ws from "ws";
import { RedisClientType } from "./RedisClient";

export default class RedisSubscribe{

    _redisClient:RedisClientType;
    _channel:string;

    _listenerSockets:Array<{
        socket: ws.WebSocket,
        listener: Function
    }>;

    constructor(redisClient:RedisClientType, channel:string){
        this._redisClient = redisClient.duplicate();
        this._redisClient.on('error', err => console.error("[RedisSub]", "Redis error", err));
        this._redisClient.on('connect', () => console.log("[RedisSub]", "Connected"));
        this._channel = channel;

        this._listenerSockets = [];
    }

    connect(){
        this._redisClient.connect();
        this._redisClient.subscribe(this._channel, (message:string) => {
            this.broadcast(message);
        });
    }
    broadcast(msg:string){
        for(let i = 0; i < this._listenerSockets.length; i++){
            if(this._listenerSockets[i].socket.readyState === ws.WebSocket.CLOSED){
                this._listenerSockets.splice(i, 1);
                i--;
                console.log("Delete inactive socket");
            }else{
                this._listenerSockets[i].listener(msg);
            }
        }
    }
    addListener(socket:ws.WebSocket, msgHandler:Function){
        this._listenerSockets.push({
            socket: socket,
            listener: msgHandler
        })
    }
}