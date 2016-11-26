"use strict"

const dbConfig = require("../../config/db")
const knex = require('knex')({
  client: 'pg',
  connection: dbConfig
});

module.exports = function makeDataHelpers() {

  return {

    saveMaps: function(mapData, callback) {
      knex('maps').insert(mapData.mapTemplate).returning('id').then((id) => {
        mapData.coordinatesData.forEach((coordinate) => {
          let coordinateTemplate = {
            lng: lng,
            lat: lat,
            map_id: parseInt(id),
            name: name,
            description: description,
            img_url: img_url
          };
          knex('coordinates').insert(coordinateTemplate).asCallback(function (err, rows) {
            if (err) throw err;
          });
        })
      })
    },

    getCoordinates: function(reqData, callback) {
      let mapData;
      let coordinatesData;
      knex('maps').select('id', 'centre_x', 'centre_y', 'zoom', 'keyword').where(reqData)
      .asCallback(function (err, rows) {
        if (err) throw err;
        mapData = rows[0];
        knex('coordinates').where('map_id', rows[0].id)
        .asCallback(function (err, rows) {
          if (err) throw err;
          coordinatesData = rows;
          let dataTemplate = {
            mapTemplate: mapData,
            coordinatesTemplate: coordinatesData
          };
          dataTemplate = JSON.stringify(dataTemplate);
          res.render('renderMap', { data: dataTemplate });
        });
      });
    }

  }

}