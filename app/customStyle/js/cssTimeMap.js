/**
 * Created by Oscar on 11.09.15.
 */

var content, fileStyle;

var st_items, st_backgroundMap, st_backgroundActive, st_PosLine, st_CurrentLine, st_BackgroundTime, st_BackgroundInfo, st_border, st_Background;

function changeMapItem(){
    var color;
    color = "#"+document.getElementById('itemsMap').value;
    d3.selectAll(".pathItems").style("fill", color);
    st_items = color;
}
function changeMapBackground(){
    var color;
    color = "#"+document.getElementById('BackgroundMap').value;
    d3.selectAll(".fillState").style("fill", color);
    st_backgroundMap = color;
}

function changeMapBackgroundActive(){
    var color;
    color = "#"+document.getElementById('BackgroundMapActive').value;
    //d3.selectAll(".fillStateHover").style("fill", color);
    st_backgroundActive = color;
}

function changeTimelinePositionLine(){
    var color;
    color = "#"+document.getElementById('timelinePositionline').value;
    d3.selectAll(".circlePositionTime").style("fill", color);
    d3.selectAll(".linePositionTime").style("stroke", color);
    st_PosLine = color;
}
function changeTimelineCurrentLine(){
    var color;
    color = "#"+document.getElementById('timelineCurrentline').value;
    d3.selectAll(".lineActualTime").style("stroke", color);
    st_CurrentLine = color;
}

function changeTimelineBackgroundTime(){
    var color;
    color = "#"+document.getElementById('timelineBackgroungtime').value;
    d3.selectAll(".zoneTime").style("fill", color);
    st_BackgroundTime = color;
}
function changeTimelineBackgroundInfo(){
    var color;
    color = "#"+document.getElementById('timelineBackgrounginfo').value;
    d3.selectAll(".infoZoneTime").style("fill", color);
    st_BackgroundInfo = color;
}
function changeGraphBorder(){
    var color;
    color = "1px solid #"+document.getElementById('graphBorder').value;
    d3.select(".timeline").style("border",color);
    st_border = color;

}
function changeGraphBackground(){
    var color;
    color = "#"+document.getElementById('graphBackground').value;
    d3.selectAll(".zoneMap").style("fill", color);
    st_Background = color;
}

function downloadStyle(){

    if(!st_items) st_items = "#FF0000";
    if(!st_backgroundMap) st_backgroundMap = "#77DD77";
    if(!st_backgroundActive) st_backgroundActive = "#FDFD96";
    if(!st_PosLine) st_PosLine = "#3C8106";
    if(!st_CurrentLine) st_CurrentLine = "#ED462F";
    if(!st_BackgroundTime) st_BackgroundTime = "#D5DDF6";
    if(!st_BackgroundInfo) st_BackgroundInfo = "#F6DEB3";
    if(!st_border) st_border = "#97B0F8";
    if(!st_Background) st_Background = "#FFFFFF";

    content = makeFileStyle(st_items, st_backgroundMap, st_backgroundActive, st_PosLine, st_CurrentLine, st_BackgroundTime, st_BackgroundInfo, st_border, st_Background);

    fileStyle = new Blob([content], {type: "text/plain;charset=utf-8"});
    saveAs(fileStyle, "timeMap.css");
}

function makeFileStyle(st_items, st_backgroundMap, st_backgroundActive, st_PosLine, st_CurrentLine, st_BackgroundTime, st_BackgroundInfo, st_border, st_Background){
    var text;

    text = "/*-- FIVE TimeMap Style --*/";
    text = text + ".timeline{ background: #ffffff; border: "+st_border+";}";

    text = text + ".timeline .lineAxes{ stroke: black; }";

    text = text + ".zoneTime {";
    text = text + "fill: "+st_BackgroundTime+";";
    text = text + "}";

    text = text + ".infoZoneTime{";
    text = text + "fill: "+st_BackgroundInfo+";";
    text = text + "}";

    text = text + ".zoneTimeLine{ cursor:pointer;}";

    text = text + ".lineActualTime{ fill: none";
    text = text + "stroke:"+st_CurrentLine+";";
    text = text + "stroke-width: 2;";
    text = text + "shape-rendering: crispEdges;";
    text = text + "}";

    text = text + ".linePositionTime{fill: none;";
    text = text + "stroke: "+st_PosLine+";";
    text = text + "stroke-width: 2;";
    text = text + "shape-rendering: crispEdges;";
    text = text + "}";
    text = text + ".circlePositionTime{fill: "+st_PosLine+";}";

    text = text + ".axis path, .axis line { fill: none; stroke: #000; shape-rendering: crispEdges;}";

    text = text + ".lineAxeX{ fill: none; stroke: #000; shape-rendering: crispEdges;}";

    text = text + ".zoneMap{ fill: "+st_Background+"; cursor: pointer;}";

    text = text + ".pathCountry { stroke: black; stroke-width: 0.25px; fill: gray;}";
    text = text + ".pathCountry.Colombia { stroke: white; stroke-width: 0.25px; fill: green;}";
    text = text + ".pathState{ stroke: black; stroke-width: 0.25px; }";
    text = text + ".pathCities{fill: black;}";

    text = text + ".pathItems{ fill: "+st_items+"; }";

    text = text + ".item{cursor: pointer;}";
    text = text + ".state{cursor: pointer;}";

    text = text + ".fillState{ fill : "+st_backgroundMap+"; }";

    text = text + ".fillStateHover{fill: "+st_backgroundActive+";}";

    text = text + "circle.point{fill: black;}";
    text = text + "text {fill: black;}";
    text = text + "text.nameCity {fill: black;font-size: 1px}";

    text = text + ".d3-tip { line-height: 1; font-weight: bold; padding: 12px; background: rgba(0, 0, 0, 0.8); color: #fff;border-radius: 2px;}";
    text = text + ".d3-tip:after { box-sizing: border-box; display: inline; font-size: 10px; width: 100%; line-height: 1; color: rgba(0, 0, 0, 0.8); content: '\25BC'; position: absolute; text-align: center;}";
    text = text + ".d3-tip.n:after { margin: -1px 0 0 0; top: 100%; left: 0; }";

    return text;
}