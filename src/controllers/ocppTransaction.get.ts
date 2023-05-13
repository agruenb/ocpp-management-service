import { Response } from "express";
import { Request } from "express-serve-static-core";
import Ajv from "ajv";
import { FromSchema } from "json-schema-to-ts";
import { DbModelTransaction } from "../db/src/DbModelTransactions";

const OcppTransactionGetSchema = {
    type: "object",
    properties: {
        transactionId:{
            type: "string"
        },
        unfinished:{
            type: "string"
        }
    },
    required: [],
    additionalProperties: false,
} as const;

const validate = (new Ajv()).compile(OcppTransactionGetSchema);

type OcppTransactionGet = FromSchema<typeof OcppTransactionGetSchema>;

export default async function ocppTransactionGetControl(req: Request, res: Response){
    if(!validate(req.query)){
        console.log(req.query);
        res.status(400).end();
        return;
    }
    try{
        if(req.query.unfinished){
            let response = await DbModelTransaction.readUnfinished();
            res.end(JSON.stringify(response));
            return;
        }
        let response = await DbModelTransaction.readAll();
        res.end(JSON.stringify(response));
    }catch(err:any){
        res.status(400).end(err.sqlMessage);
    }
}