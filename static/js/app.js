function init () {
var selector = d3.select("#selDataset");

// Use the list of sample names to populate the select options
d3.json("/names", function(sampleNames) {
  sampleNames.forEach((sample) => {
    selector
      .append("option")
      .text(sample)
      
  })
})
}
init();