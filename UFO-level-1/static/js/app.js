// from data.js
var tableData = data;

// YOUR CODE HERE!
function capWords(p1) {
    p1 = p1.split(' ')
            .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
            .join(' ');
    return p1; 
};

var tbody = d3.select("tbody");

function seeAll() {
    tbody.selectAll("tr").remove();
    d3.select("#datetime").property("value", "");
    data.forEach((sighting) => {
        var row = tbody.append("tr");
        Object.entries(sighting).forEach(([key,value]) => {
            var cell = row.append("td");
            if (key == "city") {
                cell.text(capWords(value));
            } else if (key == "state") {
                cell.text(value.toUpperCase());
            } else if (key == "country") {
                cell.text(value.toUpperCase());
            } else {
                cell.text(value);
            };
        });
    });
};

seeAll();

var button = d3.select("#filter-btn");
var inputBox = d3.select("#form");
var resetButton = d3.select("#all-btn")

button.on("click", runEnter);
inputBox.on("submit",runEnter);
resetButton.on("click", seeAll);

function runEnter() {
    d3.event.preventDefault();
    tbody.selectAll("tr").remove();
    var inputValue = d3.select("#datetime").property("value");
    var filteredData = tableData.filter(sighting => sighting.datetime === inputValue);
    filteredData.forEach((sighting) => {
        var row = tbody.append("tr");
        Object.entries(sighting).forEach(([key,value]) => {
            var cell = row.append("td");
            if (key == "city") {
                cell.text(capWords(value));
            } else if (key == "state") {
                cell.text(value.toUpperCase());
            } else if (key == "country") {
                cell.text(value.toUpperCase());
            } else {
                cell.text(value);
            };
        });
    });
}