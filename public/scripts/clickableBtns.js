$(function () {
  // action for when compose is clicked
  let newMapBtn = $('.mapDataChangeBtn');

  newMapBtn.on('click', function (event) {

    templateVars = {
      mapCentreLat: map.getCenter().lat(),
      mapCentreLng: map.getCenter().lng(),
      mapZoom: map.getZoom(),
      mapPoints: conditionMapData (markerArr)
    }

    $.ajax({
      type: 'POST',
      url: postRoute,
      data: templateVars,
      success: function () {
        console.log('SUCCESS');
      }
    });
  });

});

function conditionMapData (markerArr) {
  let requestMarkers = [];
  markerArr.forEach((marker, index) => {
    requestMarkers.push({
      lat: marker.getPosition().lat(),
      lng: marker.getPosition().lng(),
    });

    if (!marker.infoBox) {
      requestMarkers[index].infoBox = {
        title: "yyy",
        description: "yyy",
        url: "yyy"
      }
    } else { requestMarkers[index].infoBox = marker.infoBox; }
  });
  return requestMarkers;
}
