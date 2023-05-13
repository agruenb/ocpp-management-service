import ws from "ws";
import RedisSubscribe from "../redis-db/RedisSubscribe";
import mainRedisClient from "../redis-db/mainRedisClient";
import EventEmitter from "events";

export default class OcppTransactionFeed extends EventEmitter {

    _startTransactionSub;
    _stopTransactionSub;
    _meterValuesTransactionSub;

    constructor() {
        super();
        this._startTransactionSub = new RedisSubscribe(mainRedisClient, "Transaction:Started");
        this._startTransactionSub.connect();
        this._stopTransactionSub = new RedisSubscribe(mainRedisClient, "Transaction:Stopped");
        this._stopTransactionSub.connect();
        this._meterValuesTransactionSub = new RedisSubscribe(mainRedisClient, "Transaction:MeterValues");
        this._meterValuesTransactionSub.connect();
    }
    attachTo(socket: ws.WebSocket) {
        this._startTransactionSub.appendListener(socket, (info:string) => {
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
        this._meterValuesTransactionSub.appendListener(socket, (info:string) => {
            socket.send(
                JSON.stringify(
                    JSON.parse(info).map( (el:any) => {
                        return {
                            info: el,
                            type: "meterValuesTransaction",
                        }
                    })
                )
            );
        });
        this._stopTransactionSub.appendListener(socket, (info:string) => {
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