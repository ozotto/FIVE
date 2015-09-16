/**
 * Created by Oscar on 11.09.15.
 */

var content, fileStyle;

var st_nodes, st_links, st_PosLine, st_CurrentLine, st_BackgroundTime, st_BackgroundInfo, st_border, st_Background;


function changeNetworkNode(){
    var color, item;
    color = "#"+document.getElementById('networkNode').value;
    d3.selectAll(".item").style("fill", color);
    st_nodes = color;
}
function changeNetworkLinks(){
    var color, item;
    color = "#"+document.getElementById('networkLinks').value;
    d3.selectAll(".pathLink").style("stroke", color);
    st_links = color;
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
    d3.selectAll(".backgroundNetwork").style("fill", color);
    st_Background = color;
}

var st_nodes, st_links, st_PosLine, st_CurrentLine, st_BackgroundTime, st_BackgroundInfo, st_border, st_Background;

function downloadStyle(){

    if(!st_nodes) st_nodes = "#73A1C6";
    if(!st_links) st_links = "#E5E5E5";
    if(!st_PosLine) st_PosLine = "#3C8106";
    if(!st_CurrentLine) st_CurrentLine = "#ED462F";
    if(!st_BackgroundTime) st_BackgroundTime = "#D5DDF6";
    if(!st_BackgroundInfo) st_BackgroundInfo = "#F6DEB3";
    if(!st_border) st_border = "#97B0F8";
    if(!st_Background) st_Background = "#FFFFFF";

    content = makeFileStyle(st_nodes, st_links, st_PosLine, st_CurrentLine, st_BackgroundTime, st_BackgroundInfo, st_border, st_Background);

    fileStyle = new Blob([content], {type: "text/plain;charset=utf-8"});
    saveAs(fileStyle, "timeItem.css");
}

function makeFileStyle(st_nodes, st_links, st_PosLine, st_CurrentLine, st_BackgroundTime, st_BackgroundInfo, st_border, st_Background){
    var text;

    text = "/*-- FIVE TimeNet Style --*/";
    text = text + ".timeline{";
    text = text + "background: "+st_border+";";
    text = text + "border: 1px solid #97B0F8;";
    text = text + "}";

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

    text = text + ".backgroundNetwork{fill: "+st_Background+";}";

    text = text + ".item{ stroke: steelblue; stroke-width: 3px; fill: "+st_nodes+"; cursor: pointer;}";

    text = text + ".itemLine{ stroke: #cccccc; stroke-width: 2; }";
    text = text + ".textTool { padding: 5px; font: 12px sans-serif; text-align: center; margin: 2px;}";
    text = text + ".link{ cursor: pointer;}";

    text = text + ".pathLink{ stroke: "+st_links+";}";

    text = text + ".d3-tip { line-height: 1; font-weight: bold; padding: 12px; background: rgba(0, 0, 0, 0.8); color: #fff;border-radius: 2px;}";
    text = text + ".d3-tip:after { box-sizing: border-box; display: inline; font-size: 10px; width: 100%; line-height: 1; color: rgba(0, 0, 0, 0.8); content: '\25BC'; position: absolute; text-align: center;}";
    text = text + ".d3-tip.n:after { margin: -1px 0 0 0; top: 100%; left: 0; }";

    return text;
}