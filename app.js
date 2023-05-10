const express = require('express');
const axios = require('axios');
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const ping = require('./routes/ping');

const PORT = 30000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/ping', ping);

// Load page
app.get("/", function (req, res) {
    res.status(200).send()
});


const options = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "Meagan Provencher - Vail Take Home",
        version: "0.1.0",
        description:
          "This is a simple API application made with Express and documented with Swagger",
        license: {
          name: "MIT",
          url: "https://spdx.org/licenses/MIT.html",
        },
        contact: {
          name: "Meagan Provencher",
          email: "meaganprovencher@gmail.com",
        },
      },
      servers: [
        {
          url: "http://localhost:30000",
        },
      ],
    },
    apis: ["./routes/*.js"],
  };
  
  const specs = swaggerJsdoc(options);
  app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(specs)
  );

app.listen(PORT, function () {
    console.log(`Server is running on localhost:${PORT}`);
});