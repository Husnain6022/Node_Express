import express, { response } from "express";


const app = express();
const port = 3000;

app.get("/", (request, response) => {
    const x = new Date();
    const today = x.getDay();

    let day = 'weekday';
    let advice = "it's time to work hard";

    if ( today === 0 || today === 6) {
        day = "Weekend";
        advice = "it's to enjoy the weekend, Hurraaha !!! "
    }

    response.render("index.ejs", {
        day: day,
        advice: advice
    })
})


app.listen(port, () => {
    console.log(`The server is listening at ${port}`)
})

