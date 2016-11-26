var allMyGoddamnInfoWindows = [];

function closeAllGoddamnInfoWindows(){
  while (allMyGoddamnInfoWindows.length > 0){
    allMyGoddamnInfoWindows[0].close();
    allMyGoddamnInfoWindows.shift();
  }
}

function marker(latLng, map) {

  const markerOptions = {
    position: latLng,
    map: map,
    draggable: true
  };

  const $form = document.importNode($('.new-poi-form')[0], true); // duplicate DOM node because googleMaps

  const marker = new google.maps.Marker(markerOptions);
  let infoWindow;

  function createMarker() {
    closeAllGoddamnInfoWindows()

    marker.setMap(map);
    map.panTo(latLng);

    const infoWindowOptions = {
      content: $form
    };

    infoWindow = new google.maps.InfoWindow(infoWindowOptions);
    allMyGoddamnInfoWindows.push(infoWindow);

    infoWindow.open(map, marker);
  }

  // HELPER
  // =======

  function getCoordinates(event) {
    return {
      lat: event.latLng.lat(),
      lng: event.latLng.lng()
    }
  }

  // EVENTS
  // =======

  function markerClicked(event) {
    closeAllGoddamnInfoWindows()

    const infoWindowOptions = {
      content: $form
    };

    infoWindow = new google.maps.InfoWindow(infoWindowOptions);
    allMyGoddamnInfoWindows.push(infoWindow);

    infoWindow.open(map, marker);
  }

  function bindEvents() {
    google.maps.event.addListener(marker, 'click', markerClicked);
    google.maps.event.addListener(marker, 'dragend', markerClicked);    // probably fine.  but why?
  }

  function init() {
    createMarker();
    bindEvents();
  }

  init();

};





