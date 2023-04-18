import { Response } from "express";
import { Request } from "express-serve-static-core";
import Ajv from "ajv";
import { FromSchema } from "json-schema-to-ts";
import { DbModelStations } from "../db/src/DbModelStations";

const OcppStationGetSchema = {
    type: "object",
    properties: {
        ocppId:{
            type: "string"
        }
    },
    required: [],
    additionalProperties: false,
} as const;

const validate = (new Ajv()).compile(OcppStationGetSchema);

type OcppStationGet = FromSchema<typeof OcppStationGetSchema>;

export default async function ocppStationGetControl(req: Request, res: Response){
    if(!validate(req.body)){
        res.status(400).end();
        return;
    }
    try{
        let response = await DbModelStations.readAll();
        res.end(JSON.stringify(response));
    }catch(err:any){
        res.status(400).end(err.sqlMessage);
    }
}