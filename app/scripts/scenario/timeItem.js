/**
 * Created by Oscar on 02.04.15.
 */
var maxDate = d3.max(data, function(d) { return new Date(d.date); });
var minDate = d3.min(data, function(d) { return new Date(d.date); });
var minDate = new Date(2013, 11, 31);
var maxDate = new Date(2015, 11, 31);

var margin = {top: 20, right: 20, bottom: 30, left: 100},
    width = 960,
    height = 200,
    timeHeight = 50,
    posYTimeline = height-timeHeight;

var x = d3.time.scale()
    .range([0, (width-margin.left)])
    .domain([minDate, maxDate]);

var xAxis = d3.svg.axis()
    .scale(x);

var y = d3.scale.linear()
    .range([(height - timeHeight ), 0])
    .domain([0, 3]);

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .ticks(3)
    .tickSize(margin.left);

var zoom = d3.behavior.zoom()
    .x(x)
    .scaleExtent([1, 100])
    .on("zoom", zoomed);

//Plan graph
var graph = d3.select("#timeItem")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("class","timeline")
    .append("g")
    .attr("transform", "translate(" + margin.left + ",0)");

graph.append("rect")
    .attr("class","zoneTime")
    .attr("width", (width - margin.left))
    .attr("height", timeHeight)
    .attr("y", posYTimeline)
    .call(zoom);


//timeline
graph.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0,"+ posYTimeline +")")
    .call(xAxis);

var item = graph.append("g")
    .attr("class","data")
    .selectAll(".bar")
    .data(data)
    .enter().append("circle")
    .attr("class", "item")
    .attr("cx", function(d) { return x(new Date(d.date));  })
    .attr("cy", function(d) {
        console.log(d);
        var posy;
        posy = y(new Date(d.categorie)) + 25; return posy;
    })
    .attr("r","5");

var text = graph.append("g")
    .attr("class","dataInfo")
    .selectAll(".bar")
    .data(data)
    .enter().append("text")
    .attr("class", "itemText")
    .attr("x", function(d) {
        var posx;
        posx = x(new Date(d.date)) + 10; return posx;
    })
    .attr("y", function(d) {
        var posy;
        posy = y(new Date(d.categorie)) + 25; return posy;
    })
    .text(function(d) { return d.title;  });


graph.append("rect")
    .attr("class","zoneCategories")
    .attr("width", margin.left)
    .attr("height", height)
    .attr("x", -margin.left)
    .attr("y", "0")
    .call(zoom);

graph.append("g")
    .attr("class", "y axis")
    .call(yAxis);

graph.append("text").attr("class", "textCategories")
    .attr("x", -margin.left + 15)
    .attr("y", 30)
    .text("Sports");

graph.append("text").attr("class", "textCategories")
    .attr("x", -margin.left + 15)
    .attr("y", 80)
    .text("News");

graph.append("text").attr("class", "textCategories")
    .attr("x", -margin.left + 15)
    .attr("y", 130)
    .text("Categorie");


function zoomed() {
    graph.select(".x.axis").call(xAxis);
    graph.selectAll(".item").attr("cx", function(d) { return x(new Date(d.date));  })
    graph.selectAll(".itemText").attr("x", function(d) { var posx;
        posx = x(new Date(d.date)) + 10; return posx;  })
}
