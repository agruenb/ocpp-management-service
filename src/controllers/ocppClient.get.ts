import { Response } from "express";
import { Request } from "express-serve-static-core";
import Ajv from "ajv";
import { FromSchema } from "json-schema-to-ts";

const OcppClientGetSchema = {
    type: "object",
    properties: {
    },
    required: [],
    additionalProperties: false,
} as const;

const validate = (new Ajv()).compile(OcppClientGetSchema);

type OcppClientGet = FromSchema<typeof OcppClientGetSchema>;

export default async function ocppClientGetControl(req: Request, res: Response) {
    if (!validate(req.body)) {
        res.status(400).end();
        return;
    }
    let response = await fetch(`${process.env.OCPP_CLIENT_SERVICE_URI}:${process.env.OCPP_CLIENT_SERVICE_PORT}/ocppClientInfo`)
        .then(
            (resp: any) => {
                return resp.text()
            }
        ).then(
            (text: any) => {
                return text;
            }
        ).catch(
            (err: any) => {
                res.status(400).end(err);
            }
        );
    res.end(response)
}