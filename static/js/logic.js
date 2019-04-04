
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
    console.log(response.type)
    createFeatures(response.type);
    
  });

  
  function createFeatures(neighborhoodData) {
    
    for (var i = 0; i < neighborhoodData.length; i++) {
      
      function onEachFeature(feature, layer) {
      };

    var neighbourhoods = L.geoJSON(neighborhoodData, {
      onEachFeature: function (feature, layer) {
        layer.bindPopup('<h7>'+feature.properties.neighbourhood+'</h7>');
      }
    }) 
  }; 
  d3.json("/venues_json", function (venueResponse) {
    createVenues(venueResponse.type);
  });
  function createVenues(venueData) {
    for (var i = 0; i < venueData.length; i++) {
      var venues = L.geoJSON(venueData, {
        onEachFeature: function (feature, layer) {
          layer.bindPopup('<h7>' + feature.properties.liveperformancevenuesandgroups + '</h7><hr><h7>' + feature.properties.address+ '<h7');
        }
      })
    }
  
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
        .bindPopup("<h7>Type: " + properties.sign_type + "<h7><h8>Station No.: " + properties.station_number + "<h8>")
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
        .bindPopup("<h7>" + hostData[i].name + "</h7> <hr> <h8>Price: $" + hostData[i].price + "</h8>"));
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
      
        brews.addLayer(L.marker(coordinates1).bindPopup("<h7>" + brewData[i].Name + "</h7> <hr> <h8>Phone: " + brewData[i].Phone + "</h8><hr><h8>Location: "+ brewData[i].Street + "</h8>"));
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
            .bindPopup("<h7>Name: " + properties.museum + "<h7><h8>Location: " + properties.address + "<h8>")
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
var popUp1 = L.layerGroup(popUp);
var bikeUp1 = L.layerGroup(bikeUp);
var musUp1 = L.layerGroup(musUp);

var basemaps = {
  "Satellite Map" : satellite,
  "Street Map" : streetmap
};
var overlaymaps = {
  "Air BNB Hosts" : markers,
  "Bike Stations" : bikeUp1,
  "Breweries" : brews,
  "Live Venues" : venues,
  "Museums" : musUp1,
  "Neighborhoods" : neighbourhoods
  
    };
var myMap = L.map("map", {
  center: [30, -90],
  zoom:10,
  layers: [streetmap, markers]
});

L.control.layers(basemaps, overlaymaps, {
  collapsed: false
}).addTo(myMap)}}}}}};
  

