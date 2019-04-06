// Assign the data from `data.js` to a descriptive variable
var tableData = data;

// console.log(tableData);


// Get a reference to the table body
var tbody = d3.select("tbody");

// Add all the data to the site so user can "scroll search" the data

// For each listing add a row to the table
tableData.forEach((listing) => {
  var row = tbody.append("tr");

  // for each key add table data
  Object.entries(listing).forEach(([key, value]) => {  
    var cell = row.append("td");
    cell.text(value);
  });
  
});

// Select the submit button
var submit = d3.select("#filter-btn");

submit.on("click", function() {

  // Prevent the page from refreshing
d3.event.preventDefault();

  // clear table table body if it already exists - 2 ways
if (!tbody.empty()){
  tbody.html('');
}

  // Select the input element and get the raw HTML node
  var inputElement1 = d3.select("#price");
  var inputElement2 = d3.select("#beds");
  var inputElement3 = d3.select("#bathrooms");
  var inputElement4 = d3.select("#accomodates");
  var inputElement5 = d3.select("#neighborhood");

  // Get the value property of the input element and lowercase any capital letters
  var inputValue1 = inputElement1.property("value").toLowerCase();
  var inputValue2 = inputElement2.property("value").toLowerCase();
  var inputValue3 = inputElement3.property("value").toLowerCase();
  var inputValue4 = inputElement4.property("value").toLowerCase();
  var inputValue5 = inputElement5.property("value").toLowerCase();

console.log(inputValue1);
console.log(inputValue2);
console.log(inputValue3);
console.log(inputValue4);
console.log(inputValue5);

// Filter data using a sequence of conditional statements, checking for empty search fields
// If the user input is empty set filtered data to the full data set so that the filter does not
//try to look for something that's not there
if(inputValue1 ==='') {
  var filteredData1 = tableData;
}
else {
  filteredData1 = tableData.filter(table => table.price == inputValue1);
}

console.log(filteredData1);

  if(inputValue2==='') {
  var filteredData2 = tableData;
}
else {
  filteredData2 = tableData.filter(table => table.beds == inputValue2);
}
console.log(filteredData2);

if(inputValue3==='') {
  var filteredData3 = tableData;
}
else {
  filteredData3 = tableData.filter(table => table.bathrooms == inputValue3);
}

console.log(filteredData3);

if(inputValue4==='') {
  var filteredData4 = tableData;
}
else {
  filteredData4 = tableData.filter(table => table.accomodates == inputValue4);
}
console.log(filteredData4);

if(inputValue5==='') {
  var filteredData5 = tableData;
}
else {
  filteredData5 = tableData.filter(table => table.neighborhood == inputValue5);
}
  console.log(filteredData5);

let intersection1 = filteredData1.filter(x => filteredData2.includes(x));
let intersection2 = intersection1.filter(x => filteredData3.includes(x));
let intersection3 = intersection2.filter(x => filteredData4.includes(x));
let intersection4 = intersection3.filter(x => filteredData5.includes(x));

console.log(intersection4)
// For each sighting add a row to the table
intersection4.forEach((ufoData) => {
  var row = tbody.append("tr");

  // for each key add table data
  Object.entries(ufoData).forEach(([key, value]) => {
    var cell = row.append("td");
    cell.text(value);
  });

});
})
