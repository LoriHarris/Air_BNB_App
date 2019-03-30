function buildMetadata(sample) {
 
  d3.json(`/listings/${sample}`, function(data) {
    var data = [data];
    // console.log(data);
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

