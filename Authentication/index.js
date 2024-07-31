import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

// Database connection configuration
const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "Enter your db name",
  password: "Enter your postrgress database password",
  port: 5432
});

// Connect to the database
db.connect();

// Middleware for parsing URL-encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));
// Middleware for serving static files
app.use(express.static("public"));

// Route to render home page
app.get("/", (req, res) => {
  res.render("home.ejs");
});

// Route to render login page
app.get("/login", (req, res) => {
  res.render("login.ejs");
});

// Route to render register page
app.get("/register", (req, res) => {
  res.render("register.ejs");
});

// Route to handle registration
app.post("/register", async (req, res) => {
  const email = req.body.username;
  const password = req.body.password;

  try {
    // Check if the email already exists
    const result = await db.query("SELECT * FROM secrets WHERE email = $1", [email]);
    if (result.rows.length > 0) {
      res.render("register.ejs", {error: "Email already exists, try another"});
    } else {
      // Insert new user into the database
      const insertResult = await db.query("INSERT INTO secrets (email, password) VALUES ($1, $2)", [email, password]);
      console.log(insertResult);
      res.render("Secrets.ejs");
    }
  } catch (err) {
    console.error(`Here is the error: ${err}`);
  }
});

// Route to handle login
app.post("/login", async (req, res) => {
  const email = req.body.username;
  const password = req.body.password;

  try {
    // Check if the email exists in the database
    const result = await db.query("SELECT * FROM secrets WHERE email = $1", [email]);
    if (result.rows.length > 0) {
      const userPassword = result.rows[0].password;
      if (userPassword === password) {
        res.render("Secrets.ejs");
      } else {
        res.render("login.ejs", {error: "Please enter correct password"});
      }
    } else {
      res.render("login.ejs", {error: "Please enter correct Email/Passowrd"});
    }
  } catch (error) {
    console.error(`Here is the error: ${error}`);
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
