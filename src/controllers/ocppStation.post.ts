import { Express, Response } from "express";
import { Request } from "express-serve-static-core";
import Ajv from "ajv";
import { FromSchema } from "json-schema-to-ts";
import { DbModelStations, StationTemplate } from "../db/src/DbModelStations";

const OcppStationPostSchema = {
    type: "object",
    properties: {
        stationName: { type: "string" },
        ocppIdentity: { type: "string" },
    },
    required: ["stationName", "ocppIdentity"],
    additionalProperties: false,
} as const;

const validate = (new Ajv()).compile(OcppStationPostSchema);

type OcppStationPost = FromSchema<typeof OcppStationPostSchema>;

export default async function ocppStationPostControl(req: Request, res: Response){
    if(!validate(req.body)){
        res.status(400).end();
    }
    let body:OcppStationPost = req.body;
    let station:StationTemplate = {
        name: body.stationName,
        ocppIdentity: body.ocppIdentity
    }
    try{
        let response = await DbModelStations.add(station);
        res.end(JSON.stringify(response));
    }catch(err:any){
        res.status(400).end(err.sqlMessage);
    }
}