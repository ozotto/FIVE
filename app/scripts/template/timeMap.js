/**
 * Created by Oscar on 08.04.15.
 * Modify to custom Style
 */

var mapData;
mapData = [
    {   "id": 1, "name": "Bulle", date: new Date(2014, 1, 10), "coordinates": [7.063768, 46.613474] },
    {   "id": 2, "name": "Romont", date: new Date(2014, 4, 5), "coordinates": [6.914822, 46.691155] },
    {   "id": 5, "name": "Fribourg Centre", date: new Date(2015, 4, 5), "coordinates": [7.158113, 46.803620] },
    {   "id": 6, "name": "Rue Louis-d'Affry 4", date: new Date(2015, 4, 5), "coordinates": [7.150366, 46.803562] },
    {   "id": 10, "name": "Avenue de Provence 16", date: new Date(2016, 4, 5), "coordinates": [6.608035,46.523263 ] },
    {   "id": 11, "name": "5 98-106 Lausanne", date: new Date(2016, 4, 5), "coordinates": [6.613270, 46.530526] },
    {   "id": 12, "name": "CHUV", date: new Date(2015, 4, 5), "coordinates": [6.641509, 46.526452] },
    {   "id": 18, "name": "Banque cantonale", date: new Date(2016, 4, 5), "coordinates": [6.133746, 46.211771] },
    {   "id": 20, "name": "Iglesia de Dios Ministerial de Jesucristo Internacional", date: new Date(2015, 4, 5), "coordinates": [6.127309,46.207851 ] },
    {   "id": 25, "name": "hepia", date: new Date(2015, 4, 5), "coordinates": [6.114048,46.205445 ] },
    {   "id": 30, "name": "Lavertezzo", date: new Date(2015, 4, 5), "coordinates": [8.893006,46.240008 ] },
    {   "id": 31, "name": "Riehenstrasse 328", date: new Date(2015, 4, 5), "coordinates": [7.616776,47.570311 ] }
];


//Variables Graph --------------------------------------------------------------
var widthGraph, heightGraph, timeLineHeight = 70;

//Variables Map --------------------------------------------------------------

var projection, path, tooltip, mapZoneHeight, zoomMap;
var mapItems, latitude, longitude;
var color = d3.scale.category20();
var sizeRadio = 5;

//Variables TimeLine --------------------------------------------------------------

var minDate, maxDate, actualDate, positionDate;
var customTimeFormat;
var valuesX, axiX;
var zoomTimeLine;
var posYTimeline;

var drag, positionSelected, valuesXposition;

//Variables Graphiques ------------------------------------------------------------------------------

var graph, zoneTimeLine, zoneMap, map;

var tipState = d3.tip()
    .attr('class', 'd3-tip')
    .offset([-10, 0])
    .html(function(d) {
        return "<strong>Canton:</strong> <span style='color:red'>" + d.properties.name + "</span>";
    });

var tipItem = d3.tip()
    .attr('class', 'd3-tip')
    .offset([-10, 0])
    .html(function(d) {
        return "<strong>Item:</strong> <span style='color:red'>" + d.name + "</span>";
    });

// Draw graphique
draw();

var width = $("#timeMap").width(),
    aspect = 500 / 960,
    height = width * aspect;

function draw(){

    configureParamsGraph();
    configureTimeLine();
    configureMap();
    createMap();
    createLineTime();

}

//Functions Creation Graph ------------------------------------------------------------------------------

function configureParamsGraph(){

    widthGraph = 960;
    heightGraph = 500;

    //Plan graph ----------------
    graph = d3.select("#timeMap")
        .append("svg")
        .attr("preserveAspectRatio", "xMidYMid")
        .attr("viewBox", "0 0 " + widthGraph + " " + heightGraph)
        .attr("width", width)
        .attr("height", height)
        .attr("class","timeline");


}
$(window).resize(function() {
    var width = $("#timeMap").width();
    graph.attr("width", width);
    graph.attr("height", width * aspect);
});

function configureTimeLine(){

    posYTimeline = heightGraph-timeLineHeight;
    minDate = new Date(2013, 11, 31);
    maxDate = new Date(2015, 11, 31);
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

function configureMap(){

    mapZoneHeight = heightGraph - timeLineHeight;

    projection = d3.geo.albers()
        .center([0, 46.897707])
        .rotate([-8.257169, 0])
        .parallels([40, 50])
        .scale(11000)
        .translate([widthGraph / 2, (heightGraph -timeLineHeight) / 2 ]);

    path = d3.geo.path()
        .projection(projection);

    queue()
        .defer(d3.json, "../scripts/maps/suisse/suisse.json")      //Suisse
        .defer(d3.json, "../scripts/maps/suisse/states_che.json")   //States
        .defer(d3.json, "../scripts/maps/suisse/cities_che.json")   //Cities
        .await(drawMap);

    zoomMap = d3.behavior.zoom()
        .scaleExtent([0.1, 1000])
        .on("zoom", redraw);
}

function createMap(){

    zoneMap = graph.append("g")
        .attr("class", "zoneMap")
        .append("g")
        .attr("transform", "translate(0,0)");

    zoneMap.append("rect")
        .attr("class","zoneMap")
        .attr("width", widthGraph)
        .attr("height", mapZoneHeight);

    map = zoneMap.append("g");
}

function drawMap(error, countryData, statesData, citiesData) {

    var country, state, city;

    if (error) return console.error(error);


    country = topojson.feature(countryData, countryData.objects.suisse).features;
    state = topojson.feature(statesData, statesData.objects.states).features;
    city = topojson.feature(citiesData, citiesData.objects.cities_che).features;

    //Country
    map.append("g")
        .attr("id", "countrie")
        .data(country)
        .attr("d", path)
        .selectAll("path")
        .data(country)
        .enter()
        .append("path")
        .attr("id", function(d) { return d.id; })
        .attr("class", "pathCountry ")
        .attr("d", path);

    map.call(tipState);

    //States
    map.append("g")
        .attr("id", "states")
        .selectAll("path")
        .data(state)
        .enter()
        .append("g")
        .attr("class", "state")
        .append("path")
        .attr("id", function(d) { return d.id; })
        .attr("class", function(d) { return "pathState "+d.properties.name; })
        .style("fill", "#77DD77")
        .attr("d", path)
        .on('mouseover', function(d){
            d3.select(this)
                .transition()
                .style("fill", "#FDFD96");
            tipState.show(d);
        })
        .on("mouseout", function(d){
            d3.select(this)
                .transition()
                .style("fill", "#77DD77")
            tipState.hide(d);
        });


    //Items
    mapItems = map.append("g")
        .attr("id", "items")
        .call(tipItem)
        .selectAll("path")
        .data(mapData)
        .enter()
        .append("g")
        .attr("class", "item")
        .attr("id", function(d){ return d.id; } )
        .attr("visible", true)
        .append("circle")
        .attr("id", function(d){ return d.id;})
        .attr("class", function(d){ return "pathItems "+d.name })
        .attr("cx", projectionLatitute)
        .attr("cy", projectionlongitude)
        .attr("r", sizeRadio)
        .on('mouseover', function(d){
            d3.select(this)
                .transition()
                .style("fill", "orange");
            tipItem.show(d);
        })
        .on("mouseout", function(d){
            d3.select(this)
                .transition()
                .style("fill", "red")
            tipItem.hide(d);
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
        .attr("transform", "translate(0,"+ sizeInfoLineTime +")");

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

//Functions ---------------------------------------------------------------------------------------------
function projectionLatitute(d){
    var latitude = d.coordinates[1];
    var longitude = d.coordinates[0];
    var coorGraph = projection([longitude, latitude]);
    return coorGraph[0];
}

function projectionlongitude(d){
    var latitude = d.coordinates[1];
    var longitude = d.coordinates[0];
    var coorGraph = projection([longitude, latitude]);
    return coorGraph[1];
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

    var dateCurrent, ctlVisible;

    dateCurrent = valuesX.invert(xCoord);
    dateCurrent = formatDate(dateCurrent);

    d3.select(".textActualDate")
        .text(function(d) { return "Current Date: "+dateCurrent;  });
    d3.select(".positionLineTime").attr("transform", "translate(" + xCoord + ",0)");

    mapData.forEach(function(e){
        if (e.date <= valuesX.invert(xCoord)) {

            d3.selectAll(".item").each(function (valuesItem) {
                ctlVisible = d3.select(this).attr("visible");
                if (e.id == valuesItem.id && ctlVisible == "false" ) {

                    d3.select(this)
                        .attr("visible", true)
                        .append("circle")
                        .attr("id", function(d){ return d.id;})
                        .attr("class", function(d){ return "pathItems "+d.name })
                        .attr("cx", projectionLatitute)
                        .attr("cy", projectionlongitude)
                        .attr("r", sizeRadio)
                        .on('mouseover', function(d){
                            d3.select(this)
                                .transition()
                                .style("fill", "orange");
                            tipItem.show(d);
                        })
                        .on("mouseout", function(d){
                            d3.select(this)
                                .transition()
                                .style("fill", "red")
                            tipItem.hide(d);
                        });


                }

            });

        }else{
            d3.selectAll(".item").each(function (valuesItem) {
                ctlVisible = d3.select(this).attr("visible");
                if (e.id == valuesItem.id && ctlVisible == "true" ) {

                    d3.select(this).attr("visible", false);

                    d3.selectAll(".pathItems").each(function(val){
                        if(e.id == val.id){
                            d3.select(this).remove();
                        }
                    })


                }

            });
        }
    });

}

function zoomed() {
    graph.select(".x.axis").call(axiX).selectAll("text")
        .attr("y", 6)
        .attr("x", 6).style("text-anchor", "start");

    //Current Date
    d3.select(".textStartDate")
        .text(function(d) { return "Start Date: "+formatDate(valuesX.domain()[0]);  });

    d3.select(".textEndDate")
        .text(function(d) { return "End Date: "+formatDate(valuesX.domain()[0]);  });

}

function redraw() {
    map.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");

    sizeRadio = 5/zoomMap.scale();
    d3.selectAll(".pathItems").attr("r", sizeRadio );
}

function zoomedMap() {
    map.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");

}







