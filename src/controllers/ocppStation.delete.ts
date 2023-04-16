import { Response } from "express";
import { Request } from "express-serve-static-core";
import Ajv from "ajv";
import { FromSchema } from "json-schema-to-ts";
import { DbModelStations } from "../db/src/DbModelStations";

const OcppStationDeleteSchema = {
    type: "object",
    properties: {
        id:{
            type: "string"
        }
    },
    required: ["id"],
    additionalProperties: false,
} as const;

const validate = (new Ajv()).compile(OcppStationDeleteSchema);

type OcppStationDelete = FromSchema<typeof OcppStationDeleteSchema>;

export default async function ocppStationDeleteControl(req: Request, res: Response){
    if(!validate(req.params)){
        res.status(400).end();
        return;
    }
    let params:OcppStationDelete = req.params;
    try{
        let response = await DbModelStations.delete(parseInt(params.id));
        res.end(JSON.stringify({affectedRows:response}));
    }catch(err:any){
        res.status(400).end(err.sqlMessage);
    }
}