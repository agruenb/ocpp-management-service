import ws from "ws";
import OcppClientFeed from "./websockets/OcppClientFeed";
import OcppTransactionFeed from "./websockets/OcppTransactionFeed";

export default class WsRouter {

    _wsServer;
    _clientFeed;
    _transactionFeed;

    constructor() {
        this._clientFeed = new OcppClientFeed();
        this._transactionFeed = new OcppTransactionFeed();
        this._wsServer = new ws.Server({ noServer: true });
    }
    attachTo(httpServer: any) {
        httpServer.on('upgrade', (request: any, socket: any, head: any) => {
            this._wsServer.handleUpgrade(request, socket, head, socket => {
                this.route(request.url, socket);
            });
        });
    }
    route(path: string, socket: ws.WebSocket) {
        switch (path) {
            case "/ocppClient":
                this._clientFeed.attachTo(socket);
                break;
            case "/transactions":
                this._transactionFeed.attachTo(socket);
                break;
            default:
                console.log("Undefined websocket requested");
                break;
        }
    }
}