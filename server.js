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


var x = [];

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

// temp route for map development purposes for Behzad
app.get("/renderMap", (req, res) => {
  let templateVars;
  knex('maps').select('id', 'center_x', 'center_y', 'zoom', 'keyword').where('id', 25).asCallback(function (err, rows) {
    if (err) throw err;
    //let temp = [{lat: 12, lng: 12}, {lat: 13, lng: 13}];
    let temp = rows;
    temp.forEach((item) => {
      JSON.stringify(item);
    });
    console.log(temp);
    JSON.stringify(temp);
    //temp = temp.toString();
    //console.log(temp);
    console.log(temp);

    templateVars = {
      mapCenterLat: rows[0].center_x,
      mapCenterLng: rows[0].center_y,
      mapZoom: rows[0].zoom,
      mapPoints: 1
    };

    res.render('renderMap', templateVars);
  });

});


app.get("/users/:username/create", (req, res) => {
  res.render("createNewMap");
});


app.post("/users/:username/create", (req, res) => {
  console.log('success on server');
  let mapTemplate = {
    center_x: req.body.mapCenterLat,
    center_y: req.body.mapCenterLng,
    user_id: null,
    zoom: req.body.mapZoom,
    region: 'a region',
    keyword: 'a keyword'
  };

  let mapPoints = req.body.mapPoints;

  knex('maps').insert(mapTemplate).returning('id')
    .then( (id) => {
      mapPoints.forEach((item) => {
        let pointTemplate = {
          longitude: item.lng,
          latitude: item.lat,
          map_id: parseInt(id)
        };
        knex('coordinates').insert(pointTemplate).asCallback(function (err, rows) {
          if (err) throw err;
        });
      });
    })
    .asCallback(function (err, rows) {
      if (err) throw err;
    });

});

// user registration

// login & logout

// users page
app.get("/users", (req, res) => {

});

// user page
app.get("/users/:id", (req, res) => {
  res.render("user-homepage")

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




function emptyDataTables (dataTable) {
  knex(dataTable).del().asCallback(function (err, rows) {
    if (err) throw err;
    knex(dataTable).select().asCallback(function (err, rows) {
      if (err) throw err;
      else console.log(rows);
    });
  });
}

