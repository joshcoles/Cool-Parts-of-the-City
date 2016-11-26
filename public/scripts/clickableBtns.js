$(function () {
  // action for when compose is clicked
  let newMapBtn = $('.saveNewMapBtn');

  newMapBtn.on('click', function (event) {
    conditionData(pointsArr);

    console.log("SAVING MAP: ", pointsArr);

    templateVars = {
      mapCentreLat: map.getCenter().lat(),
      mapCentreLng: map.getCenter().lng(),
      mapZoom: map.getZoom(),
      mapPoints: pointsArr
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

function conditionData (pointsArr) {
  pointsArr.forEach((marker) => {
    //console.log("BEFORE", marker);
    if (!marker.infoBox) {
      //console.log('WATASD');
      marker.infoBox = {
        title: "yyy",
        description: "yyy",
        url: "yyy"
      }

    }
    delete marker.mkr;
    //delete marker['__proto__'];
      // marker.infoBox.title = "No title";
      // marker.infoBox.description = "No descript.";
      // marker.infoBox.url = "No url";
      //console.log("AFTER", marker);
  });
}
