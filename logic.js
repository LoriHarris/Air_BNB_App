var queryUrl = "http://data.insideairbnb.com/united-states/la/new-orleans/2019-03-06/visualisations/neighbourhoods.geojson"

d3.json(queryUrl, function(data) {
  createFeatures(data.features);
});

function createFeatures(airbnbData) {

// makes the borough outlines
    //need to edit to make borough name pop up; current reads undefined. 
  function onEachFeature (feature, layer) {
     layer.bindPopup("<h3>" + feature[0] +
      "</h3>");
  }
    var neighborhoods = L.geoJSON(airbnbData, {
    onEachFeature: onEachFeature
  });

  createMap(neighborhoods)
}

function createMap (neighborhoods) {

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
"Neighborhood Boundaries": neighborhoods
 };

var myMap = L.map("map", {
    center: [29.95, -90.0715],
    zoom: 5,
    layers: [lightmap, neighborhoods]
  });

L.control.layers(baseMaps, overlayMaps, {
  collapsed: false
  }).addTo(myMap);

};
