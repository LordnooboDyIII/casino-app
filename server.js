/*
//* Import modules
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
import indexRouter from "./routes/index.js";
import dicesRouter from "./routes/dices.js";


//* Importing Middlewares
//import errorHandler from "./middleware/errorHandler.js";

/*
//* Connect to server
*/
const server = app.listen(4000, function () {
  console.log("Start gambling on 4000... ! ");
});

/*
//* Configuration of EJS
*/
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

/*
//* Bootstrap
*/
app.use("/js", express.static(__dirname + "/node_modules/bootstrap/dist/js"));
app.use("/css", express.static(__dirname + "/node_modules/bootstrap/dist/css"));

/*
//* Middleware
*/
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
  session({
    secret: "your_secret_key", // Change this secret key to something random and secure
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // Set to true if using HTTPS
  })
);


/*
//* Connection on server MySQL
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
//* ROUTES
*/
app.use("/contact", contactRouter);
app.use("/", indexRouter);


app.use("/games/dices", dicesRouter);
app.use("/", usersRouter);

//! Instead of this use:
//app.use("/auth", usersRouter);


