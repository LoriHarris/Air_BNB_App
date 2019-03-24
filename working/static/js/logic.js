// check that "map" below matches the name of the div id that holds the map in the html index file
var myMap = L.map("map", {
  center: [29.9511, -90.0715],
  zoom: 12
});
 
 // Adding tile layer to the map
 var lightmap = 
 L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.streets",
  accessToken: API_KEY
 }).addTo(myMap);
 
 var baseMaps = {
  "Light Map": lightmap
 };
 
//  var overlayMaps = {
//    "Airbnb Hosts": airbnbHosts
//  };
 
//  L.control.layers(baseMaps, overlayMaps, {
//    collapsed: false
//    }).addTo(map);
 
//  var file ="../db/neighborhoods.json" 
 
//  d3.json(file, function(response) {
 
//  console.log(response);
//   // Create a new marker cluster group
//  var coordinates = [];
 
//  console.log(coordinates);
 
//   for (var i = 0; i < response.length; i++) {
//     var location = response[i].features[0].geometry.coordinates;
//     coordinates.push(location);
//   };
 
//  console.log(coordinates)
//   // Add our marker cluster layer to the map
//   // map.addLayer(coordinates);
 
//  })// Creating map object
  
  