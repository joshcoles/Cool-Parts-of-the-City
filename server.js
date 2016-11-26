"use strict"

const PORT            = process.env.PORT || 8080;
const express         = require("express");
const app             = express();
const bodyParser      = require("body-parser");
const session         = require("express-session");
const bcrypt          = require("bcrypt");
const saltRounds      = 10;
const dbConfig        = require("./config/db");
const knex            = require('knex')({ client: 'pg', connection: dbConfig });
const dataHelpers     = require("./lib/util/data-helpers");   // saveMaps & getMaps

app.set("view engine", "ejs");
app.set('trust proxy', 1);

app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}));
// This middleware prints details about each http request to the console. It works, but it also
// prints one for every script request made, which for us means about 6 or 7. If we can find a way
// to blacklist those scripts, we should implement it.
// ===============================
// var morgan = require('morgan')
// app.use(morgan('combined'))
// ===============================

//=============== Middleware ====================

app.use((req, res, next) => {
  res.locals.current_user = null;
  if (req.session.username) {
    knex.select('*').from('users').where('username', req.session.username).asCallback(function(err, rows) {
      if (err) {
        console.log(err);
        next();
      }
      if (rows.length) {
        res.locals.current_user = rows[0];
      }
      next();
    })
  } else {
    next();
  }
})


// User authentication middleware. Working, but we don't have a way to activate logged_in yet.

// const WHITELISTED_PAGES = ["/", "/register"]

// app.use(function(req, res, next) {
//   console.log("Authorizing...");
//   console.log("My req.url: " + req.url);
//   if(!WHITELISTED_PAGES.includes(req.url)) {
//     const logged_in = req.session.user_id
//     if(!logged_in) {
//       res.redirect("/")
//     }
//   }
//     console.log("I'm working!");
//     next();
// });







// homepage
app.get("/", (req, res) => {
  res.render("login");

});

// temp route for map development purposes for Behzad
app.get("/renderMap", (req, res) => {
  let mapData = {};
  let pointsData = {};
  knex('maps').select('id', 'centre_x', 'centre_y', 'zoom', 'keyword').where('id', 66)

    .asCallback(function (err, rows) {
    if (err) throw err;
    mapData = rows[0];
    knex('coordinates').where('map_id', rows[0].id)
    .asCallback(function (err, rows) {
      if (err) throw err;
      pointsData = rows;
      let dataTemplate = {
          mapData: mapData,
          pointsData: pointsData
      };
      dataTemplate = JSON.stringify(dataTemplate);
      res.render('renderMap', {data: dataTemplate});
    });
  });

});

// temp reoute for development purposes for Behzad
app.get("/listMaps", (req, res) => {
  knex('maps').select('id', 'keyword').asCallback((err, rows) => {
    if (err) throw err;
    //console.log(rows);
    res.render("listMaps", {data: rows});
  });

});

app.get("/users/:username/create", (req, res) => {
  res.render("createNewMap");
});


app.post("/users/:username/create", (req, res) => {

  console.log('success on server');
  let mapTemplate = {
    centre_x: req.body.mapCentreLat,
    centre_y: req.body.mapCentreLng,
    user_id: null,
    zoom: req.body.mapZoom,
    region: 'a region',
    keyword: 'a keyword'
  };

  let mapPoints = req.body.mapPoints;

  knex('maps').insert(mapTemplate).returning('id')
    .then((id) => {
      mapPoints.forEach((point) => {
        let pointTemplate = {
          lng: point.lng,
          lat: point.lat,
          map_id: parseInt(id),
          name: 'a name',
          description: 'a description',
          img_url: 'the url'
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


//         +---------------------+
//         |  user registration  |
//         +---------------------+

app.get("/register", (req, res) => {
  res.render("register");
});

app.post("/register", (req, res) => {
  const input = req.body;

  if (input.email === "" || input.username === "" || input.password === "") {
    res.status(400).send("You are missing some inputs man")
  } else {

    knex.select('*').from('users').where('username', input.username).asCallback(function (err, rows) {
      if (err) throw err;
      if (rows.length !== 0) {
        res.status(400).send("Username unavaileble")
      } else {
        knex.select('*').from('users').where('email', input.email).asCallback(function (err, rows) {
          if (err) throw err;
          if (rows.length !== 0) {
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
              console.log("newUser data:", newUser);
              knex.insert(newUser).into('users').asCallback(function (err, rows) {
                if (err) { console.log (err); throw err; }
              });
            })
            res.redirect("/");
          }
        });
      }
    });
  }
});


//         +------------------+
//         |  login & logout  |
//         +------------------+

app.get("/", (req, res) => {
  res.render("login");
});

app.post("/", (req, res) => {
  const input = req.body
  var usernameFound    = "";
  var passwordFound    = "";

  knex.select('*').from('users').where('username', input.username).asCallback(function (err, rows) {
    if (err) throw err;
    if (rows.length !== 0) {
      usernameFound = rows[0].username;
      passwordFound = rows[0].password;
      if (input.username === usernameFound) {
        console.log("email found in the db");
        bcrypt.compare(input.password, passwordFound, (err, passwordMatch) => {
          if (passwordMatch) {
            req.session.username = input.username;
            res.redirect(`/users/${input.username}`);
            return;
          } else {
            console.log("wrong password");
            res.status(401).send("Invalid username or password");
            return;
          }
        })
      } else {
        console.log("username not found");
        res.status(401).send("Invalid username or password");
        return;
      }
    }
  });
});

app.post("/logout", (req, res) => {
  req.session.username = undefined;
});


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

// edit post
app.post("/users/:id/:postid", (req, res) => {

});


app.post("/markers", (req, res) => {
  // Create.marker(res.body)

  res.send({sent: 'from server'});
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

