/**
 * @swagger
 * tags:
 *     name: Postman Echo
 *     description: Manages Postman Echo Responses
 * 
 * /ping:
 *     post:
 *        summary: Send a message to the Postman Echo service and return a response with metadata.
 *        requestBody:
 *            required: true
 *            content:
 *               application/json:
 *                   schema:
 *                       $ref: '#/components/schemas/PingRequestBody'
 *        responses:
 *            '200':
 *                description: OK. Returns a response with the message sent to Postman Echo service, timestamp, environment and version.
 *                content:
 *                    application/json:
 *                        schema:
 *                            $ref: '#/components/schemas/PingResponse'
 *            '404':
 *                $ref: '#/components/responses/NotFound'
 * 
 * components:
 *   schemas:
 *     PingRequestBody:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           description: The message to send to the Postman Echo service.
 *       required:
 *         - message
 *     PingResponse:
 *       type: object
 *       properties:
 *         echo:
 *           type: object
 *           description: The response from the Postman Echo service.
 *         timestamp:
 *           type: integer
 *           format: int64
 *           description: The timestamp of the response in Unix epoch time.
 *         env:
 *           type: string
 *           description: The current environment in which the application is running.
 *         version:
 *           type: string
 *           description: The version of the application.
 *   responses:
 *     NotFound:
 *       description: Not Found. Indicates that the Postman Echo service could not be reached.
 */

import express from 'express';
import axios, { AxiosResponse } from 'axios';

import packageJson from '../package.json';

const ping = express.Router();

export interface PingResponse {
    echo: any;
    timestamp: number;
    env: string | undefined;
    version: string;
  }

ping.post("/", function (req: express.Request, res: express.Response) {
    const { message }: { message: string } = req.body;

    axios.get(`https://postman-echo.com/get?message=${message}`)
    .then((response: AxiosResponse<PingResponse>) => {
        const result: PingResponse = {
            echo: response.data,
            timestamp: Date.now(),
            env: process.env.NODE_ENV,
            version: packageJson.version,
        };
        res.status(200).send(result);
    }).catch((err: Error) => {
        res.status(404).send(err.message)
    });

});

export default ping;