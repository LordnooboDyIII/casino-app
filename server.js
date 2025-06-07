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
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
app.use(express.static(path.join(__dirname, "public")));

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
app.get("/", function (req, res) {
  con.query(
    "SELECT * FROM e_events ORDER BY e_start_date DESC",
    function (err, result) {
      if (err) throw err;
      res.render("pages/index", {
        siteTitle: "Casino App",
        pageTitle: "Welcome Page",
        items: result,
      });
    }
  );
});

app.get("/contact", function (req, res) {
  con.query(
    "SELECT * FROM e_events ORDER BY e_start_date DESC",
    function (err, result) {
      if (err) throw err;
      res.render("pages/Contact", {
        siteTitle: "Casino App",
        pageTitle: "Contact Page",
        items: result,
      });
    }
  );
});
