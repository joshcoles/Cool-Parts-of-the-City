$(function () {
  // action for when compose is clicked
  let changeMapDataBtn = $('.mapDataChangeBtn');
  let mapTitleInput = $('#mapTitleInput');
  let editThisMapBtn = $('#editThisMapBtn');
  let deleteMapBtn = $('#deleteMapBtn');

  changeMapDataBtn.on('click', function (event) {
    let requestMarkers = conditionMapData(markerArr).outArr;
    let goodData = conditionMapData(markerArr).outBool;
    let $message = $('.map-save-success');

    if (mapTitleInput.val() !== "" && action === 'editMap' && markerArr.length > 0) {
      templateVars = {
        mapTitle: mapTitleInput.val(),
        mapCentreLat: map.getCenter().lat(),
        mapCentreLng: map.getCenter().lng(),
        mapZoom: map.getZoom(),
        mapPoints: requestMarkers
      }

      $message.css({"display": "none"});
      $message.fadeIn(400).delay(2000).fadeOut(400);

      $.ajax({
        type: 'POST',
        url: postRoute,
        data: templateVars,
        success: function () {
          console.log('SUCCESS');
        }
      });

    } else if (mapTitleInput.val() !== "" && action === 'newMap' && markerArr.length > 0 && goodData) {
      templateVars = {
        mapTitle: mapTitleInput.val(),
        mapCentreLat: map.getCenter().lat(),
        mapCentreLng: map.getCenter().lng(),
        mapZoom: map.getZoom(),
        mapPoints: requestMarkers
      }

      $message.css({"display": "none"});
      $message.fadeIn(400).delay(2000).fadeOut(400);

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

  $('body').on('click', '.submitInfoBox', function(e) {
    e.preventDefault();
    console.log("being clicked: ", thisMarker);
    let $form = $(this).parent();
    let formData = {
      title: $form.find('input[name="title"]').val(),
      description: $form.find('input[name="description"]').val(),
      url: $form.find('input[name="url"]').val()
    };


    indexInmarkerArr = searchForMarker(infoWindow.anchor);
    if (indexInmarkerArr > -1) {
      markerArr[indexInmarkerArr]['infoBox'] = formData;
    }
    closeAllGoddamnInfoWindows();
  });

  editThisMapBtn.on('click', function (event) {
    console.log(currentMapId);
    $.ajax({
        type: 'POST',
        url: '/editCurrentMap',
        success: function (response) {
          console.log('success');
          if (response.redirect) {window.location.href = response.redirect;}
        }
      });
  });

  deleteMapBtn.on('click', function (event) {
    console.log('I am in delete map inside clickable button')
    //console.log(currentMapId);
    $.ajax({
        type: 'POST',
        url: '/deleteMap',
        success: function (response) {
          console.log('success');
          if (response.redirect) {window.location.href = response.redirect;}
        }
      });
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
      console.log('XXX');
    } else if (marker.infoBox.title === "" || marker.infoBox.description === "" || marker.infoBox.url === "") {
      outBool = false;
      console.log('YYY');
    } else { requestMarkers[index].infoBox = marker.infoBox; console.log('ZZZ');}
  });
  return {outBool: outBool, outArr: requestMarkers}
}