import ws from "ws";
import OcppClientFeed from "./websockets/OcppClientFeed";

export default class WsRouter {

    _wsServer;
    _clientFeed;

    constructor(){
        this._clientFeed = new OcppClientFeed();
        this._wsServer = new ws.Server({ noServer: true });
    }
    attachTo(httpServer: any) {
        httpServer.on('upgrade', (request: any, socket: any, head: any) => {
            this._wsServer.handleUpgrade(request, socket, head, socket => {
                this._clientFeed.attachTo(socket);
                //socket.send(JSON.stringify([{"id":1,"ocppIdentity":"OCPP_2323_2322","stationName":"Front Porch","status":"Available"}]));
            });
        });
    }

}