"use strict"

const dbConfig = require("../../config/db");
const knex = require('knex')({
  client: 'pg',
  connection: dbConfig
});

module.exports = {

    saveMaps: function(mapData, callback) {
      knex('maps').insert(mapData.mapTemplate).returning('id').then((id) => {
        mapData.coordinatesData.forEach((coordinate) => {
          let coordinateTemplate = {
            lat: coordinate.lat,
            lng: coordinate.lng,
            map_id: parseInt(id),
            name: coordinate.infoBox.title,
            description: coordinate.infoBox.description,
            img_url: coordinate.infoBox.url
          };
          knex('coordinates').insert(coordinateTemplate).asCallback(function (err, rows) {
            if (err) throw err;
          });
        })
      }).asCallback(function (err, rows) {
      if (err) throw err;
      });
    },

    getMaps: function(reqData, callback) {
      let mapData = {};
      let coordinatesData = {};
      knex('maps').select('id', 'centre_x', 'centre_y', 'zoom', 'title').where(reqData)
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


