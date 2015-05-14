/**
 * Created by Oscar on 02.04.15.
 */

//Variables Graph --------------------------------------------------------------
var widthGraph, heightGraph, timeLineHeight = 70;

//Variables Network
var sourceData, links = [], items;
var force;

var graphLinks, graphItems, linksEnter, nodesEnter;

//Variables TimeLine --------------------------------------------------------------

var minDate, maxDate, actualDate, positionDate;
var customTimeFormat;
var valuesX, axiX;
var zoomTimeLine;
var posYTimeline;

var drag, positionSelected, valuesXposition;

//Variables Graphiques ------------------------------------------------------------------------------

var graph, zoneTimeLine, zoneNetwork;

// Draw graphique
draw();

function draw(){

    configureParamsGraph();
    configureTimeLine();
    configureNetwork();
    createNetwork();
    createLineTime();

}

//Functions Creation Graph ------------------------------------------------------------------------------

function configureParamsGraph(){

    widthGraph = 960
    heightGraph = 500

    //Plan graph ----------------
    graph = d3.select("#timeNet")
        .append("svg")
        .attr("width", widthGraph)
        .attr("height", heightGraph)
        .attr("class","timeline");

}

function configureNetwork(){

    force = d3.layout.force()
        .charge(-120)
        .linkDistance(30)
        .size([widthGraph, (heightGraph - timeLineHeight - 50)]); //50 menos para margen

    //configure Data
    //sourceData = networkData[0];
    sourceData = networkFriends[0];
    items = sourceData.nodes;

    sourceData.links.forEach(function(e) {

        var sourceNode = sourceData.nodes.filter(function(n) { return n.id === e.source; })[0],
            targetNode = sourceData.nodes.filter(function(n) { return n.id === e.target; })[0];
        links.push({id: e.id, source: sourceNode, target: targetNode, date: e.date });
    });

    force.nodes(items)
        .links(links)
        .start();




}

function configureTimeLine(){

    posYTimeline = heightGraph-timeLineHeight;
    minDate = new Date(2007, 11, 31);
    maxDate = new Date(2015, 11, 31);

    //actualDate = new Date(2015,3,28);
    positionDate = new Date(2014,3,28);
    actualDate = new Date();

    customTimeFormat = d3.time.format.multi([
        ["%H:%M", function(d) { return d.getHours(); }],
        ["%a %d", function(d) { return d.getDay() && d.getDate() != 1; }],
        ["%d", function(d) { return d.getDate() != 1; }],
        ["%b", function(d) { return d.getMonth(); }],
        ["%Y", function() { return true; }]
    ]);

    valuesX = d3.time.scale()
        .range([0, widthGraph])
        .domain([minDate, maxDate]);

    axiX = d3.svg.axis()
        .scale(valuesX)
        .tickFormat(customTimeFormat)
        .tickSize(20,0);

    zoomTimeLine = d3.behavior.zoom()
        .x(valuesX)
        .scaleExtent([0.1, 1000])
        .on("zoom", zoomed);

}

var divTooltip = d3.select("#timeNet").append("div").attr("class", "tooltip").style("opacity", 0);
var tooltipText = divTooltip.append("div")
    .attr("class", "textTool");

var divTooltipDate = d3.select("#timeNet").append("div").attr("class", "tooltipDate").style("opacity", 0);
var tooltipTextDate = divTooltipDate.append("div")
    .attr("class", "dateTool");

function createNetwork(){

    //Zone Network ------------------------------------------------------------------------------
    zoneNetwork = graph.append("g")
        .attr("class", "zoneNetwork");

    graphLinks = zoneNetwork.append("g")
        .attr("class", "netLinks")
        .attr("transform", "translate(0,20)"); // +20 magin top

    graphItems = zoneNetwork.append("g")
        .attr("class", "netItems");

    //Lines Connect
    linksEnter = graphLinks.selectAll("links")
        .data(links)
        .enter().append("line")
        .attr("class", "link")
        .attr("id", function(d) { return d.id; })
        .attr("x1", function(d) { return valuesX(d.source.date); })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return valuesX(d.target.date); })
        .attr("y2", function(d) { return d.target.y; })
        .style("opacity", 0)
        .on("mouseover", function(d) {
            //console.log(d);
            var posX = d3.event.x, posY = d3.event.y;
            posX = posX + 20;
            posY = posY - 20;

            divTooltipDate.transition()
                .duration(200)
                .style("opacity", 1).style("left", posX + "px")
                .style("top", posY + "px");
            tooltipTextDate.html("Date: "+d.date+"<br>"+
                                "Item 1: "+ d.source.name+"<br>"+
                                "Item 2: "+ d.target.name)
        })
        .on("mouseout", function(d) {
            divTooltipDate.transition()
                .duration(500)
                .style("opacity", 0);
        });;

    //Items Network
    nodesEnter = graphItems.selectAll("nodes")
        .data(items)
        .enter().append("circle")
        .attr("class", "item")
        .attr("id", function(d) { return d.id })
        .attr("r","10")
        .attr('stroke-width',2)
        .attr("cx", function(d) { return valuesX(d.date); })
        .attr("cy", function(d) { return (d.y +20 ); }) // +20 por la posicion del grupo items
        .style("opacity", 0)
        .on("mouseover", function(d) {

             var posX = d3.event.x, posY = d3.event.y;
             posX = posX + 20;
             posY = posY - 20;

             divTooltip.transition()
             .duration(200)
             .style("opacity", 1).style("left", posX + "px")
             .style("top", posY + "px");
             tooltipText.html("Title: "+d.name)
        })
        .on("mouseout", function(d) {
            divTooltip.transition()
                .duration(500)
                .style("opacity", 0);
        });
}

function createLineTime(){

    var actualLineTime, positionLineTime;

    var infoTimeLine, timeLineZone;
    var infoStartDate, infoEndDate, infoActualDate;
    var sizeLineTime, sizeInfoLineTime = 20;
    var pos1, pos2, pos3;

    pos1 = 0 + 5;
    pos2 = (widthGraph / 3) + 5;
    pos3 = ((widthGraph / 3) + pos2) + 5;

    pos2 = 380;
    pos3 = 800;

    sizeLineTime = timeLineHeight -sizeInfoLineTime;

    //Zone TimeLine ------------------------------------------------------------------------------
    zoneTimeLine = graph.append("g")
        .attr("class", "zoneTimeLine")
        .attr("transform", "translate(0,"+ posYTimeline +")");

    //Information LineTime
    infoTimeLine = zoneTimeLine.append("g")
        .attr("class", "infoTimeline");

    infoTimeLine.append("rect")
        .attr("class","infoZoneTime")
        .attr("width", widthGraph)
        .attr("height", sizeInfoLineTime);

    infoTimeLine.append("line")
        .attr("class", "lineAxeX")
        .attr("x1", 0)
        .attr("y1", 0)
        .attr("x2", widthGraph)
        .attr("x1", 0);

    infoStartDate = infoTimeLine.append("g")
        .attr("class", "startDate")
        .attr("transform", "translate("+pos1+",15)");

    infoStartDate.append("text").attr("class", "textStartDate")
        .text(function(d) { return "Start Date: "+formatDate(valuesX.domain()[0]);  });

    infoActualDate = infoTimeLine.append("g")
        .attr("class", "actualDate")
        .attr("transform", "translate("+pos2+",15)");

    infoActualDate.append("text").attr("class", "textActualDate")
        .text(function(d) { return "Current Date: "+formatDate(positionDate);  });

    infoEndDate = infoTimeLine.append("g")
        .attr("class", "endDate")
        .attr("transform", "translate("+pos3+",15)");

    infoEndDate.append("text").attr("class", "textEndDate")
        .text(function(d) { return "End Date: "+formatDate(valuesX.domain()[1]);  });

    //Creation LineTime
    timeLineZone = zoneTimeLine.append("g")
        .attr("class", "timelineZone")
        .attr("transform", "translate(0,"+ sizeInfoLineTime +")")
        .call(zoomTimeLine)
        .on("mousemove", function () {
            var xCoord = d3.mouse(this)[0];
            dragmovePosition(xCoord);
        });

    timeLineZone.append("rect")
        .attr("class","zoneTime")
        .attr("width", widthGraph)
        .attr("height", sizeLineTime);

    timeLineZone.append("g")
        .attr("class", "x axis")
        .call(axiX)
        .selectAll("text")
        .attr("y", 6)
        .attr("x", 6)
        .style("text-anchor", "start");

    timeLineZone.selectAll("g.x.axis path")
        .attr("class", "lineAxeX");

    timeLineZone.selectAll("g.x.axis g.tick line")
        .attr("class", "axesTimeLine");

    //Actual Position LineTime
    actualLineTime = timeLineZone.append("g")
        .attr("class", "actualLineTime")
        .attr("transform", function(){
            var posline = valuesX(actualDate);
            return "translate("+posline+",0)";
        });

    actualLineTime.append("line")
        .attr("class", "lineActualTime")
        .attr("y2", sizeLineTime);


    //Position in LineTime
    positionLineTime = timeLineZone.append("g")
        .attr("class", "positionLineTime")
        .attr("transform", function(){
            var posline = valuesX(positionDate);
            return "translate("+posline+",0)";
        });

    positionLineTime.append("line")
        .attr("class", "linePositionTime")
        .attr("y1", 25)
        .attr("y2", sizeLineTime);

    positionLineTime.append("circle")
        .attr("class", "circlePositionTime")
        .attr("cy", 25 )
        .attr("r", 5)

}

///---- TeXTO Borrar despues

var crossHairTextData1 = graph.append("g")
    .attr("id", "crosshair_text");

crossHairTextData1.append("text")
    .style("background", "white")
    .style("fill", "black");

var div = d3.select("#timeNet").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

//Functions ------------------------------------------------------------------------------

function zoomed() {

    var xCoord = d3.mouse(this)[0];
    d3.select(".positionLineTime").attr("transform", "translate(" + xCoord + ",0)");

    //Actually Date
    d3.select(".textStartDate")
        .text(function(d) { return "Start Date: "+formatDate(valuesX.domain()[0]);  });

    d3.select(".textEndDate")
        .text(function(d) { return "End Date: "+formatDate(valuesX.domain()[0]);  });

//    textActualDate


/*
    console.log(valuesX.domain());
    console.log(valuesX.range());
    console.log(zoomTimeLine.scale());
    console.log(zoomTimeLine.translate()); */
    /*console.log(d3.event.scale, d3.event.translate[0]);

     valuesX = d3.time.scale()
     .range([0, widthGraph])
     .domain([minDate, maxDate]);

     axiX = d3.svg.axis()
     .scale(valuesX)
     .tickFormat(customTimeFormat)
     .tickSize(20,0);

     zoomTimeLine = d3.behavior.zoom()
     .x(valuesX)
     .scaleExtent([0.1, 1000])
     .on("zoom", zoomed);
*/

        zoneTimeLine.select(".x.axis").call(axiX).selectAll("text")
            .attr("y", 6)
            .attr("x", 6).style("text-anchor", "start");

        //Line Actual TimeLine
        if(valuesX(actualDate) > 0){
            zoneTimeLine.select(".actualLineTime")
                .attr("transform", function(){
                    return "translate("+valuesX(actualDate)+",0)";
                })
                .style("opacity",1);
        }else{
            zoneTimeLine.select(".actualLineTime")
                .attr("transform", function(){
                    return "translate("+valuesX(actualDate)+",0)";
                })
                .style("opacity",0);
        }

        zoneNetwork.selectAll(".link")
            .attr("x1", function (d) {
                return valuesX(d.source.date);
            })
            .attr("x2", function (d) {
                return valuesX(d.target.date);
            });

        zoneNetwork.selectAll(".item")
            .attr("cx", function (d) {
                return valuesX(d.date);
            });
}

function formatDate(date){
    var dd, mm, yyyy, dateFormat;
    dd = date.getDate();
    mm = date.getMonth()+1;
    yyyy = date.getFullYear();

    if(dd<10) {
        dd='0'+dd
    }

    if(mm<10) {
        mm='0'+mm
    }

    dateFormat = dd+'/'+mm+'/'+yyyy;
    return dateFormat;
}

function dragmovePosition(xCoord) {

    var dateConnection, dateCurrent;

    dateCurrent = valuesX.invert(xCoord);
    dateCurrent = formatDate(dateCurrent);


    d3.select(".textActualDate")
        .text(function(d) { return "Current Date: "+dateCurrent;  });

    d3.select(".positionLineTime").attr("transform", "translate(" + xCoord + ",0)");

    links.forEach(function(e) {
        if (e.date <= valuesX.invert(xCoord)) {
            zoneNetwork.selectAll(".link").each(function (valuesLink) {
                if (e.id == valuesLink.id) {
                    //console.log("id: "+e.id+" date: "+dateCurrent);
                    d3.select(this)
                        .transition()
                        .style("opacity", 1);

                    zoneNetwork.selectAll(".item").each(function (valuesNode) {
                        var nodeItem = this;
                        if(valuesNode.id == valuesLink.source.id){

                            d3.select(nodeItem)
                                .transition()
                                .style("opacity", 1);
                        }
                        if(valuesNode.id == valuesLink.target.id){
                            d3.select(nodeItem)
                                .transition()
                                .style("opacity", 1);
                        }

                    });

                }

            });
        }else{
            zoneNetwork.selectAll(".link").each(function (valuesLink) {
                if (e.id == valuesLink.id) {
                    d3.select(this)
                        .transition()
                        .style("opacity", 0);

                    /*
                    zoneNetwork.selectAll(".item").each(function (valuesNode) {
                        var nodeItem = this;
                        var countLink;

                        if(valuesNode.id == valuesLink.source.id){

                            d3.select(nodeItem)
                                .transition()
                                .style("opacity", 0);

                        }
                        if(valuesNode.id == valuesLink.target.id){
                            d3.select(nodeItem)
                                .transition()
                                .style("opacity", 0);
                        }

                    }); */

                }
            });
        }
    });

/*
    zoneNetwork.selectAll(".link").each(function(values){
        var posXitem = valuesX(values.date);

        if(posXitem <= xCoord){
            d3.select(this)
                .transition()
                .style("opacity",1);


        }else{
            d3.select(this)
                .transition()
                .style("opacity",0);
        }

    });
*/

    /*
    links.forEach(function(valueLink) {
        dateConnection = valueLink.date;
        dateConnection = formatDate(dateConnection);

        if(dateConnection == dateCurrent ){

            d3.selectAll(".link").each(function(value) {

                if(value.id == valueLink.id){

                    console.log(dateConnection+" = "+dateCurrent+" id: "+valueLink.id);

                    d3.select(this).transition().duration(800).style("opacity", 1);
                        //.data(links)
                        /*.attr("x1", function(d) { console.log(d); console.log(valuesX(d.source.date)); return valuesX(d.source.date); })
                        .attr("y1", function(d) { console.log(d.source.y); return d.source.y; })
                        .attr("x2", function(d) { console.log(valuesX(d.target.date)); return valuesX(d.target.date); })
                        .attr("y2", function(d) { console.log(d.target.y); return d.target.y; });*/
    /*                }

            });

        }
    }); */

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

