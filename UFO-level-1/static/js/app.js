// from data.js
var tableData = data;

// YOUR CODE HERE!

var tbody = d3.select("tbody");

data.forEach((sightings) => {
    var row = tbody.append("tr");
    Object.entries(sightings).forEach(([key,value]) => {
        var cell = row.append("td");
        cell.text(value);
    });
});