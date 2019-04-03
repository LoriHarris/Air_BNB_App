

function buildMetadata(sample) {
 
  d3.json(`/hood_json/${sample}`, function(data) {
    var data = [data];
    console.log(data);
 
  d3.select("#bike").text(data[0]['Bike Score']);
  d3.select("#walk").text(data[0]['Walk Score']);
  d3.select("#transit").text(data[0]['Transit Score']);
  d3.select("#rank").text(data[0]['Rank']);
     
    });
  };

function buildListingdata(sample) {
 
  d3.json(`/url/${sample}`, function(data) {
    var data = [data];
  
  d3.select("#neighborhood").text(data[0]['area']);
  d3.select("#price").text(data[0]['price']);
  d3.select("#ltype").text(data[0]['room type']);
  d3.select("#ptype").text(data[0]['property_type']);
  d3.select("#acc").text(data[0]['accommodates']);
  d3.select("#beds").text(data[0]['beds']);
  d3.select("#br").text(data[0]['bedrooms']);
  d3.select("#bath").text(data[0]['bathrooms']);
  d3.select("#min").text(data[0]['minimum_nights']);

  
  });
}
// var list_items = [];
// var list_items1 = [];

// function buildMetadata(sample) {
 
//   d3.json(`/hood_json/${sample}`, function(data) {
//     var data = [data];
//     console.log(data);
//   var meta_chart = d3.select("tbody");
//   meta_chart.html("");
//   data.forEach((data) => {
//     list_items.push(Object.values(data));
//     var row1 = meta_chart.append("tr");
//     Object.entries(data).forEach(([key, value]) => {
//       var cell = row1.append("td");
//       cell.text(value);
     
//     });
//   });
// });
// }

// function buildListingdata(sample) {
 
//   d3.json(`/url/${sample}`, function(data) {
//     var data = [data];
//     console.log(data[0]['area']);
//   var meta_chart = d3.select("#sample-listingdata");
//   meta_chart.html("");
//   data.forEach((data) => {
//     list_items1.push(Object.values(data));
//     var row1 = meta_chart.append("table-responsive");
//     var row = meta_chart.append("tbody");
//     Object.entries(data).forEach(([key, value]) => {
//       var cell = row.append("tr");
      
//       cell.text(`${key}: ${value}`);
      
//     // console.log(`Key: ${key} | Value: ${value}`);
//     });
//   });
// });
// }


// function init () {
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("/names", function(sampleNames) {
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        
    });
  });


names =[];
var selector1 = d3.select("#selListing");
function optionChanged(newSample) {
  d3.json(`listings/${newSample}`, function(listingData) {
    createData(listingData);
    buildMetadata(newSample);
  });
  function createData (listings) {
    for (var i = 0; i < listings.length; i++) {
      
      selector1
      .append("option")
      .text(listings[i].name)
  
        }
    for (var i = 0; i <listings.length; i++) {
      selector
      .on("change", function(d) {
        selector1
        .text("")
      })
    }
  }
}
  function optionChanged1(newSample1) {
    d3.json(`url/${newSample1}`, function(listingData) {
      buildListingdata(newSample1)
      createData(listingData);
    });
    function createData (listings) {
      for (var i = 0; i < listings.length; i++) {
        names.push(listings[i].name);
        console.log(listings[i].listing_url);
      
          }
  }

  }