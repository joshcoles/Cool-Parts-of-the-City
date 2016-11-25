"use strict"

const dbSettings = require("./config/db")
const knex = require('knex')({
  client: 'pg',
  connection: dbSettings
});

module.exports = function makeDataHelpers() {

  return {

    saveMaps: function(newMaps, callback) {
      knex.insert(newMaps.mapsData).into('maps')
      .then(function(id) {
        newMaps.coordinatesData.forEach((coordinate) => {
          knex.insert([{
            map_id: id,
            longitude: coordinate.lng,
            latitude: coordinate.lat
          }])
          .into('coordinates')
        })
      })
    },

    getCoordinates: function(callback) {
      knex.select('latitude', 'longitude')
        .from('coordinates')

        .where('map_id', '=', map_id)

    }

  }
}