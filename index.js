import express, { response } from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));


const app = express();
var port = 3000;
var bandname = '';

app.use(bodyParser.urlencoded({ extended: true }))

function band_name_generator(request, response, next) {
        console.log(request.body);
        bandname = request.body["name"] + request.body["pet"];
        next();
        }

app.use(band_name_generator);

app.get("/", (request, response) => {
    response.sendFile(__dirname + '/public/index.html');
});

app.post('/band', (request, response) => {
    response.send(`<h1> Your band name is : </h1> <h2> ${bandname} </h2>`);
});

app.listen(port, () => {
    console.log(`the server is running on port ${port}`);
});