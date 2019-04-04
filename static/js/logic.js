
function granim() {
var granimInstance = new Granim({
  element: '#canvas-image-blending',
  direction: 'top-bottom',
  isPausedWhenNotInView: true,
  image : {
      source: "../../templates/images/NewOrleans_image.png",
      blendingMode: 'multiply'
  },
  states : {
      "default-state": {
          gradients: [
              ['#29323c', '#485563'],
              ['#FF6B6B', '#556270'],
              ['#80d3fe', '#7ea0c4'],
              ['#f0ab51', '#eceba3']
          ],
          transitionSpeed: 7000
      }
  }
});


var granimInstance1 = new Granim({
  element: '#canvas-image-blending1',
  direction: 'top-bottom',
  isPausedWhenNotInView: true,
  image : {
      source: "../../templates/images/Header_image.png",
      blendingMode: 'multiply'
  },
  states : {
      "default-state": {
          gradients: [
              ['#29323c', '#485563'],
              ['#FF6B6B', '#556270'],
              ['#80d3fe', '#7ea0c4'],
              ['#f0ab51', '#eceba3']
          ],
          transitionSpeed: 7000
      }
  }
});
};
granim();
var url = "/geojson";


var neighborhood_list = [];
var popUp = [];
var bikeUp = [];
var musUp = [];


var bikeIcon = 
       L.ExtraMarkers.icon({
        icon: "ion-android-bicycle",
        iconColor: "white",
        markerColor: "orange",
        shape: "circle"
        });

var musIcon = 
      L.ExtraMarkers.icon({
        icon: "ion-ios-book",
        iconColor: "white",
        markerColor: "green",
        shape: "star"
        });
var beerIcon = 
      L.ExtraMarkers.icon({
        icon: "ion-ios-book",
        iconColor: "white",
        markerColor: "purple",
        shape: "star"
        });
d3.json("/geojson", function(response) {
    console.log(response.type)
    createFeatures(response.type);
    
  });

  
  function createFeatures(neighborhoodData) {
    
    for (var i = 0; i < neighborhoodData.length; i++) {
      
      function onEachFeature(feature, layer) {
      };

    var neighbourhoods = L.geoJSON(neighborhoodData, {
      onEachFeature: function (feature, layer) {
        layer.bindPopup('<h1>'+feature.properties.neighbourhood+'</h1>');
      }
    }) 
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
          L.marker(([geometry.coordinates[1], geometry.coordinates[0]]), {
            icon:bikeIcon
        }
        )
        .bindPopup("<h3>Magnitude: " + properties.sign_type + "<h3><h3>Location: " + properties.station_number + "<h3>")
        .on('click'))  
        };
    };
    d3.json("/listings", function(data) {
      // console.log(data)
      createHosts(data);
      });
      
      function createHosts (hostData) {
        
      var markers = L.markerClusterGroup();
      
      for (var i = 0; i < hostData.length; i++) {
        var coordinates = [hostData[i].latitude, hostData[i].longitude];
        // console.log(coordinates) 
      
        markers.addLayer(L.marker((coordinates), {
          icon:beerIcon})
        .bindPopup("<h1>" + hostData[i].name + "</h1> <hr> <h3>Price: " + hostData[i].price + "</h3>"));
        // console.log(hosts)
      }
    d3.json("/brewery_json", function(data) {
      // console.log(data)
      createBrews(data);
      });
      
      function createBrews (brewData) {
        
      var brews = L.markerClusterGroup();
      
      for (var i = 0; i < brewData.length; i++) {
        var coordinates1 = [brewData[i].Latitude, brewData[i].Longitude];
        // console.log(coordinates1) 
      
        brews.addLayer(L.marker(coordinates1).bindPopup("<h1>" + brewData[i].Name + "</h1> <hr> <h3>Phone: " + brewData[i].Phone + "</h1><hr><h3>Location: "+ brewData[i].Street + "</h3>"));
        // console.log(hosts)
      }
    d3.json("/museums", function(mus_response) {
      console.log(mus_response.type);
      createBikes(mus_response.type);
    });
      function createBikes(musData) {
        
        for (var i = 0; i < musData.length; i++) {
          var geometry = musData[i].geometry;
          var properties = musData[i].properties;
          if (geometry) {
            musUp.push(
              L.marker(([geometry.coordinates[1], geometry.coordinates[0]]), {
                icon:musIcon
            }
            )
            .bindPopup("<h3>Magnitude: " + properties.museum + "<h3><h3>Location: " + properties.address + "<h3>")
            .on('click'))  
            };
        };
console.log(bikeUp);
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
var musUp1 = L.layerGroup(musUp);

var basemaps = {
  "Satellite Map" : satellite,
  "Street Map" : streetmap
};
var overlaymaps = {
  "Bike Stations" : bikeUp1,
  "Neighborhoods" : neighbourhoods,
  "Museums" : musUp1,
  "Air BNB Hosts" : markers,
  "Breweries" : brews
};
var myMap = L.map("map", {
  center: [29.95, -89.75],
  zoom:10,
  layers: [streetmap, markers]
});

L.control.layers(basemaps, overlaymaps, {
  collapsed: false
}).addTo(myMap)}}}}};
  

