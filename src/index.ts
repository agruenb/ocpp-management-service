import ApiRouter from "./ApiRouter";
import express from "express";
import cors from "cors";
import WsRouter from "./WsRouter";

const app = express();
app.use(express.json());
app.use(cors())

const apiRouter = new ApiRouter();
apiRouter.attachTo(app);

const httpServer = app.listen(3002);
console.log("Management API at port 3002");

const wsRouter = new WsRouter();
wsRouter.attachTo(httpServer);

// Set up a headless websocket server that prints any
// events that come in.