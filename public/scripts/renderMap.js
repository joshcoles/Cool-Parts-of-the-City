// var createMap = require('./createMap');
// var insertPointsOnMap = require ('./insertPointsOnMap');

function renderMap(){
  let data = JSON.parse(window.data);
  console.log("AFTER: ", data);
  var map = drawMap(data.mapData.center_x,
                data.mapData.center_y,
                data.mapData.zoom,
                data.pointsData);
  //marker = insertPointsOnMap(map, 49.2812,-123.1105);
}