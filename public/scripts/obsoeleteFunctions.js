// // Sets up the relevant event listeners on a particular marker on the map.

// function setUpEventListeners (marker) {
//   google.maps.event.addListener(marker, 'click', getCoordinatesOnEvent);
//   google.maps.event.addListener(marker, 'dragend', getCoordinatesOnEvent);
// }











// var allMyGoddamnInfoWindows = [];

// function closeAllGoddamnInfoWindows(){
//   while (allMyGoddamnInfoWindows.length > 0){
//     allMyGoddamnInfoWindows[0].close();
//     allMyGoddamnInfoWindows.shift();
//   }
// }

// function marker(latLng, map) {

//   const markerOptions = {
//     position: latLng,
//     map: map,
//     draggable: true
//   };


//   const $form = document.importNode($('.new-poi-form')[0], true); // duplicate DOM node because googleMaps
//   //const $form = $('.new-poi-form')[0];
//   const marker = new google.maps.Marker(markerOptions);
//   const thisMarker = new google.maps.Marker(markerOptions);
//   let infoWindow;

//   // palces a marker on map and pans to it.
//   function createMarker() {

//     closeAllGoddamnInfoWindows();
//     thisMarker.setMap(map);
//     map.panTo(latLng);
//     const infoWindowOptions = {
//       content: $form
//     };

//     infoWindow = new google.maps.InfoWindow(infoWindowOptions);
//     allMyGoddamnInfoWindows.push(infoWindow);

//     infoWindow.open(map, thisMarker);


//   }

//   // HELPER
//   // =======
//   // gets coordinates of a marker event
//   function getCoordinates(event) {
//     return {
//       lat: event.latLng.lat(),
//       lng: event.latLng.lng()
//     }
//   }

//   // EVENTS
//   // =======

//   // opens an info window when a maker is clicked.
//   function markerClicked(event) {

//     //closeAllGoddamnInfoWindows();

//     const infoWindowOptions = {
//       content: $form
//     };
//     infoWindow = new google.maps.InfoWindow(infoWindowOptions);

//     allMyGoddamnInfoWindows.push(infoWindow);

//     infoWindow.open(map, marker);
//   }

//   // binds the map listener events and assigns them functions.
//   function bindEvents() {
//     google.maps.event.addListener(thisMarker, 'click', markerClicked);
//     google.maps.event.addListener(thisMarker, 'dragend', markerClicked);
//     //google.maps.event.addListener(map, 'click', mapClickedWhileInfoWindowIsUp);

//     $('.submitInfoBox').on('click', function(e) {
//       e.preventDefault();
//       //let $form = $(this).find('#map form');
//       // const $form = $('.new-poi-form');
//       let $form = $(this).parent();
//       let formData = {
//         title: $form.find('input[name="title"]').val(),
//         description: $form.find('input[name="description"]').val(),
//         url: $form.find('input[name="url"]').val()
//       };

//       if (formData.title === "") formData.title = "xxx";
//       if (formData.description === "") formData.description = "xxx";
//       if (formData.url === "") formData.url = "xxx";

//       // console.log("THIS SUCKS: ", formData);

//       indexInPointsArr = searchForMarker(infoWindow.anchor);
//       if (indexInPointsArr > -1) {
//         pointsArr[indexInPointsArr]['infoBox'] = formData;
//       }
//     });

//   }

//   // initializes the marker.
//   function init() {
//     //mapClickedWhileInfoWindowIsUp();
//     createMarker();
//     bindEvents();
//   }

//   init();
//   return thisMarker;

// };


// function removeMarker(marker) {
//   marker.setMap(null);
//   let index = searchForMarker(marker);
//   // markerArr[index].setMap(null);



//   if (index > -1) {
//     markerArr.splice(index, 1);
//     pointsArr.splice(index, 1);
//   }
// }

// function searchForMarker(marker) {
//   var output = -1;
//   pointsArr.forEach((point, index) => {
//     if (JSON.stringify(point.mkr.getPosition()) === JSON.stringify(marker.getPosition())) output = index;
//   });
//   return output;
// }












// function insertPointsOnMap (myMap, point) {
//     var markerOptions = {
//       position: new google.maps.LatLng(lat, lng),
//       draggable: true
//     };

//     var infoWindowOptions = {
//       content: 'test'
//     }

//     // debugger;
//     var marker = new google.maps.Marker(markerOptions);
//     marker.setMap(myMap);
//     // console.log(myMap);

//     var infoWindow = new google.maps.InfoWindow(infoWindowOptions);

//     google.maps.event.addListener(marker,'click', function() {
//       // console.log("I'm firing my lazer");
//       infoWindow.open(myMap, marker);
//     });

//     // setUpEventListeneners(marker);

//     return marker;
// }
















// gets the coordinates of the event when a google map event happens.
// returns the coordinates as an object.
// function getCoordinatesOnEvent (event) {

//   let coordinates = {
//     lat: event.latLng.lat(),
//     lng: event.latLng.lng()
//   }

//   console.log( coordinates );
//   return coordinates;
// }




















// function drawMap (lat, lng, zoomLevel, pointsArr) {
//   var mapOptions = {
//     center: new google.maps.LatLng(lat, lng),
//     zoom: zoomLevel,
//     mapTypeId: google.maps.MapTypeId.ROADMAP
//   };

//   var map = new google.maps.Map(document.getElementById('map'), mapOptions);

//   pointsArr.forEach((point) => {
//     insertPointsOnMap (map, point);
//   });

//   return map;
// }
