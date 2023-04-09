import { Express, Response} from "express";
import { Request } from "express-serve-static-core";

export default class ApiRouter{
    attachTo(app:Express){
        app.post("/ocppStation", async (req:Request, res:Response) => {
            res.end();
        });
    }
}