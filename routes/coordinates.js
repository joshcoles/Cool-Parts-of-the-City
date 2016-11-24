"use strict";

 const express      = require('express');
 const coordinatesRoutes      = express.Router();

 module.exports = function(dataHelpers) {

  coordinatesRoutes.get("", (req, res) => {
    dataHelpers.getCoordinates((err, coordinates) => {
      if(err) {
        res.status(500).json({ error: err.message });
      } else {
        res.json(coordinates);
      }
    });
  });

  coordinatesRoutes.post("", (req, res) => {
    if (!coordinate-data?) {
      res.status(400).json({ error: 'invalid request: no data in POST body'});
      return;
    }

    const coordinates = [{
        latitude: ???,
        longitude: ???,
        map_id: ???
      }]

    dataHelpers.saveCoordinates(coordinates, (err) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.status(201).send();
      }
    });
  });

  return coordinatesRoutes;

 }


