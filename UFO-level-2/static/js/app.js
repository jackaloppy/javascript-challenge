// from data.js
var tableData = data;

// YOUR CODE HERE!
function capWords(p1) {
    p1 = p1.split(' ')
            .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
            .join(' ');
    return p1; 
};

// Function to parse and format date so that I can use calendar input
function dateFormater (p1) {
    var parser = d3.timeParse("%m/%e/%Y");
    var dateFormat = d3.timeFormat("%Y-%m-%d");
    return dateFormat(parser(p1));
};

// Function to sort object by key, so that they showed in dropdown alphabetically.
function sortObj(obj) {
    return Object.keys(obj).sort().reduce(function (result, key) {
      result[key] = obj[key];
      return result;
    }, {});
};

// Groupby city based on state and country.
// NOTE: cities are in list and HAVE duplicates. Will remove later.
let locationObject = tableData.reduce((c, v) => {
    c[v.country] = c[v.country] || {}; 
    c[v.country][v.state] = c[v.country][v.state] || [];
    c[v.country][v.state].push(v.city);
    return c;
}, {});

//Find unique shape and put them into an array.
const us = [...new Set(tableData.map(item => item.shape))].sort();

// Event to perform cascading dropdown
window.onload = function() {
    var countrySel = d3.select("#country").node();
    var stateSel = d3.select("#state").node();
    var citySel = d3.select("#city").node();
    var shapeSel = d3.select("#shape").node();

    for (var i = 0; i < us.length; i++) {
        shapeSel.options[shapeSel.options.length] = new Option(us[i], us[i]);
      };

    for (var x in sortObj(locationObject)) {
      countrySel.options[countrySel.options.length] = new Option(x.toUpperCase(), x);
    };
    countrySel.onchange = function() {
      //empty Chapters- and Topics- dropdowns
      stateSel.length = 1;
      citySel.length = 1;
      //display correct values
      for (var y in sortObj(locationObject[this.value])) {
        stateSel.options[stateSel.options.length] = new Option(y.toUpperCase(), y);
      };
    };
    stateSel.onchange = function() {
      //empty Chapters dropdown
      citySel.length = 1;
      //display correct values
      var z = locationObject[countrySel.value][this.value];
      // Duplicate cities were removed from list.
      var uz = [...new Set(z)].sort();
      for (var i = 0; i < uz.length; i++) {
        citySel.options[citySel.options.length] = new Option(capWords(uz[i]), uz[i]);
      };
    };
};

var tbody = d3.select("tbody");

function seeAll() {
    tbody.selectAll("tr").remove();
    d3.select("#datetime").property("value", "");
    d3.select("#country").property("value", "");
    d3.select("#state").property("value", "");
    d3.select("#city").property("value", "");
    d3.select("#shape").property("value", "");
    d3.select("#state").node().length = 1;
    d3.select("#city").node().length = 1;
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
    var dateValue = d3.select("#datetime").property("value");
    var countryValue = d3.select("#country").property("value");
    var stateValue = d3.select("#state").property("value");
    var cityValue = d3.select("#city").property("value");
    var shapeValue = d3.select("#shape").property("value");

    if (dateValue !== null && dateValue !== '') {
        var filteredData1 = tableData.filter(sighting => dateFormater(sighting.datetime) === dateValue);
    } else {var filteredData1 = tableData};
    if (countryValue !== null && countryValue !== '') {
        var filteredData2 = filteredData1.filter(sighting => sighting.country === countryValue);
    } else {var filteredData2 = filteredData1};
    if (stateValue !== null && stateValue !== '') {
        var filteredData3 = filteredData2.filter(sighting => sighting.state === stateValue);
    } else {var filteredData3 = filteredData2};
    if (cityValue !== null && cityValue !== '') {
        var filteredData4 = filteredData3.filter(sighting => sighting.city === cityValue);
    } else {var filteredData4 = filteredData3};
    if (shapeValue !== null && shapeValue !== '') {
        var filteredData5 = filteredData4.filter(sighting => sighting.shape === shapeValue);
    } else {var filteredData5 = filteredData4};
    
    filteredData5.forEach((sighting) => {
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