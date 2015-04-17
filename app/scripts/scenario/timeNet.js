/**
 * Created by Oscar on 02.04.15.
 */

//Config Graph --------------------------------------------------------------
var margin = {top: 20, right: 20, bottom: 30, left: 100},
    width = 960,
    height = 500,
    timeHeight = 50,
    posYTimeline = height-timeHeight;

//Config TimeLine --------------------------------------------------------------

//var maxDate = d3.max(data, function(d) { return new Date(d.date); });
//var minDate = d3.min(data, function(d) { return new Date(d.date); });
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
    .range([0, width])
    .domain([minDate, maxDate]);

var xAxis = d3.svg.axis()
    .scale(x)
    .tickFormat(customTimeFormat)
    .tickSize(20,0);

var zoomTimeLine = d3.behavior.zoom()
    .x(x)
    .scaleExtent([0.2, 100])
    .on("zoom", zoomed);

//Config Tree --------------------------------------------------------------
var i = 0,
    duration = 750,
    root;

var tree = d3.layout.tree()
    .size([(height-timeHeight), width]);

var diagonal = d3.svg.diagonal()
    .source(function(d) { return {"x": d.source.x, "y": x((d.source.date)) }; })
    .target(function(d) { return {"x":d.target.x, "y": x((d.target.date)) }; })
    .projection(function(d) {return [d.y, d.x];});


//Plan graph ------------------------------------------------------------------------------
var graph = d3.select("#timeNet")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("class","timeline");
//.append("g")
//.attr("transform", "translate(0,0)");

//Zone Net ------------------------------------------------------------------------------

var zoneNet = graph.append("g")
    .attr("class", "zoneNet")
    .append("g")
    .attr("transform", "translate(0,0)");

root = dataTree[0];

var nodes = tree.nodes(root),
    links = tree.links(nodes);

nodes.forEach(function(d) { d.y = d.depth * 180; });

// Update the nodes…
var node = zoneNet.selectAll("node")
    .data(nodes, function(d) { return d.id || (d.id = ++i); });

// Enter any new nodes at the parent's previous position.
var nodeEnter = node.enter()
    .append("g")
    .attr("class", "node")
    .attr("transform", function(d) { return "translate(" +  x(new Date(d.date)) + "," + d.x + ")"; });

//Circle Node
nodeEnter.append("circle")
    .attr("r", 10)
    .attr("id", function(d) { return "nodeId"+d.id;  })
    .style("fill", "#fff")
    .on("mouseover", function(d) { mouseOverNode(d) })
    .on("mouseout", function(d) { mouseOutNode(d) });


//Text Node
nodeEnter.append("text")
    .attr("id", function(d) { return "textNodeId"+d.id;  })
    .attr("x", function(d) { return d.children || d._children ? -13 : 13; })
    .attr("dy", ".35em")
    .attr("text-anchor", function(d) { return d.children || d._children ? "end" : "start"; })
    .style("fill-opacity", "0")
    .text(function(d) { return d.name; });

// Connections Node Line
var link = zoneNet.selectAll("path.link")
    .data(links, function(d) { return d.target.id; });

link.enter().insert("path", "g")
    .attr("class", "link")
    .attr("d", diagonal);

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
    graph.selectAll(".node").attr("transform", function(d) { return "translate(" +  x(new Date(d.date)) + "," + d.x + ")"; })
    graph.selectAll("path.link").attr("d", diagonal)
}

function mouseOverNode(d){
    var circleNode = "#nodeId"+ d.id;
    var TextNode = "#textNodeId"+ d.id;

    zoneNet.select(circleNode)
        .transition()
        .style("fill","steelblue")
        .attr("r", 15);

    zoneNet.select(TextNode)
        .transition()
        .attr("x", function(d) { return d.children || d._children ? -18 : 18; })
        .style("fill-opacity",1);
}
function mouseOutNode(d){
    var circleNode = "#nodeId"+ d.id;
    var TextNode = "#textNodeId"+ d.id;
    zoneNet.select(circleNode)
        .transition()
        .style("fill","#ffffff")
        .attr("r", 10);
    zoneNet.select(TextNode)
        .transition()
        .attr("x", function(d) { return d.children || d._children ? -12 : 12; })
        .style("fill-opacity",0);
}
