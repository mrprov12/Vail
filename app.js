const express = require('express');
const axios = require('axios');

const packageJson = require('./package.json');

const PORT = 30000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Load page
app.get("/", function (req, res) {
    res.status(200).send()
});

app.post("/ping", function (req, res) {
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
    });

});

app.listen(PORT, function () {
    console.log(`Server is running on localhost:${PORT}`);
});