var file = "../db/neighbourhoods.json"

// Load data from nei// Creating map object
var map = L.map("map", {
  center: [29.9511, -90.0715],
  zoom: 11,
});

// Adding tile layer
L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 11,
  id: "mapbox.streets",
  accessToken: API_KEY
}).addTo(map);

  d3.json(file, function(data) {
   // Print the neighborhood Data
  console.log(data);
  // Creating a GeoJSON layer with the retrieved data
  L.geoJson(data).addTo(map);
});


// function createFeatures(airbnbData) {

//   // Define a function we want to run once for each feature in the features array
//   // Give each feature a popup describing the place and time of the earthquake
//   function onEachFeature(feature, layer) {
//     layer.bindPopup("<h3>" + feature.properties.place +
//       "</h3><hr><p>" + new Date(feature.properties.time) + "</p>");
//   }

//   // Create a GeoJSON layer containing the features array on the earthquakeData object
//   // Run the onEachFeature function once for each piece of data in the array
//   var airbnb = L.geoJSON(airbnbData, {
//     onEachFeature: onEachFeature
//   });

//   // Sending our neighborhood layer to the createMap function
//   createMap(airbnb);
// }

// function createMap(airbnb) {

//  // Define lightmap and darkmap layers
//  var lightmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
//   attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
//   maxZoom: 18,
//   id: "mapbox.streets",
//   accessToken: API_KEY
//  })
 
//  var darkmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
//   attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
//   maxZoom: 18,
//   id: "mapbox.dark",
//   accessToken: API_KEY
// });

// var baseMaps = {
//   "Light Map": lightmap,
//   "Dark Map": darkmap
//  };
 
// // Create overlay object to hold our overlay layer
//  var overlayMaps = {
//    "Neighborhoods": airbnb
//  };
 

//  // check that "map" below matches the name of the div id that holds the map in the html index file
// var myMap = L.map("map", {
//   center: [29.9511, -90.0715],
//   zoom: 12,
//   layers: [lightmap, airbnb]
// });

// // Create a layer control
// // Pass in our baseMaps and overlayMaps
// // Add the layer control to the map
// L.control.layers(baseMaps, overlayMaps, {
//   collapsed: false
// }).addTo(map);
// }