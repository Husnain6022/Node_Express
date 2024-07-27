import express, { response } from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
var port = 3000;
var logging = false;

app.use(bodyParser.urlencoded({ extended: true }));

function password_checker(request, response, next){
    if (request.body['password'] === 'strivers'){
        logging = true
    };
    next();
}

app.use(password_checker);

app.post("/check", (request, response) => {
    if (logging) {
        response.sendFile(__dirname + "/public/secret.html");
    }
    else {
        response.sendFile(__dirname + "/public/secret.html");
    }
});

app.get("/", (request, response) => {
    response.sendFile(__dirname + '/public/index.html');
});

app.listen(port, ()=>{
    console.log(`The server is running on port ${port}.`);
});


//To see how the final website should work, run "node solution.js".
//Make sure you have installed all the dependencies with "npm i".
//The password is ILoveProgramming

