var walkData = data
walkData.sort(function(a, b) {
  return parseFloat(b.WalkScore) - parseFloat(a.WalkScore);
});

// Slice the first 10 objects for plotting
walkData = walkData.slice(0, 10);

// Reverse the array due to Plotly's defaults
walkData = walkData.reverse();
console.log(walkData);

var trace1 = {
  x: walkData.map(row => row.WalkScore),
  y: walkData.map(row => row.hood),
  text: walkData.map(row => row.hood),
  name: "Neighborhood",
  type: "bar",
  orientation: "h",
  marker: {
    color: walkData.map(row => row.WalkScore),
    colorscale: "Vidris"
  }
};
var tranData = data
tranData.sort(function(a, b) {
  return parseFloat(b.TransitScore) - parseFloat(a.TransitScore);
});

// Slice the first 10 objects for plotting
tranData = tranData.slice(0, 10);

// Reverse the array due to Plotly's defaults
tranData = tranData.reverse();

var trace2 = {
  x: tranData.map(row => row.TransitScore),
  y: tranData.map(row => row.hood),
  text: tranData.map(row => row.hood),
  name: "Neighborhood",
  type: "bar",
  orientation: "h",
  marker: {
    color: tranData.map(row => row.TransitScore),
    colorscale: "Vidris"
  }
};
var bkData = data
bkData.sort(function(a, b) {
  return parseFloat(b.TransitScore) - parseFloat(a.TransitScore);
});

// Slice the first 10 objects for plotting
bkData = bkData.slice(0, 10);

// Reverse the array due to Plotly's defaults
bkData = bkData.reverse();

var trace3 = {
  x: bkData.map(row => row.TransitScore),
  y: bkData.map(row => row.hood),
  text: bkData.map(row => row.hood),
  name: "Neighborhood",
  type: "bar",
  orientation: "h",
  marker: {
    color: bkData.map(row => row.TransitScore),
    colorscale: "Vidris"
  }
};
// Apply the group bar mode to the layout
var layout1 = {
  title: "Neighborhood Walk Scores Top 10"
  ,
  margin: {
    l: 300,
    r: 100,
    t: 100,
    b: 100
  }
};

var layout2 = {
  title: "Neighborhood Transit Scores Top 10"
  ,
  margin: {
    l: 300,
    r: 100,
    t: 100,
    b: 100
  }
};

var layout3 = {
  title: "Neighborhood Bike Scores Top 10"
  ,
  margin: {
    l: 300,
    r: 100,
    t: 100,
    b: 100
  }
};

// Render the plot
Plotly.newPlot("plot", [trace1], layout1);
Plotly.newPlot("plot2", [trace2], layout2);
Plotly.newPlot("plot3", [trace3], layout3);


