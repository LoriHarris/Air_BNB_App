// Create a map object
var myMap = L.map("map", {
  center: [30.0300, -90.0456],
  zoom: 5
});

L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.streets-basic",
  accessToken: API_KEY
}).addTo(myMap);

// Each city object contains the city's name, location and population
var file = "../../data/detailed_NewOrleans.json"
var details = {}

d3.json(file, function(data) {

var markers = L.markerClusterGroup();

for (var i = 0; i < data.length; i++) {

  var coordinates = [data[i].latitude, data[i].longitude];
  
  markers.addLayer(L.circle(coordinates, {
    fillOpacity: 0.75,
    color: "white",
    fillColor: "purple",
  }).bindPopup("<h1>" + data[i].name + "</h1> <hr> <h3>Price: " + data[i].price + "</h3>").addTo(myMap));
}

myMap.addLayer(markers)
});

museum_file = "../../data/Museums.geojson"

d3.json(museum_file, function(data) {
  // console.log(data)
  createFeatures(data.features);
});

function createFeatures(museumData) {

  function onEachFeature(feature, layer) {
    // console.log(feature.properties)
    layer.bindPopup("<h3>" + feature.properties.museum +
      "</h3>")
  }
  var museum = L.geoJson(museumData, {
    onEachFeature: onEachFeature
  }).addTo(myMap);










