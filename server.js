"use strict"

const PORT = process.env.PORT || 8080;
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cookieSession = require("cookie-session");
const dbSettings = require("./config/db");
const knex = require('knex')({
  client: 'pg',
  connection: dbSettings
});

app.use(bodyParser.urlencoded({
  extended:true
}));
app.use(cookieParser());
app.set('trust proxy', 1);
app.use(cookieSession({
  name: 'session',
  keys: ['secretkey1', 'secretkey2']
}));

app.set("view engine", "ejs");
app.use(express.static("public"));



// homepage
app.get("/", (req, res) => {
  console.log("Hello world");
  res.render("renderMap");
});

// temp route for map development purposes for Behzad

app.get("/renderMap", (req, res) => {
  res.render("renderMap");
});

// temp route for map development purposes for Behzad
app.get("/createNewMap", (req, res) => {
  res.render("createNewMap");
});

// temp route for map development purposes for Behzad
app.post("/users/:username/create", (req, res) => {

  console.log('success on server');
  console.log(req.body);
  res.send("success");


});

// user registration

// login & logout

// users page
app.get("/users", (req, res) => {

});

// user page
app.get("/users/:id", (req, res) => {

});

//
app.get("/users/:id/", (req, res) => {

});

// create new post

// edit post
app.post("/users/:id/:postid", (req, res) => {

});




const dataHelper = require("./lib/data-helper.js")();
const coordinatesRoutes = require("./routes/coordinates.js")(dataHelper);

app.use("/users/:username/create", coordinatesRoutes);







app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});

