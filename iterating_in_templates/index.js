import express from "express";

const app = express();
const port = 3000;

app.get("/", (request, response) => {
  const data = {
    title : "EJS tags",
    seconds : new Date().getSeconds(),
    fruits : ["apple", "banana", "cherry"],
    htmlContent : "<em> This is an em element </em>"
  };

  console.log(data)
  response.render("index.ejs", data);
})


app.listen(port, () => {
  console.log(`The server is running on port: ${port}`);
})