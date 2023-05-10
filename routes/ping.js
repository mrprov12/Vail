/**
 * @swagger
 * tags:
 *     name: Postman Echo
 *     description: Manages Postman Echo Responses
 * /ping:
 *     post:
 *        summary: Send a message to the Postman Echo service and return a response with metadata.
 *        requestBody:
 *            required: true
 *            content:
 *               application/json:
 *                   schema:
 *                   type: object
 *                   properties:
 *                       message:
 *                       type: string
 *                       description: The message to send to the Postman Echo service.
 *                   required:
 *                       - message
 *        responses:
 *            '200':
 *                description: OK. Returns a response with the message sent to Postman Echo service, timestamp, environment and version.
 *                content:
 *                    application/json:
 *                    schema:
 *                        type: object
 *                        properties:
 *                        echo:
 *                            type: object
 *                            description: The response from the Postman Echo service.
 *                        timestamp:
 *                            type: integer
 *                            format: int64
 *                            description: The timestamp of the response in Unix epoch time.
 *                        env:
 *                            type: string
 *                            description: The current environment in which the application is running.
 *                        version:
 *                            type: string
 *                            description: The version of the application.
 *            '404':
 *              description: Not Found. Indicates that the Postman Echo service could not be reached.
 */

const express = require('express');
const axios = require('axios');

const packageJson = require('../package.json');

const ping = express.Router();

ping.post("/", function (req, res) {
    const { message } = req.body;

    axios.get(`https://postman-echo.com/get?message=${message}`)
    .then((response) => {
        console.log(process.env.NODE_ENV)
        res.status(200).send({
            echo: response.data,
            timestamp: Date.now(),
            env: process.env.NODE_ENV,
            version: packageJson.version,
        });
    }).catch((err) => {
        res.status(404).send(err.message)
    });

});

module.exports = ping;