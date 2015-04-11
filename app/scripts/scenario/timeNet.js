/**
 * Created by Oscar on 02.04.15.
 */
//var maxDate = d3.max(data, function(d) { return new Date(d.date); });
//var minDate = d3.min(data, function(d) { return new Date(d.date); });
var minDate = new Date(2000, 0, 1);
var maxDate = new Date(2020, 11, 31);

var margin = {top: 20, right: 20, bottom: 30, left: 100},
    width = 960,
    height = 500,
    timeHeight = 50,
    posYTimeline = height-timeHeight;

//Config Timeline
var x = d3.time.scale()
    .range([0, width])
    .domain([minDate, maxDate]);

var xAxis = d3.svg.axis()
    .scale(x);

var zoom = d3.behavior.zoom()
    .x(x)
    .scaleExtent([1, 100])
    .on("zoom", zoomed);

//Config Tree
var i = 0,
    duration = 750,
    root;

var tree = d3.layout.tree()
    .size([(height-timeHeight), width]);

var diagonal = d3.svg.diagonal()
    .source(function(d) { return {"x": d.source.x, "y": x((d.source.date)) }; })
    .target(function(d) { return {"x":d.target.x, "y": x((d.target.date)) }; })
    .projection(function(d) {return [d.y, d.x];});


//Plan graph
var graph = d3.select("#timeNet")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("class","timeline")
    .append("g")
    .attr("transform", "translate(0,0)");

//timeline
graph.append("rect")
    .attr("class","zoneTime")
    .attr("width", width)
    .attr("height", timeHeight)
    .attr("y", posYTimeline)
    .call(zoom);

graph.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0,"+ posYTimeline +")")
    .call(xAxis);

//------------------------------------------------------------------------------------- Tree

root = dataTree[0];
//root.x0 = height / 2;
//root.y0 = 0;

//update(root);

// Compute the new tree layout.
var nodes = tree.nodes(root),
    links = tree.links(nodes);

nodes.forEach(function(d) { d.y = d.depth * 180; });

// Update the nodes…
var node = graph.selectAll("node")
    .data(nodes, function(d) { return d.id || (d.id = ++i); });

// Enter any new nodes at the parent's previous position.
var nodeEnter = node.enter().append("g")
    .attr("class", "node")

nodeEnter.append("circle")
    .attr("r", 1e-6)
    .style("fill", function(d) { return d._children ? "lightsteelblue" : "#fff"; });

nodeEnter.append("text")
    .attr("x", function(d) { return d.children || d._children ? -13 : 13; })
    .attr("dy", ".35em")
    .attr("text-anchor", function(d) { return d.children || d._children ? "end" : "start"; })
    .text(function(d) { return d.name; })
    .style("fill-opacity", 1e-6);

// Transition nodes to their new position.
var nodeUpdate = node.transition()
    .duration(duration)
    .attr("transform", function(d) { return "translate(" +  x(new Date(d.date)) + "," + d.x + ")"; }); //d.y

nodeUpdate.select("circle")
    .attr("r", 10)
    .style("fill", function(d) { return d._children ? "lightsteelblue" : "#fff"; });

nodeUpdate.select("text")
    .style("fill-opacity", 1);

// Transition exiting nodes to the parent's new position.
var nodeExit = node.exit().transition()
    .duration(duration)
    .remove();

nodeExit.select("circle")
    .attr("r", 1e-6);

nodeExit.select("text")
    .style("fill-opacity", 1e-6);

// Update the links…
var link = graph.selectAll("path.link")
    .data(links, function(d) { return d.target.id; });

// Enter any new links at the parent's previous position.
link.enter().insert("path", "g")
    .attr("class", "link")
    .attr("d", function(d) {
        var o = {x: 0, y: 0};  //Pos Initial primer node
        return diagonal({source: o, target: o});
    });

// Transition links to their new position.
link.transition()
    .duration(duration)
    .attr("d", diagonal);


function zoomed() {
    graph.select(".x.axis").call(xAxis);
    graph.selectAll(".node").attr("transform", function(d) { return "translate(" +  x(new Date(d.date)) + "," + d.x + ")"; })
    graph.selectAll("path.link").attr("d", diagonal)
}

