import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import bcrypt from "bcrypt";

const app = express();
const port = 3000;
const saltRounds = 10;

// Configure the PostgreSQL client
const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "Enter Your DB name", // Replace with your database name
  password: "Enter Your own Db password here", // Replace with your database password
  port: 5432,
});

// Connect to the database
db.connect();

// Middleware to parse URL-encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the "public" directory
app.use(express.static("public"));

// Route to render the home page
app.get("/", (req, res) => {
  res.render("home.ejs");
});

// Route to render the login page
app.get("/login", (req, res) => {
  res.render("login.ejs");
});

// Route to render the registration page
app.get("/register", (req, res) => {
  res.render("register.ejs");
});

// Route to handle registration
app.post("/register", async (req, res) => {
  const email = req.body.username;
  const password = req.body.password;

  try {
    // Check if the email already exists in the database
    const checkResult = await db.query("SELECT * FROM secrets WHERE email = $1", [email]);

    if (checkResult.rows.length > 0) {
      res.send("Email already exists. Try logging in.");
    } else {
      // Hash the password before storing it in the database
      bcrypt.hash(password, saltRounds, async (error, hash) => {
        if (error) {
          res.send(`Error in password hashing: ${error}`);
        } else {
          // Insert the new user into the database
          const result = await db.query("INSERT INTO secrets (email, password) VALUES ($1, $2)", [email, hash]);
          console.log(result);
          res.render("secrets.ejs");
        }
      });
    }
  } catch (err) {
    console.error(`Database error: ${err}`);
    res.status(500).send('Internal server error');
  }
});

// Route to handle login
app.post("/login", async (req, res) => {
  const email = req.body.username;
  const password = req.body.password;

  try {
    // Retrieve the user from the database
    const result = await db.query("SELECT * FROM secrets WHERE email = $1", [email]);

    if (result.rows.length > 0) {
      const user = result.rows[0];
      const storedPassword = user.password;

      // Compare the provided password with the stored hashed password
      bcrypt.compare(password, storedPassword, (error, isMatch) => {
        if (error) {
          res.send(`Error in password comparison: ${error}`);
        } else {
          if (isMatch) {
            res.render("secrets.ejs");
          } else {
            res.send('Incorrect password. Please try again.');
          }
        }
      });
    } else {
      res.send("User not found. Please register.");
    }
  } catch (err) {
    console.error(`Database error: ${err}`);
    res.status(500).send('Internal server error');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
