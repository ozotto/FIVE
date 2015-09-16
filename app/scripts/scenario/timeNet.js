/**
 * Created by Oscar on 02.04.15.
 */

//Variables Graph --------------------------------------------------------------
var widthGraph, heightGraph, timeLineHeight = 70;

//Variables Network
var sourceData, links = [], items, countNode = [], items2 = [], links2 = [];
var force;
var sizeRadio = 10, sizeStroke = 2;
var random, randomMin, randomMax, valOld;

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

var tipItem = d3.tip()
    .attr('class', 'd3-tip')
    .offset([-10, 0])
    .html(function(d) {
        return "<strong>Item:</strong> <span style='color:red'>" + d.name + "</span>";
    });

var tipLink = d3.tip()
    .attr('class', 'd3-tip')
    .offset([-10, 0])
    .html(function(d) {
        return "<strong>Item:</strong> <span style='color:red'>" + d.date + "</span>";
    });

// Draw graphique
draw();

var width = $("#timeNet").width(),
    aspect = 500 / 960,
    height = width * aspect;

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
    /*graph = d3.select("#timeNet")
        .append("svg")
        .attr("width", widthGraph)
        .attr("height", heightGraph);
        .attr("class","timeline"); */

    graph = d3.select("#timeNet")
        .append("svg")
        .attr("preserveAspectRatio", "xMidYMid")
        .attr("viewBox", "0 0 " + widthGraph + " " + heightGraph)
        .attr("width", width)
        .attr("height", height)
        .attr("class","timeline");

}

$(window).resize(function() {
    var width = $("#timeNet").width();
    graph.attr("width", width);
    graph.attr("height", width * aspect);
});

function configureNetwork(){

    force = d3.layout.force()
        .charge(-120)
        .linkDistance(30)
        .size([widthGraph, (heightGraph - timeLineHeight - 50)]);
        /*
        .linkDistance(170)
        .linkStrength(1)
        .charge(-80)
        .chargeDistance(1800)
        .friction(0.1)
        .gravity(0.1)
        .theta(0.1)
        .alpha(0.9)
        .size([widthGraph, (heightGraph - timeLineHeight - 50)]);*/
        /*.linkStrength(0.1)

        .linkDistance(20)
        .charge(-30)

        .charge(50)
        .linkDistance(widthGraph/5)*/

    /*
     .charge(-120)
     .linkDistance(30)
     .size([widthGraph, (heightGraph - timeLineHeight - 50)])
     */


    //configure Data
    //sourceData = networkData[0];
    sourceData = networkFriends[0];
    items = sourceData.nodes;
    links = sourceData.links;

    sourceData.links.forEach(function(e) {
        var sourceNode = sourceData.nodes.filter(function(n) { return n.id === e.source; })[0],
            targetNode = sourceData.nodes.filter(function(n) { return n.id === e.target; })[0];
        links.push({id: e.id, source: sourceNode, target: targetNode, date: e.date });
    });

    sourceData.nodes.forEach(function(e) {

        var countSource = 0, countTarget = 0;
        sourceData.links.forEach(function(n) { if(n.source === e.id) countSource++ });
        sourceData.links.forEach(function(n) { if(n.target === e.id) countTarget++ });
        countNode.push({id: e.id, count_source: countSource, count_target: countTarget, sourceVisible: 0, targetVisible: 0});
    });


    force.nodes(items)
        .links(links)
        .start();

    items.forEach(function(e){
        random = Math.floor(Math.random() * 380 ) + 10;
        randomMin = random - 20;
        randomMax = random + 20;
        if(valOld >= randomMin && valOld <= randomMax) random = Math.floor(Math.random() * 380 ) + 10;
        if(random > 410) random = Math.floor(Math.random() * 380 ) + 10;

        items2.push({
            date: e.date,
            id: e.id,
            index: e.index,
            name: e.name,
            px: e.px,
            py: random,
            weight: e.weight,
            x:e.x,
            y: random
        });
        valOld = random
    });

    links.forEach(function(e){

        var sourceNodeData = items2.filter(function(n) { return n.id === e.source.id; })[0],
            targetNodeData = items2.filter(function(n) { return n.id === e.target.id; })[0]

        links2.push({
            date: e.date,
            id: e.id,
            source: sourceNodeData,
            target: targetNodeData
        })
    });

}

function configureTimeLine(){

    posYTimeline = heightGraph-timeLineHeight;
    minDate = new Date(2007, 11, 31);
    maxDate = new Date(2015, 11, 31);

    //actualDate = new Date(2015,3,28);
    positionDate = new Date(2008,0,1);
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

function createNetwork(){

    //Zone Network ------------------------------------------------------------------------------
    zoneNetwork = graph.append("g")
        .attr("class", "zoneNetwork")
        .call(zoomTimeLine);

    zoneNetwork.append("rect")
        .attr("class","backgroundNetwork")
        .attr("width", widthGraph)
        .attr("height", (heightGraph - timeLineHeight) );

    graphLinks = zoneNetwork.append("g")
        .attr("class", "links")
        .attr("transform", "translate(0,20)"); // +20 magin top

    graphItems = zoneNetwork.append("g")
        .attr("class", "items");

    //Items
    nodesEnter = graphItems.selectAll("nodes")
        .data(items2)
        .enter()
        .append("g")
        .attr("class", "item")
        .attr("id", function(d){ return d.id; } )
        .attr("visible", false)
        .call(tipItem)
        .on('mouseover', function(d){
            tipItem.show(d);
        })
        .on("mouseout", function(d){
            tipItem.hide(d);
        });

    //Links
    linksEnter = graphLinks.selectAll("links")
        .data(links2)
        .enter()
        .append("g")
        .attr("class", "link")
        .attr("id", function(d){ return d.id; } )
        .attr("visible", false)
        .call(tipLink)
        .on('mouseover', function(d){
            tipLink.show(d);
        })
        .on("mouseout", function(d){
            tipLink.hide(d);
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

//Functions ------------------------------------------------------------------------------

function zoomed() {

    zoneTimeLine.select(".x.axis").call(axiX).selectAll("text")
        .attr("y", 6)
        .attr("x", 6).style("text-anchor", "start");

    //Current Date
    d3.select(".textStartDate")
        .text(function(d) { return "Start Date: "+formatDate(valuesX.domain()[0]);  });

    d3.select(".textEndDate")
        .text(function(d) { return "End Date: "+formatDate(valuesX.domain()[0]);  });


    //Link
    sizeStroke = 2 * zoomTimeLine.scale();
    if(sizeStroke <= 1) sizeStroke = 1;
    if(sizeStroke >= 5) sizeStroke = 5;

    zoneNetwork.selectAll(".pathLink")
        .attr("x1", function (d) { return valuesX(d.source.date); })
        .attr("x2", function (d) { return valuesX(d.target.date); })
        .style("stroke-width", sizeStroke);

    //Nodes
    sizeRadio = 10 * zoomTimeLine.scale();
    if(sizeRadio >= 40) sizeRadio = 40;
    if(sizeRadio <= 4) sizeRadio = 4;

    zoneNetwork.selectAll(".node")
        .attr("cx", function (d) { return valuesX(d.date); })
        .attr("r", sizeRadio );

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

    var dateCurrent, ctlVisible, ctlVisibleLink;
    var ctlSource, ctlTarget, itemValue;

    dateCurrent = valuesX.invert(xCoord);
    dateCurrent = formatDate(dateCurrent);


    d3.select(".textActualDate").text(function(d) { return "Current Date: "+dateCurrent;  });

    d3.select(".positionLineTime").attr("transform", "translate(" + xCoord + ",0)");

    //Items
    links.forEach(function(e) {
        //Control date link
        if (e.date <= valuesX.invert(xCoord)) {

            //Control date items Target and Source
            if( e.source.date <= valuesX.invert(xCoord) && e.target.date <= valuesX.invert(xCoord) ){

                //Insert Items
                d3.selectAll(".item").each(function (valuesItem) {
                    ctlVisible = d3.select(this).attr("visible");

                    //Source
                    if (e.source.id == valuesItem.id && ctlVisible == "false" ) {

                        d3.select(this)
                            .attr("visible", true)
                            .append("circle")
                            .attr("id", function(d){ return d.id;})
                            .attr("class", "node")
                            .attr("r", sizeRadio)
                            .attr('stroke-width',2)
                            .attr("cx", function(d) { return valuesX(d.date); })
                            .attr("cy", function(d) { return (d.y +20 ); })
                            .on('mouseover', mouseOverNode)
                            .on('mouseout', mouseOutNode);

                    }

                    //Target
                    if (e.target.id == valuesItem.id && ctlVisible == "false" ) {

                        d3.select(this)
                            .attr("visible", true)
                            .append("circle")
                            .attr("id", function(d){ return d.id;})
                            .attr("class", "node")
                            .attr("r","10")
                            .attr('stroke-width',2)
                            .attr("cx", function(d) { return valuesX(d.date); })
                            .attr("cy", function(d) { return (d.y +20 ); })
                            .on('mouseover', mouseOverNode)
                            .on('mouseout', mouseOutNode);

                    }


                });

                //Insert Links
                d3.selectAll(".link").each(function (valuesLink) {
                    ctlVisibleLink = d3.select(this).attr("visible");

                    //Link
                    if (e.id == valuesLink.id && ctlVisibleLink == "false" ) {

                        d3.select(this)
                            .attr("visible", true)
                            .append("line")
                            .attr("class", "pathLink")
                            .attr("id", function(d) { return d.id; })
                            .attr("x1", function(d) { return valuesX(d.source.date); })
                            .attr("y1", function(d) { return d.source.y; })
                            .attr("x2", function(d) { return valuesX(d.target.date); })
                            .attr("y2", function(d) { return d.target.y; })
                            .style("stroke-width", sizeStroke);

                        //Count items visible
                        countNode.forEach(function(infoNode){
                            if(infoNode.id == e.source.id)
                                infoNode.sourceVisible = infoNode.sourceVisible + 1;

                            if(infoNode.id == e.target.id)
                                infoNode.targetVisible = infoNode.targetVisible + 1;

                        })

                    }

                });

            }


        }else{

            d3.selectAll(".link").each(function (valuesLink) {
                ctlVisibleLink = d3.select(this).attr("visible");
                if (e.id == valuesLink.id && ctlVisibleLink == "true" ) {

                    d3.select(this).attr("visible", false);

                    //Delete Link
                    d3.selectAll(".pathLink").each(function(val){
                        if(e.id == val.id){
                            d3.select(this).remove();
                        }
                    });

                    //Count items visible
                    countNode.forEach(function(infoNode){
                        if(infoNode.id == e.source.id)
                            infoNode.sourceVisible = infoNode.sourceVisible - 1;

                        if(infoNode.id == e.target.id)
                            infoNode.targetVisible = infoNode.targetVisible - 1;

                    });

                    //Delete items
                    d3.selectAll(".item").each(function (valuesItem) {
                        itemValue = this;
                        ctlVisible = d3.select(this).attr("visible");

                        countNode.forEach(function(infoNode){
                            if(infoNode.id == e.source.id) ctlSource = infoNode.sourceVisible;
                            if(infoNode.id == e.target.id) ctlTarget = infoNode.targetVisible;

                            //Source
                            if (e.source.id == valuesItem.id && ctlVisible == "true" && ctlSource <= 0) {
                                d3.select(itemValue).attr("visible", false);


                                d3.selectAll(".node").filter(function(d){ return d.id == e.source.id; }).remove();

                                /*
                                d3.selectAll(".node").each(function(val){
                                    if(e.source.id == val.id){
                                        d3.select(this).remove();
                                    }
                                }); */
                            }

                            //Target
                            if (e.target.id == valuesItem.id && ctlVisible == "true" && ctlTarget <= 0) {
                                d3.select(itemValue).attr("visible", false);

                                d3.selectAll(".node").each(function(val){
                                    if(e.target.id == val.id){
                                        d3.select(this).remove();
                                    }
                                });
                            }

                        });


                    });

                }

            });

        }
    });



}


function mouseOverNode(d){

    d3.selectAll(".node").sort(function (a, b) {
        if (a.id != d.id) return -1;
        else return 1;
    });

    d3.select(this)
        //.transition()
        .style("fill", "orange")
        .style("stroke", "black");

    sourceData.links.forEach(function(e) {
        //Links Source
        if(e.source == d.id){
            d3.selectAll(".pathLink").filter(function(data) { return data.id == e.id })
                .style("stroke", "black");

            d3.selectAll(".node").filter(function(data) { return data.id == e.target })
                .style("stroke", "black")
                .style("fill", "orange");

        }
        //Links Target
        if(e.target == d.id){
            d3.selectAll(".pathLink").filter(function(data) { return data.id == e.id })
                .style("stroke", "black");

            d3.selectAll(".node").filter(function(data) { return data.id == e.source })
                .style("stroke", "black")
                .style("fill", "orange");

        }
    });

}

function mouseOutNode(d){
    d3.select(this)
        //.transition()
        .style("fill", "white")
        .style("stroke", "steelblue");

    sourceData.links.forEach(function(e) {
        //Links Source
        if(e.source == d.id){
            d3.selectAll(".pathLink").filter(function(data) { return data.id == e.id })
                .style("stroke", "#cccccc");

            d3.selectAll(".node").filter(function(data) { return data.id == e.target })
                .style("stroke", "steelblue")
                .style("fill", "white");
        }
        //Links Target
        if(e.target == d.id){
            d3.selectAll(".pathLink").filter(function(data) { return data.id == e.id })
                .style("stroke", "#cccccc");

            d3.selectAll(".node").filter(function(data) { return data.id == e.source })
                .style("stroke", "steelblue")
                .style("fill", "white");

        }
    });
}

