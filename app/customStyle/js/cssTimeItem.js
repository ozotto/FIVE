/**
 * Created by Oscar on 11.09.15.
 */

var content, fileStyle;

var st_zoneCat, st_zoneCatActive, st_catItem, st_PosLine, st_CurrentLine, st_BackgroundTime, st_BackgroundCat, st_BackgroundInfo, st_border, st_Background;

function changeZoneCategories(){
    var color;
    color = "#"+document.getElementById('zoneCategories').value;

    d3.selectAll(".fillCategorie").style("fill", color);
    st_zoneCat = color;
}
function changeZoneCatActive(){
    var color;
    color = "#"+document.getElementById('zoneCatActive').value;
    st_zoneCatActive = color;
}

function changeCatItem(){
    var color;
    color = "#"+document.getElementById('catItems').value;
    d3.selectAll(".item").style("fill", color);
    st_catItem = color;
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
    d3.selectAll(".rectCategories").style("fill", color);

    st_BackgroundTime = color;
    st_BackgroundCat = color;
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
    d3.select(".timeline").style("background",color);
    st_Background = color;
}

function downloadStyle(){

    if(!st_zoneCat) st_zoneCat = "#D5DDF6";
    if(!st_zoneCatActive) st_zoneCatActive = "#4682b4";
    if(!st_catItem) st_catItem = "#4682B4";
    if(!st_PosLine) st_PosLine = "#3C8106";
    if(!st_CurrentLine) st_CurrentLine = "#ED462F";
    if(!st_BackgroundTime) st_BackgroundTime = "#D5DDF6";
    if(!st_BackgroundCat) st_BackgroundCat = "#D5DDF6";
    if(!st_BackgroundInfo) st_BackgroundInfo = "#F6DEB3";
    if(!st_border) st_border = "#97B0F8";
    if(!st_Background) st_Background = "#FFFFFF";

    content = makeFileStyle(st_zoneCat, st_zoneCatActive, st_catItem, st_PosLine, st_CurrentLine, st_BackgroundTime, st_BackgroundCat, st_BackgroundInfo, st_border, st_Background);

    fileStyle = new Blob([content], {type: "text/plain;charset=utf-8"});
    saveAs(fileStyle, "timeItem.css");
}

function makeFileStyle(st_zoneCat, st_zoneCatActive, st_catItem, st_PosLine, st_CurrentLine, st_BackgroundTime, st_BackgroundCat, st_BackgroundInfo, st_border, st_Background){
    var text;

    text = "/*-- FIVE TimeItem Style --*/";
    text = text + ".timeline{ background: "+st_Background+"; border: "+st_border+"; }";
    text = text + ".timeline .lineAxes{ stroke: black; }";

    text = text + ".zoneTime { fill: "+st_BackgroundTime+";}";

    text = text + ".infoZoneTime{fill: "+st_BackgroundInfo+";}";

    text = text + ".zoneTimeLine{ cursor:pointer; }";

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

    text = text + ".dataItem{ cursor: pointer; }";

    text = text + ".item{ fill: "+st_catItem+"; cursor: pointer;}";

    text = text + ".itemLine{ stroke: #cccccc; stroke-width: 2; }";

    text = text + ".rectCategories{ fill: "+st_BackgroundCat+"; }";

    text = text + ".textCategories{ fill: black;}";
    text = text + ".tickCategorie{ cursor: pointer; }";

    text = text + ".fillCategorie{ fill : "+st_zoneCat+";}";

    text = text + ".zoneCategoriesHover{ fill : "+st_zoneCatActive+"; }"

    text = text + ".lineAxeY{ stroke: none !important;}";
    text = text + ".lineYaxi { fill: none; stroke: #000; shape-rendering: crispEdges;}";
    text = text + ".lineDivCate{ stroke: #cccccc !important; fill-opacity: 0.5; stroke-width: 1;}";

    text = text + ".d3-tip { line-height: 1; font-weight: bold; padding: 12px; background: rgba(0, 0, 0, 0.8); color: #fff;border-radius: 2px;}";
    text = text + ".d3-tip:after { box-sizing: border-box; display: inline; font-size: 10px; width: 100%; line-height: 1; color: rgba(0, 0, 0, 0.8); content: '\25BC'; position: absolute; text-align: center;}";
    text = text + ".d3-tip.n:after { margin: -1px 0 0 0; top: 100%; left: 0; }";

    return text;
}