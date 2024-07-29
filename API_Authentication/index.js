import express from "express";
import axios from "axios";

const app = express();
const port = 3000;
const API_URL = "https://secrets-api.appbrewery.com";

//TODO 1: Fill in your values for the 3 types of auth.
const yourUsername = "strive";
const yourPassword = "1234578";
const yourAPIKey = "4d57f13a-def6-4ba6-a3fd-3123b068869e";
const yourBearerToken = "a7e27b99-e3aa-4293-8a8c-affbcb6ff2a2";

app.get("/", (req, res) => {
  res.render("index.ejs", { content: "API Response." });
});

app.get("/noAuth", async(req, res) => {
  try{
    const response = await axios.get(API_URL + '/random')
    res.render("index.ejs", {content: JSON.stringify(response.data)})
  } catch (error){
    res.status(404).send(error.message)
  }
});

app.get("/basicAuth", async(req, res) => {
  try{
  const response = await axios.get(API_URL + '/all?page=2', {
    auth: {
      username: yourUsername,
      password: yourPassword,
    },
  });
    
    res.render("index.ejs", {content: JSON.stringify(response.data)})
  } catch (error) {
    res.status(404).send(error.message)
  }
});

app.get("/apiKey", async(req, res) => {
  try{
    const response = await axios.get(API_URL + "/filter?score=5", {
      params: {
        apiKey: yourAPIKey,
      },
    })
    res.render("index.ejs", {content: JSON.stringify(response.data)})
  } catch (error) {
    res.status(404).send(error.message)
  }
});

app.get("/bearerToken", async(req, res) => {
  try{
    const response = await axios.get(API_URL + "/secrets/3", {
      headers: {
        Authorization : `Bearer ${yourBearerToken}`,
      },
    })
    res.render("index.ejs", {content: JSON.stringify(response.data)})
  } catch (error) {
    res.status(404).send(error.message)
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
