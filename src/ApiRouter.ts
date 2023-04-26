import { Express, Response } from "express";
import { Request } from "express-serve-static-core";
import ocppStationPostControl from "./controllers/ocppStation.post";
import ocppStationGetControl from "./controllers/ocppStation.get";
import ocppStationDeleteControl from "./controllers/ocppStation.delete";
import ocppClientGetControl from "./controllers/ocppClient.get";
import ocppTransactionGetControl from "./controllers/ocppTransaction.get";

export default class ApiRouter {
    attachTo(app: Express) {
        app.get("/ocppClient", async (req: Request, res: Response) => {
            ocppClientGetControl(req, res);
        });
        app.get("/ocppStation", async (req: Request, res: Response) => {
            ocppStationGetControl(req, res);
        });
        app.get("/transaction", async (req: Request, res: Response) => {
            ocppTransactionGetControl(req, res);
        });
        app.post("/ocppStation", async (req: Request, res: Response) => {
            ocppStationPostControl(req, res);
        });
        app.delete("/ocppStation/:id", async (req: Request, res: Response) => {
            ocppStationDeleteControl(req, res);
        });
    }
}