import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", async (request, response) => {
  try {
    const res = await axios.get("https://bored-api.appbrewery.com/random");
    const result = res.data;
    response.render("index.ejs", { data: result });
  } catch (error) {
    console.error("Failed to make request:", error.message);
    response.render("index.ejs", {
      error: error.message,
    });
  }
});

app.post("/", async (request, response) => {
  
  try{
      const type = request.body.type;
      const participants = request.body.participants;  
      const res = await axios.get(`https://bored-api.appbrewery.com/filter?type=${type}&participants=${participants}`);
      const result = res.data;
      const item = result[Math.floor(Math.random() * result.length)]
      response.render("index.ejs", {data: item})
     } catch (error){
    console.error("Failed to make request:", error.message);
    response.render("index.ejs", {error: error.message});
     }

});

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
