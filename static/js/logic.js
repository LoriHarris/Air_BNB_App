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
  }).bindPopup("<h1>" + data[i].name + "</h1> <hr> <h3>Population: " + data[i].price + "</h3>").addTo(myMap));
}

myMap.addLayer(markers)
});













    // console.log(data);
//     for (var i=0; i <data.length; i++) {
//         id = [data[i].id]
//         name = [data[i].name]
//         coordinates = [data[i].latitude, data[i].longitude]
//         cost= [data[i].price]
//         beds = [data[i].beds]
//         bathrooms = [data[i].bathrooms]

//     // console.log(id,name, coordinates, cost, beds, bathrooms)
//     }
// details.id = id;
// details.name = name;
// details.coordinates = coordinates
// console.log(details)
// });

// Loop through the cities array and create one marker for each city object