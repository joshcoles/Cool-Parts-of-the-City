"use strict"

const dbSettings = require("./config/db")
const knex = require('knex')({
  client: 'pg',
  connection: dbSettings
});

module.export = function makeDataHelpers() {
  return {

    saveCoordinates: function (newCoordinates, callback) {
      knex.insert(newCoordinates).into('coordinates').
      then(function(id) {
        console.log(id);
      });
    },

    getCoordinates: function () {
      knex.select('latitude', 'longitude')
        .from('coordinates')
        .where('map_id', '=', //map_id)
    }

  }
}