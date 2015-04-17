/**
 * Created by Oscar on 08.04.15.
 */

//Config Graph --------------------------------------------------------------

var margin = {top: 20, right: 20, bottom: 30, left: 100},
    width = 960,
    height = 500,
    timeHeight = 50,
    mapZoneHeight = height - timeHeight;
posYTimeline = height-timeHeight;

//Config TimeLine --------------------------------------------------------------

var minDate = new Date(2013, 11, 31);
var maxDate = new Date(2015, 11, 31);

var customTimeFormat = d3.time.format.multi([
    ["%H:%M", function(d) { return d.getHours(); }],
    ["%a %d", function(d) { return d.getDay() && d.getDate() != 1; }],
    ["%d", function(d) { return d.getDate() != 1; }],
    ["%b", function(d) { return d.getMonth(); }],
    ["%Y", function() { return true; }]
]);

var x = d3.time.scale()
    .range([0, (width-margin.left)])
    .domain([minDate, maxDate]);

var xAxis = d3.svg.axis()
    .scale(x)
    .tickFormat(customTimeFormat)
    .tickSize(20,0);

var zoomTimeLine = d3.behavior.zoom()
    .x(x)
    .scaleExtent([0.1, 1000])
    .on("zoom", zoomed);

//Config Map World --------------------------------------------------------------
var projection = d3.geo.mercator()
    .translate([width / 2, height / 2])
    .scale((width - 1) / 2 / Math.PI);

var path = d3.geo.path()
    .projection(projection);

var tooltip = d3.select("#map").append("div")
    .attr("class", "tooltip");

function redraw() {
    map.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
}

queue()
    .defer(d3.json, "../scripts/maps/vector/world-50m.json")
    .defer(d3.tsv, "../scripts/maps/data/world-country-names.tsv")
    .defer(d3.json, "../scripts/maps/data/cities_COL.json")
    .await(drawMap);

var countries, neighbors, mycities, pos, tryit, dato, latitude, longitude, coor, nameCity;

//Plan graph ------------------------------------------------------------------------------
var graph = d3.select("#timeMap")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("class","timeline");
//    .append("g")
//   .attr("transform", "translate(0,0)");

//Zone Map ------------------------------------------------------------------------------

var zoneMap = graph.append("g")
    .attr("class", "zoneMap")
    .append("g")
    .attr("transform", "translate(0,0)");

zoneMap.append("rect")
    .attr("class","zoneMap")
    .attr("width", width)
    .attr("height", mapZoneHeight)
    .attr("y", 0);

var map = zoneMap.append("g")
    .call(d3.behavior.zoom()
        .scaleExtent([0.1, 1000])
        .on("zoom", redraw));


function drawMap(error,world, names, cities) {

    if (error) return console.error(error);

    //console.log(world);

    countries = topojson.feature(world, world.objects.countries).features;
    mycities = topojson.feature(cities, cities.features);

    pos = projection(10, 10);


    countries.forEach(function (d) {
        tryit = names.filter(function (n) {
            return d.id == n.id;
        })[0];
        if (typeof tryit === "undefined") {
            d.name = "Undefined";
        } else {
            d.name = tryit.name;
        }
    });


    var country = map.selectAll(".county")
        .data(countries)
        .enter().append("path")
        .attr("class", "county")


        .attr("class", function (d) {
            return d.name;
        })

        .attr("d", path);

    //Show/hide tooltip
    country
        .on("mousemove", function (d, i) {
            var mouse = d3.mouse(map.node()).map(function (d) {
                return parseInt(d);
            });

            tooltip
                .classed("hidden", false)
                .attr("style", "left:" + (mouse[0] + 25) + "px;top:" + mouse[1] + "px")
                .html(d.name)
        })
        .on("mouseout", function (d, i) {
            tooltip.classed("hidden", true)
        });


    cities.features.forEach(function (d) {

        latitude = d.geometry.coordinates[1];
        longitude = d.geometry.coordinates[0];

        coor = projection([longitude, latitude]);

        map.append("svg:circle")
            .attr("class", "point")
            .attr("cx", coor[0])
            .attr("cy", coor[1])
            .attr("r", 0.5)

        nameCity = d.properties.NAME;
        map.append("svg:text")
            .attr("x", coor[0] + 2)
            .attr("y", coor[1] + 1)
            .attr("class", "nameCity")
            .text(nameCity);
    });
}

map.append("rect")
    .attr("class","zoneMap")
    .attr("width", width)
    .attr("height", mapZoneHeight)
    .attr("y", 0);

//Zone TimeLine ------------------------------------------------------------------------------
var zoneTimeLine = graph.append("g")
    .attr("class", "zoneTimeLine")
    .append("g")
    .attr("transform", "translate(0,0)")
    .call(zoomTimeLine);

zoneTimeLine.append("rect")
    .attr("class","zoneTime")
    .attr("width", width)
    .attr("height", timeHeight)
    .attr("y", posYTimeline);

zoneTimeLine.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0,"+ posYTimeline +")")
    .call(xAxis)
    .selectAll("text")
    .attr("y", 6)
    .attr("x", 6)
    .style("text-anchor", "start");

zoneTimeLine.selectAll("g.x.axis path")
    .attr("class", "lineAxeX");

zoneTimeLine.selectAll("g.x.axis g.tick line")
    .attr("class", "axesTimeLine");

//Functions ------------------------------------------------------------------------------

function zoomed() {
    graph.select(".x.axis").call(xAxis).selectAll("text")
        .attr("y", 6)
        .attr("x", 6).style("text-anchor", "start");

}

function zoomedMap() {
    //console.log("zoom map");
    map.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
}


