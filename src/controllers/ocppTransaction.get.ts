import { Response } from "express";
import { Request } from "express-serve-static-core";
import Ajv from "ajv";
import { FromSchema } from "json-schema-to-ts";
import { DbModelStations } from "../db/src/DbModelStations";
import { DbFullTransaction } from "../db/src/DbFullTransaction";

const OcppTransactionGetSchema = {
    type: "object",
    properties: {
        transactionId:{
            type: "string"
        }
    },
    required: [],
    additionalProperties: false,
} as const;

const validate = (new Ajv()).compile(OcppTransactionGetSchema);

type OcppTransactionGet = FromSchema<typeof OcppTransactionGetSchema>;

export default async function ocppTransactionGetControl(req: Request, res: Response){
    if(!validate(req.body)){
        res.status(400).end();
        return;
    }
    try{
        let response = await DbFullTransaction.readAll();
        res.end(JSON.stringify(response));
    }catch(err:any){
        res.status(400).end(err.sqlMessage);
    }
}