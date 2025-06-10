/*
Import modules
*/
import express from "express";
import session from "express-session";
import path from "path";
import { fileURLToPath } from "url";
import mysql from "mysql";
import { body, validationResult } from "express-validator";
import dateFormat from "dateformat";
import bcrypt from "bcrypt";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//* Importing Routers
import contactRouter from "./routes/contact.js";
import usersRouter from "./routes/users.js";

//* Importing Middlewares
//import errorHandler from "./middleware/errorHandler.js";

/*
Connect to server
*/
const server = app.listen(4000, function () {
  console.log("Start gambling on 4000... ! ");
});

/*
Configuration of EJS
*/
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

/*
Bootstrap
*/
app.use("/js", express.static(__dirname + "/node_modules/bootstrap/dist/js"));
app.use("/css", express.static(__dirname + "/node_modules/bootstrap/dist/css"));

/*
Middleware
*/
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/*
Connection on server MySQL
*/
const con = mysql.createConnection({
  host: "localhost",
  user: "scott",
  password: "oracle",
  database: "mybd",
  port: "3307",
});
con.connect(function (err) {
  if (err) throw err;
  console.log("connected!");
});

/*
ROUTES
*/
app.use("/contact", contactRouter);

app.get("/", function (req, res) {
  res.render("pages/welcome", {
    siteTitle: "Casino App",
    pageTitle: "Welcome Page",
  });
});


//! Instead of this use:
//* app.use("/auth", usersController);
app.get("/login", function (req, res) {
  res.render("pages/Login", {
    siteTitle: "Casino App",
    pageTitle: "Login",
  });
});

app.get("/registration", function (req, res) {
  res.render("pages/Registration", {
    siteTitle: "Casino App",
    pageTitle: "Registration",
  });
});

app.post("/register", async function (req, res) {
  const { username, email, password, confirmPassword } = req.body;


  const checkQuery = "SELECT * FROM users WHERE email = ? OR username = ?";
  con.query(checkQuery, [email, username], async function (err, result) {
    if (err) {
      console.error("Database check error:", err);

    }

    if (result.length > 0) {
      return res.status(400).json({ success: false, error: "Username or email already exists." });
    }

    try {
      const hashedPassword = await bcrypt.hash(password, 10);

      const insertQuery = "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";
      con.query(insertQuery, [username, email, hashedPassword], function (err, result) {
        console.log(" New user registered:", { username, email });
        res.redirect("/");


      });
    } catch (err) {
      console.error("Hashing error:", err);
    }
  });
});
