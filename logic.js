// Creating map object
var myMap = L.map("map", {
    center: [29.9511, -90.0715],
    zoom: 11
  });
  
  // Adding tile layer to the map
  L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.streets",
    accessToken: API_KEY
  }).addTo(myMap);
  
  // TODO:ps://data.cityofchicago.org/resource/6zsd-86xi.json
  // ?$where=date between '2015-01-10T12:00:00' and '2015-01-10T14:00:00'
  
  // Store API query variables
  var baseURL = "https://data.cityofnewyork.us/resource/fhrw-4uyv.json?";
  // Add the dates in the ISO formats
  var date = "$where=created_date between '2015-01-01T12:00:00' and '2016-01-15T14:00:00'";
  // Add the complaint type
  var complaint = "&complaint_type=Rodent";
  // Add a limit
  var limit = "&$limit=1000000";
  
  var url = baseURL+date+complaint+limit
  // Assemble API query URL
  
  // Grab the data with d3
  d3.json(url, function(response) {
    console.log(response)
  
    var markers = L.markerClusterGroup();
  
    for (var i = 0; i < response.length; i++) {
      var location = response[i].location;
      if (location) {
        markers.addLayer(L.marker([location.coordinates[1], location.coordinates[0]])
          .bindPopup(response[i].descriptor));
      }
    }
  
    myMap.addLayer(markers);
  });