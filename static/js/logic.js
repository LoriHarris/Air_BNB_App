
function buildMetadata(sample) {
  
  d3.json(`/listings/${sample}`, function(data) {
    var data = [data];
    console.log(data);
  var meta_chart = d3.select("#sample-metadata");
  meta_chart.html("");
  data.forEach((data) => {
    var row = meta_chart.append("tbody");
    Object.entries(data).forEach(([key, value]) => {
      var cell = row.append("tr");
      
      cell.text(`${key}: ${value}`);
      
    console.log(`Key: ${key} | Value: ${value}`);
    });
  });
});
}
function init () {
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("/names", function(sampleNames) {
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        
    });
  });
}
function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  // buildCharts(newSample);
  buildMetadata(newSample);
}

// Initialize the dashboard
init();

var url = "/static/neighbourhoods.geojson";

var neighborhood_list = [];
var popUp = [];
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
d3.json(url, function(response) {
    
    createFeatures(response.features);
  });
  
  function createFeatures(neighborhoodData) {
    
    for (var i = 0; i < neighborhoodData.length; i++) {
      // var geometry =neighborhoodData[i].geometry;
      // neighborhood_list.push(feature.properties.neighbourhood);
      // var magRadius = properties.mag;
   
      function onEachFeature(feature, layer) {
        layer.bindPopup("<h3>" + feature.properties.neighbourhood + "</h3><hr>");
  }

    var neighbourhoods = L.geoJSON(neighborhoodData, {
      onEachFeature: onEachFeature
    });
    
  }; 

console.log(neighborhoodData);
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
// var popUp1 = L.featureGroup(popUp);

var basemaps = {
  "Satellite Map" : satellite,
  "Street Map" : streetmap
};
var overlaymaps = {
  "Neighborhoods" :neighbourhoods,
  // "Popup" : popUp1
};
var myMap = L.map("map", {
  center: [29.95, -89.75],
  zoom:10,
  layers: [satellite, neighbourhoods]
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
}).addTo(myMap)};
  



