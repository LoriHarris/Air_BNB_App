var url = "/geojson";

var neighborhood_list = [];
var popUp = [];
var bikeUp = [];
var hosts = [];

function getColor(d) {
 return d < 1 ? '#ffffcc' :
        d < 2  ? '#ffeda0' :
        d < 3  ? '#fed976' :
        d < 4  ? '#feb24c' :
        d < 5   ? '#fd8d3c' :
        d < 6   ? '#fc4e2a' :
        d < 7   ? '#e31a1c' :
        d < 8   ? '#bd0026' :
                   '#800026';
}


d3.json("/geojson", function(response) {
  //  console.log(response.type)
   createFeatures(response.type);

 });


 function createFeatures(neighborhoodData) {

   for (var i = 0; i < neighborhoodData.length; i++) {

     function onEachFeature(feature, layer) {
        layer.bindPopup("<h4>" + feature.properties.neighbourhood +
      "</h4>")
     };

   var neighbourhoods = L.geoJSON(neighborhoodData, {
     onEachFeature: onEachFeature
   });

 };

d3.json("/bikeshare", function(bikeresponse) {
  console.log(bikeresponse.type);
  createBikes(bikeresponse.type);
});
  function createBikes(bikeData) {
    
    for (var i = 0; i < bikeData.length; i++) {
      var geometry = bikeData[i].geometry;
      var properties = bikeData[i].properties;
      if (geometry) {
        bikeUp.push(
          L.marker(([geometry.coordinates[1], geometry.coordinates[0]]), 
        )
        .bindPopup("<h3>Magnitude: " + properties.sign_type + "<h3><h3>Location: " + properties.station_number + "<h3>")
        .on('click'))  
        };
    };
   
d3.json("/listings", function(data) {
  console.log(data)
createHosts(data);
});

function createHosts (hostData) {
    
  var markers = L.markerClusterGroup();

for (var i = 0; i < hostData.length; i++) {
    var coordinates = [hostData[i].latitude, hostData[i].longitude];
    // console.log(coordinates) 

    markers.addLayer(L.marker(coordinates).bindPopup("<h1>" + hostData[i].name + "</h1> <hr> <h3>Price: " + hostData[i].price + "</h3>"));
    console.log(hosts)
  }

  d3.json("/museums", function(data) {
  createMuseums(data.type);
});

function createMuseums(museumData) {
  // console.log(museumData)
   for (var i = 0; i < museumData.length; i++) {

  function onEachFeature(feature, layer) {
    // console.log(feature.properties)
    layer.bindPopup("<h4>" + feature.properties.museum +
      "</h4>")
  }
  var museums = L.geoJson(museumData, 
  {onEachFeature: onEachFeature 
    });


// console.log(bikeUp);
var satellite = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
 attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
 maxZoom: 18,
 id: "mapbox.satellite",
 accessToken: API_KEY
});

var streetmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
 attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
 maxZoom: 18,
 id: "mapbox.streets",
 accessToken: API_KEY
});
// var magnitude = L.featureGroup(circles);
var popUp1 = L.layerGroup(popUp);
var bikeUp1 = L.layerGroup(bikeUp);

var basemaps = {
 "Satellite Map" : satellite,
 "Street Map" : streetmap
};
var overlaymaps = {
 "Bike Stations" : bikeUp1,
 "Neighborhoods" : neighbourhoods,
 "Museums": museums,
 "Airbnb Hosts": markers
//  "Airbnb Hosts": markers
};
var myMap = L.map("map", {
 center: [29.95, -89.75],
 zoom:10,
 layers: [streetmap, popUp1]
});

L.control.layers(basemaps, overlaymaps, {
 collapsed: false
}).addTo(myMap)}}}}};