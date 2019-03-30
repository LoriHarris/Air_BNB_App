var url = "/geojson";


var neighborhood_list = [];
var popUp = [];
var bikeUp = [];
var musUp = [];
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
  "Museums" : musUp1
};
var myMap = L.map("map", {
  center: [29.95, -89.75],
  zoom:10,
  layers: [satellite, popUp1]
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
}).addTo(myMap)}}};
  


// function buildMetadata(sample) {
//     n_name();
//       function n_name() {
//         name = sample;
//       };
//     d3.json(`/listings/${sample}`, function(data) {
//       var data = [data];
//       // console.log(data);
//     var meta_chart = d3.select("#sample-metadata");
//     meta_chart.html("");
//     data.forEach((data) => {
//       var row = meta_chart.append("tbody");
//       Object.entries(data).forEach(([key, value]) => {
//         var cell = row.append("tr");
        
//         cell.text(`${key}: ${value}`);
        
//       // console.log(`Key: ${key} | Value: ${value}`);
//       });
//     });
//   });
//   }
//   console.log(name);
//   function init () {
//     var selector = d3.select("#selDataset");
  
//     // Use the list of sample names to populate the select options
//     d3.json("/names", function(sampleNames) {
//       sampleNames.forEach((sample) => {
//         selector
//           .append("option")
//           .text(sample)
          
//       });
//     });
//   }
//   function optionChanged(newSample) {
//     // Fetch new data each time a new sample is selected
//     buildNeighborhoodData(newSample);
//     buildMetadata(newSample);
//   }
  
//   // Initialize the dashboard
//   init();
  
  
