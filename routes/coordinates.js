"use strict";

 const express      = require('express');
 const coordinatesRoutes      = express.Router();

 module.exports = function(dataHelpers) {

  coordinatesRoutes.get("/users/:username", (req, res) => {

    let reqData = `username = ${req.params.username}`



    dataHelpers.getCoordinates(reqData, (err, coordinates) => {
      if(err) {
        res.status(500).json({ error: err.message });
      } else {
        res.json(coordinates);
      }
    });
  });


  coordinatesRoutes.post("/users/:username/create", (req, res) => {
    if (!req.body) {
      res.status(400).json({ error: 'invalid request: no data in POST body'});
      return;
    }

    let mapData = {
      mapTemplate: [{
        center_x: req.body.mapCenterLng,
        center_y: req.body.mapCenterLat,
        zoom: req.body.mapZoom
      }],
      coordinatesData: req.body.mapPoints
    }

    dataHelpers.saveMaps(mapData, (err) => {
      if (err) {
        res.status(500).json({ err: err.message });
      } else {
        res.status(201).send();
      }
    })

  });

  return coordinatesRoutes;

 }


