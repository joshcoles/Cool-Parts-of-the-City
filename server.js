"use strict"

const PORT = process.env.PORT || 8080;
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cookieSession = require("cookie-session");
const bcrypt = require("bcrypt");
const saltRounds = 10;

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

// // temp route for map development purposes for Behzad
// app.get("/renderMap", (req, res) => {
//   res.render("renderMap");
// });

// temp route for map development purposes for Behzad
app.get("/users/:username/create", (req, res) => {
  res.render("createNewMap");
});

// temp route for map development purposes for Behzad
app.post("/users/:username/create", (req, res) => {

  console.log('success on server');
  console.log(req.body);
  //res.send("success");
  let template = {
    center_x: req.body.mapCenterLat,
    center_y: req.body.mapCenterLng,
    user_id: null,
    zoom: req.body.mapZoom,
    region: 'a region',
    keyword: 'a keyword'
  };
  knex('maps').insert(template).asCallback(function (err, rows) {
    if (err) { console.log (err); throw err; }
  });

  knex('maps').select().asCallback(function (err, rows) {
    if (err) console.log(err);
    else console.log(rows);
  });


});

// // temp route for map development purposes for Behzad
// app.get("/users/:username/:mapid", (req, res) => {
//   res.render("editMap");
// });

// user registration
app.get("/register", (req, res) => {
  res.render("register");
});

app.post("/register", (req, res) => {
  const input = req.body;

  var unavailableUsername = "";
  if (knex.select('*').from('users').where('username' = req.body.username)) {
    unavailableUsername = req.body.username;
  }
  var unavailableEmail = "";
  if (knex.select('*').from('users').where('username' = req.body.email)) {
    unavailableEmail = req.body.email;
  }

  if (input.email === "" || input.username === "" || input.password === "") {
    res.status(400).send("You are missing some inputs man")
  } else if (unavailableUsername === input.username) {
    res.status(400).send("Username unavaileble")
  } else if (unavailableEmail === input.email) {
    res.status(400).send("Email unavailable")
  } else {
    let enteredUsername   = input.username;
    let enteredEmail      = input.email;
    let enteredPassword   = input.password;
    bcrypt.hash(enteredPassword, saltRounds, (err, hash) => {
      const newUser = {
        username: enteredUsername,
        email:    enteredEmail,
        password: hash
      };
      knex.insert(newUser).into('users').asCallback(function (err, rows) {
        if (err) { console.log (err); throw err; }
      });
    })
    res.redirect("/");
  }

});
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


// app.get("/users/:username/create", (req, res) => {
//   res.render('createNewMap');
//   //console.log(req.body);
// });

// app.post("/users/:username/create", (req, res) => {
//   console.log(req.body);
// });





//app.use("/users/behzad/create", coordinatesRoutes);



// const dataHelper = require("./lib/util/data-helpers.js")(req.body);
// dataHelper.saveMaps(req.);
// const coordinatesRoutes = require("./routes/coordinates.js")(dataHelper);



app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});

