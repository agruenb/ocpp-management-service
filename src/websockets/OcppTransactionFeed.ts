import ws from "ws";
import RedisSubscribe from "../redis-db/RedisSubscribe";
import mainRedisClient from "../redis-db/mainRedisClient";
import EventEmitter from "events";

export default class OcppTransactionFeed extends EventEmitter {

    _startTransactionSub;
    _stopTransactionSub;

    constructor() {
        super();
        this._startTransactionSub = new RedisSubscribe(mainRedisClient, "Transaction:Started");
        this._startTransactionSub.connect();
        this._stopTransactionSub = new RedisSubscribe(mainRedisClient, "Transaction:Stopped");
        this._stopTransactionSub.connect();
    }
    attachTo(socket: ws.WebSocket) {
        this._startTransactionSub.addListener(socket, (info:string) => {
            socket.send(
                JSON.stringify(
                    JSON.parse(info).map( (el:any) => {
                        return {
                            info: el,
                            type: "startTransaction",
                        }
                    })
                )
            );
        });
        this._stopTransactionSub.addListener(socket, (info:string) => {
            socket.send(
                JSON.stringify(
                    JSON.parse(info).map( (el:any) => {
                        return {
                            info: el,
                            type: "stopTransaction",
                        }
                    })
                )
            );
        });
    }

}