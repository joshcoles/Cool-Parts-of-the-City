"use strict"

const PORT = process.env.PORT || 8080;
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cookieSession = require("cookie-session");
const knex = require('knex')({
  client: 'pg',
  connection: {
    host : settings.hostname,
    user : settings.user,
    password : settings.password,
    database : settings.database,
    ssl: true
  }
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
  res.render("login");
});

// user registration

// login & logout

// users page
app.get("/users", (req, res) => {

})

// user page
app.get("/users/:id", (req, res) => {

})

//
app.get("/users/:id/", (req, res) => {

})

// create new post

// edit post
app.post("/users/:id/:postid", (req, res) => {

})

//

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
})

