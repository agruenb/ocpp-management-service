import RedisSubscribe from "../redis-db/RedisSubscribe";
import mainRedisClient from "../redis-db/mainRedisClient";
import EventEmitter from "events";

export default class OcppClientFeed extends EventEmitter {

    _sub;

    constructor() {
        super();
        this._sub = new RedisSubscribe(mainRedisClient, "ClientInfo:Updated");
        this._sub.connect();
    }
    attachTo(socket:any){
        this._sub.appendListener(socket, (info:string) => {
            socket.send(info);
        });
    }

}