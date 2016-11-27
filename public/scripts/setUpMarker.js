let allMyGoddamnInfoWindows = [];

function closeAllGoddamnInfoWindows() {
  while (allMyGoddamnInfoWindows.length > 0) {
    allMyGoddamnInfoWindows[0].close();
    allMyGoddamnInfoWindows.shift();
  }
}

function marker(lat, lng, map) {
  const latLng = new google.maps.LatLng(lat, lng);
  const markerOptions = {
    position: latLng,
    map: map,
    draggable: true
  };


  const $form = document.importNode($('.new-poi-form')[0], true); // duplicate DOM node because googleMaps
  const thisMarker = new google.maps.Marker(markerOptions);
  let infoWindow;

  function createMarker() {
    closeAllGoddamnInfoWindows();
    thisMarker.setMap(map);
    map.panTo(latLng);
    const infoWindowOptions = { content: $form };
    infoWindow = new google.maps.InfoWindow(infoWindowOptions);
    allMyGoddamnInfoWindows.push(infoWindow);
    infoWindow.open(map, thisMarker);
  }

  function markerClicked(event) {
    closeAllGoddamnInfoWindows();
    const infoWindowOptions = { content: $form };
    infoWindow = new google.maps.InfoWindow(infoWindowOptions);
    allMyGoddamnInfoWindows.push(infoWindow);
    infoWindow.open(map, thisMarker);
  }

  function bindEvents() {
    google.maps.event.addListener(thisMarker, 'click', markerClicked);
    google.maps.event.addListener(thisMarker, 'dragend', markerClicked);
    //google.maps.event.addListener(map, 'click', mapClickedWhileInfoWindowIsUp);

    $('.submitInfoBox').on('click', function(e) {
      e.preventDefault();
      let $form = $(this).parent();
      let formData = {
        title: $form.find('input[name="title"]').val(),
        description: $form.find('input[name="description"]').val(),
        url: $form.find('input[name="url"]').val()
      };

      if (formData.title === "") formData.title = "xxx";
      if (formData.description === "") formData.description = "xxx";
      if (formData.url === "") formData.url = "xxx";

      indexInmarkerArr = searchForMarker(infoWindow.anchor);
      if (indexInmarkerArr > -1) {
        markerArr[indexInmarkerArr]['infoBox'] = formData;
      }
      closeAllGoddamnInfoWindows();
    });
  }

  function init() {
    createMarker();
    bindEvents();
  }

  init();
  return thisMarker;

};

function searchForMarker(marker) {
  var output = -1;
  markerArr.forEach((point, index) => {
    if (JSON.stringify(point.getPosition()) === JSON.stringify(marker.getPosition())) output = index;
  });
  return output;
}