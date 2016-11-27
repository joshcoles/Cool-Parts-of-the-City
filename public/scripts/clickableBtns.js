$(function () {
  // action for when compose is clicked
  let newMapBtn = $('.mapDataChangeBtn');
  let mapTitleInput = $('#mapTitleInput');



  newMapBtn.on('click', function (event) {
    let requestMarkers = conditionMapData(markerArr).outArr;
    let goodData = conditionMapData(markerArr).outBool;
    if (markerArr.length > 0 && goodData) {
      templateVars = {
        mapTitle: mapTitleInput.val(),
        mapCentreLat: map.getCenter().lat(),
        mapCentreLng: map.getCenter().lng(),
        mapZoom: map.getZoom(),
        mapPoints: requestMarkers
      }

      $.ajax({
        type: 'POST',
        url: postRoute,
        data: templateVars,
        success: function () {
          console.log('SUCCESS');
        }
      });
    } else alert ("Please fill in the map title and info-box info for each point");
  });

});

function conditionMapData (markerArr) {
  let requestMarkers = [];
  let outBool = true;
  markerArr.forEach((marker, index) => {
    requestMarkers.push({
      lat: marker.getPosition().lat(),
      lng: marker.getPosition().lng(),
    });

    if (!marker.infoBox) {
      outBool = false;
    } else if (marker.infoBox.title === "" || marker.infoBox.description === "" || marker.infoBox.url === "") {
      outBool = false;
    } else { requestMarkers[index].infoBox = marker.infoBox; }
  });
  return {outBool: outBool, outArr: requestMarkers}
}


// requestMarkers[index].infoBox = {
//           title: "yyy",
//           description: "yyy",
//           url: "yyy"
//         }
