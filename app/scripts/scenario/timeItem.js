/**
 * Created by Oscar on 02.04.15.
 */

//Config Graph --------------------------------------------------------------
var widthGraph, heightGraph, widhCategories, timeLineHeight = 70;

//Config Data --------------------------------------------------------------

var dataItemsGraph =[], domainCategoriesGraph=[], dataCategoriesGraph=[];

//Config TimeLine --------------------------------------------------------------

var minDate, maxDate, actualDate, positionDate;
var customTimeFormat;
var valuesX, axiX;
var zoomTimeLine;
var posYTimeline;

var drag, positionSelected, valuesXposition;

//Config Categories --------------------------------------------------------------

var heightCategorie, heightLastCategorie, rangeCategorieInitial;
var valuesY, axiY;

//Config Items
var itemEnter, item;


//Variables Graphiques ------------------------------------------------------------------------------

var graph, zoneItem, zoneTimeLine, zoneCategories;

var posCategorieInitial = [], posItemsInitial = [];
var sortAsc = true;

// Draw graphique
draw();

function draw(){

    configureDataSource();
    configureCategories();
    configureParamsGraph();
    configureTimeLine();
    createItems();
    createCategories();
    createLineTime();
    savePositionInitial();

}

//Functions Creation Graph ------------------------------------------------------------------------------

function configureDataSource(){
    //msg ERROR si on n'a pas bien furni les données
    //prendre data et faire des array commun pour le grapguique
    var idItem, idCat, nameCat, dateItem, NameItem;

    dataCategories[0].categories.forEach(function(value){
        domainCategoriesGraph.push(value.id);
        dataCategoriesGraph.push({ id:value.id, name:value.name });
    })

    dataCategories[0].items.forEach(function(value){
        idItem = value.id
        idCat = value.categorie;
        dataCategories[0].categories.forEach(function(valueCat) {
            if(valueCat.id == idCat)     nameCat = valueCat.name;
        });

        dateItem = value.date;
        NameItem = value.title;
        dataItemsGraph.push({"idItem": idItem, "idCat": idCat, "nameCat":nameCat, "dateItem": dateItem, "NameItem":NameItem})
    })

};

function configureCategories(){
/*
    heightCategorie = (height - timeLineHeight) / domainCategoriesGraph.length;
    rangeCategorieInitial = (height - timeLineHeight) - heightCategorie;
    heightLastCategorie = rangeCategorieInitial / (domainCategoriesGraph.length - 1);
    heightGraph = height;
*/
    heightCategorie = 50;
    rangeCategorieInitial = heightCategorie * domainCategoriesGraph.length;
    heightLastCategorie = rangeCategorieInitial / (domainCategoriesGraph.length - 1);
    heightGraph = (heightCategorie * domainCategoriesGraph.length) + timeLineHeight + heightLastCategorie; //Height  Total Categories



    widhCategories = 100; //Va donne configueCategories
    //widhCategories = width / 8;

    valuesY = d3.scale.ordinal()
        .domain(domainCategoriesGraph)
        //.rangePoints([200, 0]);
        //.domain(dataCGraph)
        .rangePoints([rangeCategorieInitial, 0]);

    axiY = d3.svg.axis()
        .scale(valuesY)
        .orient("left");
//.tickSize(widhCategories);


}

function configureParamsGraph(){

    widthGraph = 960;
    //widthGraph = width;

    //Plan graph ------------------------------------------------------------------------------
    graph = d3.select("#timeItem")
        .append("svg")
        .attr("width", widthGraph)
        .attr("height", heightGraph)
        .attr("class","timeline");

/*
    graph = d3.select("#timeItem")
        .append("svg")
        .attr("preserveAspectRatio", "xMidYMid")
        .attr("viewBox", "0 0 " + widthGraph + " " + heightGraph)
        .attr("width", widthGraph)
        .attr("height", height)
        .attr("class","timeline");
        */
}


function configureTimeLine(){

    posYTimeline = heightGraph-timeLineHeight;
    minDate = new Date(2013, 11, 31);
    maxDate = new Date(2015, 11, 31);

    //actualDate = new Date(2015,3,28);
    positionDate = new Date(2014,3,28);
    actualDate = new Date();

    customTimeFormat = d3.time.format.multi([
        ["%H:%M", function (d) {
            return d.getHours();
        }],
        ["%a %d", function (d) {
            return d.getDay() && d.getDate() != 1;
        }],
        ["%d", function (d) {
            return d.getDate() != 1;
        }],
        ["%b", function (d) {
            return d.getMonth();
        }],
        ["%Y", function () {
            return true;
        }]
    ]);

    valuesX = d3.time.scale()
        .range([0, (widthGraph - widhCategories)])
        //.range([0, widthGraph])
        .domain([minDate, maxDate]);

    valuesXposition = d3.time.scale()
        //.range([0, (widthGraph - widhCategories)])
        .domain([0, 860]);

    axiX = d3.svg.axis()
        .scale(valuesX)
        .tickFormat(customTimeFormat)
        .tickSize(20, 0);

    zoomTimeLine = d3.behavior.zoom()
        .x(valuesX)
        .scaleExtent([0.1, 1000])
        .on("zoom", zoomed);
    /*
     drag = d3.behavior.drag()
     .on("dragstart", function (){ positionSelected = true; })
     .on("drag", dragmovePosition)
     .on("dragend", function (){ positionSelected = false; });
     */
};

function createCategories(){

    //Zone Categories ------------------------------------------------------------------------------
    zoneCategories = graph.append("g")
        .attr("class", "zoneCategories")
        .append("g")
        .attr("transform", "translate(0,0)");

    zoneCategories.append("rect")
        .attr("class","rectCategories")
        .attr("width", widhCategories)
        .attr("height", heightGraph)
        .attr("x", 0)
        .attr("y", 0);

    zoneCategories.append("line")
        .attr("class", "lineYaxi")
        .attr("x1", widhCategories)
        .attr("y1", posYTimeline)
        .attr("x2", widhCategories)
        .attr("y2", 0);

    //Config Name Categorie
    zoneCategories.append("g")
        .attr("class", "y axis")
        .attr("transform", "translate(" + widhCategories + ",0)")
        .call(axiY)
        .selectAll(".tick")
        .attr("id", function(d) { return d })
        .attr("class", "tickCategorie")
        .attr("clicked", false)
        .on("mouseover", function(d) { mouseOverCategorie(d) })
        .on("mouseout", function(d) { mouseOutCategorie(d) })
        .on("click", function(d) { mouseClickCategorie(d) });;

    zoneCategories.selectAll(".tickCategorie")
        .selectAll("text").remove();

    zoneCategories.selectAll(".tickCategorie")
        .selectAll("line").remove();

    //Config Zone Categorie

    zoneCategories.selectAll(".tickCategorie")
        .append("rect")
        .attr("class", function(d) { return "zoneCategorie"+d;  })
        .attr("width", widhCategories)
        .attr("height", heightLastCategorie)
        .attr("x", -widhCategories)
        .attr("y", 1)
        .attr("fill", "#D5DDF6");

    zoneCategories.selectAll(".tickCategorie")
        .append("text")
        .attr("class", "textCategorie")
        .attr("y", heightLastCategorie/2)
        .attr("x", -85)
        .style("text-anchor", "start")
        .text(function(d) {
            var nameCategorie = searchNameCategorie(d);
            return nameCategorie;
        });

    //Config Line Limit Categorie
    zoneCategories.selectAll(".tickCategorie")
        .append("line")
        .attr("class", "lineAxeYitems")
        .attr("x1", -widhCategories)
        .attr("y1", heightLastCategorie)
        .attr("x2", 0)
        .attr("y2", heightLastCategorie);

    zoneCategories.selectAll(".tickCategorie")
        .append("line")
        .attr("class", "lineDivCate")
        .attr("x1", 0)
        .attr("y1", 0)
        .attr("x2", (widthGraph - widhCategories))
        .attr("y2", 0);

    zoneCategories.selectAll("g.y.axis path")
        .attr("class", "lineAxeY");


};

function createLineTime(){

    var actualLineTime, positionLineTime;

    var infoTimeLine, timeLineZone;
    var infoStartDate, infoEndDate, infoActualDate;
    var sizeLineTime, sizeInfoLineTime = 20;
    var pos1, pos2, pos3;

    pos1 = 0 + 5;
    pos2 = (widthGraph / 3) + 5;
    pos3 = ((widthGraph / 3) + pos2) + 5;

//    pos2 = 310;
 //   pos3 = 700;

    sizeLineTime = timeLineHeight -sizeInfoLineTime;

    //Zone TimeLine ------------------------------------------------------------------------------
    zoneTimeLine = graph.append("g")
        .attr("class", "zoneTimeLine")
        .attr("transform", "translate(" + (widhCategories - 1) + ","+posYTimeline+")");
    //.attr("transform", "translate(0,"+posYTimeline+")");
    //.call(zoomTimeLine);

    //Information LineTime
    infoTimeLine = zoneTimeLine.append("g")
        .attr("class", "infoTimeline");

    infoTimeLine.append("rect")
        .attr("class","infoZoneTime")
        //.attr("width", widthGraph)
        .attr("width", (widthGraph - widhCategories))
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
        });;

    timeLineZone.append("rect")
        .attr("class","zoneTime")
        .attr("width", (widthGraph - widhCategories))
        //.attr("width", widthGraph)
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
    /*.call(drag)
     .on("click", function () {
     var xCoord = d3.mouse(this)[0];
     currentDateActual(xCoord);
     });;*/


    positionLineTime .append("line")
        .attr("class", "linePositionTime")
        .attr("y1", 25)
        .attr("y2", sizeLineTime);

    positionLineTime.append("circle")
        .attr("class", "circlePositionTime")
        .attr("cy", 25 )
        .attr("r", 5)

};

var divTooltip = d3.select("#timeItem").append("div").attr("class", "tooltip").style("opacity", 0);

var tooltipText = divTooltip.append("div")
    .attr("class", "textTool");


function createItems(){

    //Zone Items ------------------------------------------------------------------------------
    zoneItem = graph.append("g")
        .attr("class", "zoneItem")
        .attr("transform", "translate(" + widhCategories + ",0)");

    item = zoneItem.selectAll("item")
        .data(dataItemsGraph);

    itemEnter = item.enter().append("g")
        .attr("class", "dataItem")
        .attr("idItem", function(d){ return d.idItem })
        .attr("transform", function(d) {
            var xpos, ypos;
            xpos = valuesX(new Date(d.dateItem));
            ypos = valuesY(d.idCat) + (heightLastCategorie /2);
            return "translate("+xpos+","+ypos+")";
        } )
        .attr('clicked', false)
        .attr("idCategorie", function(d){ return d.idCat })
        .style("opacity", 0)
        .on("mouseover", function(d) {
            var posX = d3.event.x, posY = d3.event.y;
            posX = posX + 20;
            posY = posY - 20;

            divTooltip.transition()
                .duration(200)
                .style("opacity", 1).style("left", posX + "px")
                .style("top", posY + "px");
            tooltipText.html("Title: "+d.NameItem)

        })
        .on("mouseout", function(d) {
            divTooltip.transition()
                .duration(500)
                .style("opacity", 0);
        })
        // .on("mouseover", function(d) { mouseOverItem(d) })
        //.on("mouseout", function(d) { mouseOutItem(d) })
        .on("click", function(d) { mouseClickItem(d) });


    //Line
    itemEnter.append("line")
        .attr("class", function(d) { return "itemLine idItem"+d.idItem;  })
        .attr("x1", 0 )
        .attr("y1", 0 )
        .attr("x2", 0 )
        .attr("y2", 0 );

    //Circle
    itemEnter.append("circle")
        .attr("class", function(d) { return "item idItem"+d.idItem+" item_idCat"+ d.idCat  ;  })
        .attr("cx", 0 )
        .attr("cy", 0 )
        .attr("r","10")
        .attr('stroke-width',2)
        .attr('id',function(d) { return "item_idItem"+ d.idItem;})
        .attr("fill", "#ffffff");


    //Text
    itemEnter.append("text")
        .attr("class", function(d) { return "itemText idItem"+d.idItem;  })
        .attr("x", 0 )
        .attr("y", 0 )
        .style("fill-opacity",0)
        .text(function(d) { return d.NameItem;  });

};

//Functions Interactions ------------------------------------------------------------------------------

function searchNameCategorie(d){
    var nameCategorie;
    dataItemsGraph.forEach(function(values){
        if(d == values.idCat ) nameCategorie = values.nameCat
    });
    return nameCategorie;
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


function compareCategorie(a,b) {

    if(sortAsc){
        if (a.name < b.name)
            return -1;
        if (a.name > b.name)
            return 1;
        return 0;
    }else if(!sortAsc){
        if (a.name < b.name)
            return 1;
        if (a.name > b.name)
            return -1;
        return 0;
    }


}

function zoomed() {
    //si hay acciones iniciar el zoom; no se como pero inicialo jajajaj

    if(!positionSelected){

        //Zoom and path axes X
        zoneTimeLine.select(".x.axis").call(axiX).selectAll("text")
            .attr("y", 6)
            .attr("x", 6).style("text-anchor", "start");

        //Actually Date
        d3.select(".textStartDate")
            .text(function(d) { return "Start Date: "+formatDate(valuesX.domain()[0]);  });

        d3.select(".textEndDate")
            .text(function(d) { return "End Date: "+formatDate(valuesX.domain()[0]);  });

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


        //Animation Items
        zoneItem.selectAll(".dataItem")
            .attr("transform", function(d) {

                var xpos, ypos;
                xpos = valuesX(new Date(d.dateItem));

                zoneCategories.selectAll(".tickCategorie").each(function(value){
                    if(value == d.idCat){
                        ypos = (d3.transform(d3.select(this).attr("transform")).translate[1]) + (heightLastCategorie/2);
                    }
                })

                return "translate("+xpos+","+ypos+")";
            } )

    }


    /*
     standby
     console.log("\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n");
     d3.selectAll("g.x.axis g.tick text")
     .attr("y2", function(d){
     console.log(d);
     });

     console.log(zoomTimeLine.scale());
     console.log(d3.event.scale, d3.event.translate[0]);
     */

}


var verData;

function dragmovePosition(xCoord) {

    var dateConnection, dateCurrent;

    dateCurrent = valuesX.invert(xCoord);
    dateCurrent = formatDate(dateCurrent);


    d3.select(".textActualDate")
        .text(function(d) { return "Current Date: "+dateCurrent;  });


    d3.select(".positionLineTime").attr("transform", "translate(" + xCoord + ",0)");

    //Search Items small to datac current
    dataItemsGraph.forEach(function(e){
        if(e.dateItem <=  valuesX.invert(xCoord)){
            zoneItem.selectAll(".dataItem").each(function(valuesItem){
                if(e.idItem == valuesItem.idItem){
                    //console.log("id: "+e.idItem+" date: "+dateCurrent);
                    d3.select(this)
                        .transition()
                        .style("opacity",1);
                }

            });
        }else{
            zoneItem.selectAll(".dataItem").each(function(valuesItem){
                if(e.idItem == valuesItem.idItem){
                    //console.log("id: "+e.idItem+" date: "+dateCurrent);
                    d3.select(this)
                        .transition()
                        .style("opacity",0);
                }

            });
        }
    });

    /*
     verQue = d3.event;
     verMouse = d3.mouse;

     //var xCoord = d3.mouse(this)[0];
     //var y = d3.event.y;
     if(x>0 && x < (widthGraph - widhCategories))
     d3.select(this).attr("transform", "translate(" + x + ",0)");




     var posXitem;

     //Items
     zoneItem.selectAll(".dataItem").each(function(valuesItme){
     posXitem = d3.transform(d3.select(this).attr("transform")).translate[0]

     if(posXitem <= x){
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
}

//Delay to item
var delayTransition = function(d,i){ return (i+1)*50; }
var positionCategories = [], positionItems = [], backgroundCategorie = {};
var noSorted = true;

var countClicked = 0;

function mouseClickCategorie(d){


    //Ver //.attr("transform", "scale(100,0)"); para ocultar y hacer grande la categoria seleccionada

    var itemXpos, itemYpos, posZoneX, posZoneY, newPosY, posXZoneTimeLine;
    var clicked;
    countClicked++;

    //Value Position Categorie
    zoneCategories.selectAll(".tickCategorie").each(function(value){
        if(value == d){

            if(d3.select(this).attr("clicked") == "false"){ clicked = false; }
            else if(d3.select(this).attr("clicked") == "true") { clicked = true;}
            d3.select(this).attr("clicked", true);

        }
    })

    posCategorieInitial.forEach(function(values){
        if(values.id == d){
            itemXpos = values.posx;
            itemYpos = values.posy;
        }

    });

    if(clicked == false && countClicked == 1){

        noSorted = false;

        //Transition Categories
        zoneCategories.selectAll(".tickCategorie").each(function(value){

            positionCategories.push({
                id:value,
                posx:d3.transform(d3.select(this).attr("transform")).translate[0],
                posy:d3.transform(d3.select(this).attr("transform")).translate[1]
            });

            if(value != d){

                posZoneX = d3.transform(d3.select(this).attr("transform")).translate[0];
                posZoneY = d3.transform(d3.select(this).attr("transform")).translate[1];

                if(itemYpos < posZoneY) newPosY = itemYpos;
                if(itemYpos > posZoneY) newPosY = itemYpos - heightLastCategorie;

                d3.select(this)
                    .transition().duration(800)
                    .delay(delayTransition)
                    .attr("transform", "translate("+itemXpos+","+newPosY+")")
                    .style("visibility","hidden");

            }else if(value == d){

                d3.select(this)
                    .transition().duration(800)
                    .delay(delayTransition)
                    .attr("transform", "translate("+itemXpos+",0)");

                var idRect = ".zoneCategorie"+d;
                d3.select(this).select(idRect)
                    .transition().duration(800)
                    .attr("height", posYTimeline );

                d3.select(this).select(".lineAxeYitems")
                    .transition().duration(800)
                    .attr("y1", posYTimeline )
                    .attr("y2", posYTimeline );

                d3.select(this).select(".lineDivCate")
                    .transition().duration(800)
                    .delay(delayTransition)
                    .attr("x2", 0 );

                d3.select(this).select(".textCategorie")
                    .transition().duration(800)
                    .delay(delayTransition)
                    .attr("y", posYTimeline/2 );

            }
        });

        //Transition Items
        zoneItem.selectAll(".dataItem").each(function(value){

            posZoneX = d3.transform(d3.select(this).attr("transform")).translate[0];
            posZoneY = (d3.transform(d3.select(this).attr("transform")).translate[1]) + (heightLastCategorie/2);

            positionItems.push({ id:value.idItem, posx: posZoneX, posy: d3.transform(d3.select(this).attr("transform")).translate[1] });

            if(value.idCat != d){

                if(posZoneY > itemYpos) newPosY = itemYpos + heightLastCategorie;
                if(posZoneY < itemYpos) newPosY = itemYpos;

                d3.select(this)
                    .transition().duration(800)
                    .delay(delayTransition)
                    .attr("transform", "translate("+posZoneX+","+newPosY+")")
                    .style("opacity",0)
                //.style("visibility","hidden");

            }else if(value.idCat == d){
                var randomPos;
                randomPos = Math.floor((Math.random() * (posYTimeline - 50 )) + 50);
                //Verify le random

                d3.select(this)
                    .transition().duration(800)
                    .delay(delayTransition)
                    .attr("transform", "translate("+posZoneX+","+randomPos+")");
            }
        })

        countClicked = 0;

    }

    if(clicked == true && countClicked == 1){

        noSorted = true;
        zoneCategories.selectAll(".tickCategorie").each(function(value) {
            if (value == d) {
                d3.select(this).attr("clicked", false);
            }
        });

        //Transition Categories
        zoneCategories.selectAll(".tickCategorie").each(function(value){

            var tickCategorie = this;
            posCategorieInitial.forEach(function(posCategories){

                if(posCategories.id == value){

                    d3.select(tickCategorie)
                        .transition().duration(800)
                        .delay(delayTransition)
                        .attr("transform", "translate("+posCategories.posx+","+posCategories.posy+")")
                        // .style("opacity",1)
                        .style("visibility", "visible");

                    if(value == d){
                        var idRect = ".zoneCategorie"+d;

                        d3.select(tickCategorie).select(idRect)
                            .transition().duration(800)
                            //.delay(delayTransition)
                            .attr("height", heightLastCategorie );

                        d3.select(tickCategorie).select(".textCategorie")
                            .transition().duration(800)
                            .delay(delayTransition)
                            .attr("y", heightLastCategorie/2 );

                        d3.select(tickCategorie).select(".lineDivCate")
                            .transition().duration(800)
                            .delay(delayTransition)
                            .attr("x2", (widthGraph - widhCategories) );

                        d3.select(tickCategorie).select(".lineAxeYitems")
                            .transition().duration(800)
                            .delay(delayTransition)
                            .attr("y1", heightLastCategorie )
                            .attr("y2", heightLastCategorie );

                    }
                }

            });
        });

        //Transition Items
        zoneItem.selectAll(".dataItem").each(function(value){

            var itemData = this;

            posItemsInitial.forEach(function(posItem){
                if(posItem.id == value.idItem){
                    d3.select(itemData)
                        .transition().duration(800)
                        .delay(delayTransition)
                        .attr("transform", "translate("+posItem.posx+","+posItem.posy+")")
                        .style("opacity",1);
                    //.style("visibility", "visible");
                }

            });

        });

        countClicked = 0;
    }


}

function mouseOverCategorie(d){

    var tickCategorie = ".zoneCategorie"+ d;
    var idCat;

    zoneCategories.select(tickCategorie)
        .transition()
        .attr("fill","steelblue");

    idCat = ".item_idCat"+ d;

    zoneItem.selectAll(idCat)
        .transition()
        .attr("fill","steelblue");

}

function mouseOutCategorie(d){
    var tickCategorie = ".zoneCategorie"+ d;
    var idCat;

    zoneCategories.select(tickCategorie)
        .transition()
        .attr("fill","#D5DDF6");

    idCat = ".item_idCat"+ d;

    zoneItem.selectAll(idCat)
        .transition()
        .attr("fill","#ffffff");
}


//Buttons --------------------------------------------------

var test;


var categorieTransform, XtranslateCat, YtranslateCat, nameCat;
var categoriePosition = [], newcategoriePosition = [];
var containData, isOrdered;


function savePositionInitial(){

    zoneCategories.selectAll(".tickCategorie").each(function(d, i) {
        categorieTransform = d3.transform(d3.select(this).attr("transform"))
        XtranslateCat = categorieTransform.translate[0];
        YtranslateCat = categorieTransform.translate[1];
        nameCat = searchNameCategorie(d);
        posCategorieInitial.push({ id: d, name:nameCat, posx:XtranslateCat, posy: YtranslateCat, order: i });
    });

    zoneItem.selectAll(".dataItem").each(function(value){

        posItemsInitial.push({
            id:value.idItem,
            posx: d3.transform(d3.select(this).attr("transform")).translate[0],
            posy: d3.transform(d3.select(this).attr("transform")).translate[1]
        })

    });



}

function arrayObjectIndexOf(myArray, searchTerm, property) {
    for(var i = 0, len = myArray.length; i < len; i++) {
        if (myArray[i][property] === searchTerm) return true;
    }
    return false;
}

function sortCategories () {

    if(noSorted === true) {

        //Sort Data Categories
        dataCategoriesGraph.sort(compareCategorie);

        sortAsc = !sortAsc;

        //New positions Categories
        dataCategoriesGraph.forEach(function(dataCat,i){
            posCategorieInitial.forEach(function(values){

                if(i == values.order){
                    newcategoriePosition.push({id: dataCat.id, name:dataCat.name, posx:values.posx, posy: values.posy, order: i  })
                }

            })
        })

        newcategoriePosition.forEach(function(categories){

            //Transition Categories
            zoneCategories.selectAll(".tickCategorie").each(function(d) {
                if(d == categories.id){
                    d3.select(this)
                        .transition().duration(800)
                        .delay(delayTransition)
                        .attr("transform", "translate("+categories.posx+","+categories.posy+")");
                }
            })

            //Transition Items
            zoneItem.selectAll(".dataItem").each(function(value){
                if(value.idCat == categories.id){
                    var itemXpos = d3.transform(d3.select(this).attr("transform")).translate[0];
                    var itemYpos = (heightLastCategorie /2) + categories.posy;

                    d3.select(this)
                        .transition().duration(800)
                        .delay(delayTransition)
                        .attr("transform", "translate("+itemXpos+","+itemYpos+")");
                }
            })

        })

    }
};

function mouseOverItem(d){
    var champ = ".item.idItem"+ d.idItem;
    var attrText = ".itemText.idItem"+ d.idItem

    zoneItem.select(champ)
        .transition()
        .attr("fill","steelblue")
        .attr("r", 15);

    zoneItem.select(attrText)
        .transition()
        .attr("x", 20)
        .style("fill-opacity",1);
}

function mouseOutItem(d){
    var champ = ".item.idItem"+ d.idItem;
    var attrText = ".itemText.idItem"+ d.idItem;

    //console.log(champ);

    zoneItem.select(champ)
        .transition()
        .attr("fill","#ffffff")
        .attr("r", 10);

    zoneItem.select(attrText)
        .transition()
        .attr("x", 0 )
        .style("fill-opacity",0);
}

function mouseClickItem(d) {
    console.log("click");

    var attrCircle = ".item.idItem"+ d.idItem;
    var attrLine = ".itemLine.idItem"+ d.idItem;

    zoneItem.selectAll(".dataItem").each(function() {

        var clicked = d3.select(this).attr("clicked");
        var idItem = d3.select(this).attr("idItem");

        if(idItem == d.idItem && clicked == "false"){

            //Circle
            zoneItem.select(attrCircle)
                .transition()
                .attr("fill","steelblue");

            //Line
            zoneItem.select(attrLine)
                .transition()
                .duration(500)
                .attr('y2',posYTimeline);

            d3.select(this).attr("clicked",true);

        }else if(idItem == d.idItem && clicked == "true") {
            //Circle
            zoneItem.select(attrCircle)
                .transition()
                .attr("fill","#ffffff");

            //Line
            zoneItem.select(attrLine)
                .transition()
                .duration(500)
                .attr('y2', 0 );

            d3.select(this).attr("clicked",false);

        }

    });

}
