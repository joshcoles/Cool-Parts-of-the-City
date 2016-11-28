let map = {};
let markerArr = [];
let postRoute = '/users/:username/create';
let action = 'newMap';

function createNewMap () {
  let mapOptions = {
    center: new google.maps.LatLng(49.28, -123.11),
    zoom: 14,
    mapTypeId: google.maps.MapTypeId.ROADMAP,

  };

  map = new google.maps.Map(document.getElementById('map'), mapOptions);

  map.addListener('click', function(e) {
    let thisMarker = marker(e.latLng.lat(), e.latLng.lng(), map, true);
    markerArr.push(thisMarker);
  });

  autoCompleteSearch(map);

  return map;
}





//     styles: [
//   {
//     "elementType": "geometry",
//     "stylers": [
//       {
//         "color": "#242f3e"
//       }
//     ]
//   },
//   {
//     "elementType": "labels.text.fill",
//     "stylers": [
//       {
//         "color": "#746855"
//       }
//     ]
//   },
//   {
//     "elementType": "labels.text.stroke",
//     "stylers": [
//       {
//         "color": "#242f3e"
//       }
//     ]
//   },
//   {
//     "featureType": "administrative",
//     "elementType": "geometry",
//     "stylers": [
//       {
//         "visibility": "off"
//       }
//     ]
//   },
//   {
//     "featureType": "administrative.locality",
//     "elementType": "labels.text.fill",
//     "stylers": [
//       {
//         "color": "#d59563"
//       }
//     ]
//   },
//   {
//     "featureType": "poi",
//     "stylers": [
//       {
//         "visibility": "off"
//       }
//     ]
//   },
//   {
//     "featureType": "poi",
//     "elementType": "labels.text.fill",
//     "stylers": [
//       {
//         "color": "#d59563"
//       }
//     ]
//   },
//   {
//     "featureType": "poi.park",
//     "elementType": "geometry",
//     "stylers": [
//       {
//         "color": "#263c3f"
//       }
//     ]
//   },
//   {
//     "featureType": "poi.park",
//     "elementType": "labels.text.fill",
//     "stylers": [
//       {
//         "color": "#6b9a76"
//       }
//     ]
//   },
//   {
//     "featureType": "road",
//     "elementType": "geometry",
//     "stylers": [
//       {
//         "color": "#38414e"
//       }
//     ]
//   },
//   {
//     "featureType": "road",
//     "elementType": "geometry.stroke",
//     "stylers": [
//       {
//         "color": "#212a37"
//       }
//     ]
//   },
//   {
//     "featureType": "road",
//     "elementType": "labels.icon",
//     "stylers": [
//       {
//         "visibility": "off"
//       }
//     ]
//   },
//   {
//     "featureType": "road",
//     "elementType": "labels.text.fill",
//     "stylers": [
//       {
//         "color": "#9ca5b3"
//       }
//     ]
//   },
//   {
//     "featureType": "road.highway",
//     "elementType": "geometry",
//     "stylers": [
//       {
//         "color": "#746855"
//       }
//     ]
//   },
//   {
//     "featureType": "road.highway",
//     "elementType": "geometry.stroke",
//     "stylers": [
//       {
//         "color": "#1f2835"
//       }
//     ]
//   },
//   {
//     "featureType": "road.highway",
//     "elementType": "labels.text.fill",
//     "stylers": [
//       {
//         "color": "#f3d19c"
//       }
//     ]
//   },
//   {
//     "featureType": "transit",
//     "stylers": [
//       {
//         "visibility": "off"
//       }
//     ]
//   },
//   {
//     "featureType": "transit",
//     "elementType": "geometry",
//     "stylers": [
//       {
//         "color": "#2f3948"
//       }
//     ]
//   },
//   {
//     "featureType": "transit.station",
//     "elementType": "labels.text.fill",
//     "stylers": [
//       {
//         "color": "#d59563"
//       }
//     ]
//   },
//   {
//     "featureType": "water",
//     "elementType": "geometry",
//     "stylers": [
//       {
//         "color": "#17263c"
//       }
//     ]
//   },
//   {
//     "featureType": "water",
//     "elementType": "labels.text.fill",
//     "stylers": [
//       {
//         "color": "#515c6d"
//       }
//     ]
//   },
//   {
//     "featureType": "water",
//     "elementType": "labels.text.stroke",
//     "stylers": [
//       {
//         "color": "#17263c"
//       }
//     ]
//   }
// ]