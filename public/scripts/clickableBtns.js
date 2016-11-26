$(function () {
  // action for when compose is clicked
  let newMapBtn = $('.saveNewMapBtn');

  newMapBtn.on('click', function (event) {
    // conditionData(markerArr);

    console.log("SAVING MAP: ", markerArr);

    templateVars = {
      mapCentreLat: map.getCenter().lat(),
      mapCentreLng: map.getCenter().lng(),
      mapZoom: map.getZoom(),
      mapPoints: conditionNewMapData (markerArr)
    }

    $.ajax({
      type: 'POST',
      url: '/users/:username/create',
      data: templateVars,
      success: function () {
        console.log('SUCCESS');
      }
    });
  });

});

function conditionNewMapData (markerArr) {
  let requestPoints = [];
  markerArr.forEach((marker, index) => {
    requestPoints.push({
      lat: marker.getPosition().lat(),
      lng: marker.getPosition().lng(),
    });

    if (!marker.infoBox) {
      requestPoints[index].infoBox = {
        title: "yyy",
        description: "yyy",
        url: "yyy"
      }
    } else { requestPoints[index].infoBox = marker.infoBox; }
  });
  return requestPoints;
}
