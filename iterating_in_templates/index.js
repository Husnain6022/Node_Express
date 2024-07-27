import express, { response } from "express";

const app = express();
const port = 3000;

app.get("/", (request, response) => {
  const data = {
    title : "EJS tags",
    seconds : new Date().getSeconds(),
    fruits : ["apple", "banana", "cherry"],
    htmlContent : "<em> This is an em element </em>"
  }

  response.render("index.ejs", { items : data })
})


app.listen(port, () => {
  console.log(`The server is running on posr: ${port}`);
})