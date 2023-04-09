import { Express, Response } from "express";
import { Request } from "express-serve-static-core";
import ocppStationPostControl from "./controllers/ocppStation.post";

export default class ApiRouter {
    attachTo(app: Express) {
        app.post("/ocppStation", async (req: Request, res: Response) => {
            ocppStationPostControl(req, res);
        });
    }
}