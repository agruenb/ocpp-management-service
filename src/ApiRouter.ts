import { Express, Response } from "express";
import { Request } from "express-serve-static-core";
import ocppStationPostControl from "./controllers/ocppStation.post";
import ocppStationGetControl from "./controllers/ocppStation.get";

export default class ApiRouter {
    attachTo(app: Express) {
        app.get("/ocppStation", async (req: Request, res: Response) => {
            ocppStationGetControl(req, res);
        });
        app.post("/ocppStation", async (req: Request, res: Response) => {
            ocppStationPostControl(req, res);
        });
    }
}