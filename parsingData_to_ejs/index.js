import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (request, response) => {
  response.render("index.ejs");
});

app.post("/submit", (request, response) => {
  
  var nameLength = request.body['fName'].length + request.body['lName'].length; 
  response.render("index.ejs", {length : nameLength})
  
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
