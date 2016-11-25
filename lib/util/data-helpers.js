"use strict"

const dbSettings = require("./config/db")
const knex = require('knex')({
  client: 'pg',
  connection: dbSettings
});

module.export = function makeDataHelpers() {
  return {

    saveMaps: function(newMaps, callback) {
      knex.insert(newMaps.mapsData).into('maps')
        .then(function(id) {
          const newMap_id = id;
        }).then(newMaps.coordinatesData.forEach((coordinate) => {
          knex.insert({
            map_id: newMap_iD,
            longitude: coordinate.lng,
            latitude: coordinate.lat
          }).into('coordinates')
            .then(function(id) {
              console.log(id);
            })
          })
        );
      },

    getCoordinates: function(callback) {
      knex.select('latitude', 'longitude')
        .from('coordinates')
        .where('map_id', '=', //map_id)
    }

  }
}