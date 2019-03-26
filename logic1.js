var queryUrl = `Bike Share Stations.geojson`
// Perform a GET request to the query URL
d3.json(queryUrl, function(data) {
  // Once we get a response, send the data.features object to the createFeatures function
  createFeatures(data.features);
});

function createFeatures(bikeData) {

  // Define a function we want to run once for each feature in the features array
  // Give each feature a popup describing the place and time of the earthquake
  function onEachFeature(feature, layer) {
    layer.bindPopup(feature.properties.station_name + "<br>Number of Rack Spaces:<br>" +
    "$" + feature.properties.number_of_rack_spaces);
  }

  // Create a GeoJSON layer containing the features array on the earthquakeData object
  // Run the onEachFeature function once for each piece of data in the array
  var bikeStations = L.geoJSON(bikeData, {
    onEachFeature: onEachFeature
  });
  // Sending our earthquakes layer to the createMap function
  createMap(bikeStations);
  console.log(bikeStations)
}

function createMap (bikeStations) {

// Adding tile layer to the map
var lightmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.streets",
  accessToken: API_KEY
})

var baseMaps = {
  "Light Map": lightmap
};

var overlayMaps = {
  "Bike Stations": bikeStations
};

var myMap = L.map("map", {
    center: [29.95, -90.0715],
    zoom: 5,
    layers: [lightmap, bikeStations]
  });

L.control.layers(baseMaps, overlayMaps, {
  collapsed: false
  }).addTo(myMap);

}
// function createMarkers(response) {

//   // Pull the "stations" property off of response.data
//   var stations = response.features;
//   console.log(stations)
//   // Initialize an array to hold bike markers
//   var bikeMarkers = [];

//   // Loop through the stations array
//   for (var index = 0; index < stations.length; index++) {
//     var station = stations[index];

//     // For each station, create a marker and bind a popup with the station's name
//     var bikeMarker = L.marker([station.lat, station.lon])
//       .bindPopup("<h3>" + station.name + "<h3><h3>Capacity: " + station.capacity + "<h3>");

//       console.log(bikeMarkers)
//       // Create a layer group made from the bike markers array, pass it into the createMap function
//       createMap(L.layerGroup(bikeMarkers));
//     }
//   }

// // Perform an API call to the Citi Bike API to get station information. Call createMarkers when complete
// d3.json(queryUrl, createMarkers);



