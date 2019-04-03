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
    // console.log(response.type)
    createFeatures(response.type);
    
  });

  
  function createFeatures(neighborhoodData) {
    
    for (var i = 0; i < neighborhoodData.length; i++) {
      
      function onEachFeature(feature, layer) {
      };

    var neighbourhoods = L.geoJSON(neighborhoodData, {
      onEachFeature: function (feature, layer) {
        layer.bindPopup('<h8>'+feature.properties.neighbourhood+'</h8>');
      }
    }) 
  }; 
  
d3.json("/bikeshare", function(bikeresponse) {
  // console.log(bikeresponse.type);
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
        .bindPopup("<h8>Bike Type: " + properties.sign_type + "</h8><h8>Location: " + properties.station_number + "</h8>")
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
        .bindPopup("<h8>" + hostData[i].name + "</h8> <hr> <h8>Price: $" + hostData[i].price + "</h8>"));
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
      
        brews.addLayer(L.marker(coordinates1).bindPopup("<h8>" + brewData[i].Name + "</h8> <hr> <h8>Phone: " + brewData[i].Phone + "</h8><hr><h8>Location: "+ brewData[i].Street + "</h8>"));
        // console.log(hosts)
      }
    d3.json("/museums", function(mus_response) {
      // console.log(mus_response.type);
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
            .bindPopup("<h8>Bke Type: " + properties.museum + "</h8><h8>Location: " + properties.address + "<h8>")
            .on('click'))  
            };
        };
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
var musUp1 = L.layerGroup(musUp);

var basemaps = {
  "Satellite Map" : satellite,
  "Street Map" : streetmap
};
var overlaymaps = {
 "Airbnb Hosts" : markers,
  "Bike Stations" : bikeUp1,
  "Breweries" : brews,
  "Museums" : musUp1,
  "Neighborhoods" : neighbourhoods
 
};
var myMap = L.map("map", {
  center: [30.02, -89.93],
  zoom:10,
  layers: [streetmap, markers]
});
// var legend = L.control({position: 'bottomright'});

// legend.onAdd = function (map) {

//     var div = L.DomUtil.create('div', 'info legend'),
//         magRange = [0,1,2,3,4,5,6,7,8],
//         labels = [];

//     // loop through our density intervals and generate a label with a colored square for each interval
//     for (var i = 0; i < magRange.length; i++) {
//         div.innerHTML +=
//             '<i style="background:' + getColor(magRange[i] + 1) + '"></i> ' +
//             magRange[i] + (magRange[i + 1] ? '&ndash;' + magRange[i + 1] + '<br>' : '+');
//     }

//     return div;
// };

// legend.addTo(myMap);
L.control.layers(basemaps, overlaymaps, {
  collapsed: false
}).addTo(myMap)}}}}};
  
