// Sort the data array using the greekSearchResults value
data.sort(function(a, b) {
  return parseFloat(b.WalkScore) - parseFloat(a.WalkScore);
});

// Slice the first 10 objects for plotting
data = data.slice(0, 10);

// Reverse the array due to Plotly's defaults
data = data.reverse();

var trace1 = {
  x: data.map(row => row.WalkScore),
  y: data.map(row => row.hood),
  text: data.map(row => row.hood),
  name: "Neighborhood",
  type: "bar",
  orientation: "h",
  marker: {
    color: data.map(row => row.WalkScore),
    colorscale: "Vidris"
  }
};

// data
var data = [trace1];

// Apply the group bar mode to the layout
var layout = {
  title: "Neighborhood Walk Score Top 10",
  margin: {
    l: 300,
    r: 100,
    t: 100,
    b: 100
  }
};

// Render the plot to the div tag with id "plot"
Plotly.newPlot("plot", data, layout);

// // Sort the data array using the greekSearchResults value
// data.sort(function(a, b) {
//   return parseFloat(b.BikeScore) - parseFloat(a.BikeScore);
// });


// // Reverse the array due to Plotly's defaults
// data = data.reverse();

// // Trace1 for the Greek Data
// var trace2 = {
//   x: data.map(row => row.BikeScore),
//   y: data.map(row => row.hood),
//   text: data.map(row => row.hood),
//   name: "Neighborhood",
//   type: "bar",
//   orientation: "h",
//   marker: {
//     color: data.map(row => row.WalkScore),
//     colorscale: "Vidris",
// }
// };

// // data
// var data2 = [trace2];

// // Apply the group bar mode to the layout
// var layout2 = {
//   title: "Neighborhood Walk Score Top 10"
//   ,
// //   yaxis2=dict(
// //     autorange='reversed'
// // ),
//   margin: {
//     l: 300,
//     r: 100,
//     t: 100,
//     b: 100
//   }
// };
// // Render the plot to the div tag with id "plot"
// Plotly.newPlot("plot2", data2, layout2);





