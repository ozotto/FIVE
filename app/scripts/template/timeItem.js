/**
 * Created by Oscar on 12.09.15.
 * Modify to template custom CSS
 */

var dataCategories = [
    {
        categories: [
            {id: 1, name: 'Sport'},
            {id: 2, name: 'News'},
            {id: 3, name: 'People'},
            {id: 4, name: 'Mode'},
            {id: 5, name: 'IT'},
        ],
        items: [
            {id: 1, title: "Top Level", date: new Date(2014, 1, 10), categorie: 3 },
            {id: 2, title: "Level 2: A", date: new Date(2014, 2, 3), categorie: 1},
            {id: 3, title: "Son of A", date: new Date(2014, 3, 14), categorie: 2},
            {id: 4, title: "Daughter of A", date: new Date(2014, 4, 6), categorie: 3},
            {id: 5, title: "Level 2: B", date: new Date(2015, 9, 14), categorie: 2},
            {id: 6, title: "Item Test", date: new Date(2015, 2, 8), categorie: 2},
            {id: 7, title: "New article", date: new Date(2015, 8, 29), categorie: 1},
            {id: 8, title: "Fashion", date: new Date(2015, 3, 15), categorie: 4},
            {id: 9, title: "Computers", date: new Date(2015, 4, 4), categorie: 5},
        ]
    }
];

//Variables Graph --------------------------------------------------------------
var widthGraph, heightGraph, timeLineHeight = 70;

//Variables Items
var heightCategorie, heightLastCategorie, rangeCategorieInitial;
var valuesY, axiY;
var widhCategories;
var dataItemsGraph =[], domainCategoriesGraph=[], dataCategoriesGraph=[];
var itemEnter, item;
var sizeRadio = 10;

var posCategorieInitial = [], posItemsInitial = [];
var sortAsc = true;

var delayTransition = function(d,i){ return (i+1)*50; }
var positionCategories = [], positionItems = [], backgroundCategorie = {};
var noSorted = true;

var countClicked = 0;

var categorieTransform, XtranslateCat, YtranslateCat, nameCat;
var categoriePosition = [], newcategoriePosition = [];
var containData, isOrdered;

//Variables TimeLine --------------------------------------------------------------

var minDate, maxDate, actualDate, positionDate;
var customTimeFormat;
var valuesX, axiX;
var zoomTimeLine;
var posYTimeline;

var drag, positionSelected, valuesXposition;

//Variables Graphiques ------------------------------------------------------------------------------

var graph, zoneItem, zoneTimeLine, zoneCategories;

var tipItem = d3.tip()
    .attr('class', 'd3-tip')
    .offset([-10, 0])
    .html(function(d) {
        return "<strong>Item:</strong> <span style='color:red'>" + d.NameItem + "</span>";
    });


// Draw graphique
draw();

var width = $("#timeNet").width(),
    aspect = 500 / 960,
    height = width * aspect;

function draw(){

    configureParamsGraph();
    configureItems();
    configureCategories();
    configureTimeLine();
    createItems();
    createCategories();
    createLineTime();
    savePositionInitial();


}

//Functions Creation Graph ------------------------------------------------------------------------------

function configureParamsGraph(){

    widthGraph = 960
    heightGraph = 500

    //Plan graph ----------------

    graph = d3.select("#timeItem")
        .append("svg")
        .attr("preserveAspectRatio", "xMidYMid")
        .attr("viewBox", "0 0 " + widthGraph + " " + heightGraph)
        .attr("width", width)
        .attr("height", height)
        .attr("class","timeline");

}

$(window).resize(function() {
    var width = $("#timeItem").width();
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
        .range([0, (widthGraph - widhCategories)])
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

function configureItems(){

    var idItem, idCat, nameCat, dateItem, NameItem;

    dataCategories[0].categories.forEach(function(value){
        domainCategoriesGraph.push(value.id);
        dataCategoriesGraph.push({ id:value.id, name:value.name });
    });

    dataCategories[0].items.forEach(function(value){
        idItem = value.id
        idCat = value.categorie;
        dataCategories[0].categories.forEach(function(valueCat) {
            if(valueCat.id == idCat)     nameCat = valueCat.name;
        });

        dateItem = value.date;
        NameItem = value.title;
        dataItemsGraph.push({"idItem": idItem, "idCat": idCat, "nameCat":nameCat, "dateItem": dateItem, "NameItem":NameItem})
    });

}

function configureCategories(){

    heightCategorie = (heightGraph - timeLineHeight) / domainCategoriesGraph.length;
    rangeCategorieInitial = heightGraph - timeLineHeight - heightCategorie;
    heightLastCategorie = rangeCategorieInitial / (domainCategoriesGraph.length - 1);

    widhCategories = 100;

    valuesY = d3.scale.ordinal()
        .domain(domainCategoriesGraph)
        .rangePoints([rangeCategorieInitial, 0]);

    axiY = d3.svg.axis()
        .scale(valuesY)
        .orient("left");
}

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
        .attr('clicked', false)
        .attr('visible', true)
        .append("circle")
        .attr("class", function(d) { return "item idItem"+d.idItem+" item_idCat"+ d.idCat  ;  })
        .attr("cx", function(d){
            return xpos = valuesX(new Date(d.dateItem));
        } )
        .attr("cy", function(d){
            return ypos = valuesY(d.idCat) + (heightLastCategorie /2);
        } )
        .attr("r",sizeRadio)
        .attr('stroke-width',2)
        .attr('id',function(d) { return d.idItem;})
        .attr('idCat', function(d){ return d.idCat; })
        .attr("fill", "#ffffff")
        .attr("idCategorie", function(d){ return d.idCat })
        .call(tipItem)
        .on('mouseover', function(d){
            tipItem.show(d);
        })
        .on("mouseout", function(d){
            tipItem.hide(d);
        });


}

function createCategories(){

    //Zone Categories ------------------------------------------------------------------------------
    zoneCategories = graph.append("g")
        .attr("class", "zoneCategories")
        .append("g");

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

    //Axes Y categories
    zoneCategories.append("g")
        .attr("class", "y axis")
        .attr("transform", "translate(" + widhCategories + ",0)")
        .call(axiY)
        .selectAll(".tick")
        .attr("id", function(d) { return d })
        .attr("class", "tickCategorie")
        .attr("clicked", false)
        .on("mouseover", function(d) { mouseOverCategorie(d) })
        .on("mouseout", function(d) { mouseOutCategorie(d) });

    zoneCategories.selectAll(".tickCategorie")
        .selectAll("text").remove();

    zoneCategories.selectAll(".tickCategorie")
        .selectAll("line").remove();

    //Config Zone Categorie
    zoneCategories.selectAll(".tickCategorie")
        .append("rect")
        .attr("class", function(d) { return "zoneCategorie"+d;  })
        .attr("width", widhCategories)
        .attr("height", heightCategorie)
        .attr("x", -widhCategories)
        .attr("y", 1)
        .attr("fill", "#D5DDF6");

    zoneCategories.selectAll(".tickCategorie")
        .append("text")
        .attr("class", "textCategorie")
        .attr("y", heightCategorie/2)
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
        .attr("y1", heightCategorie)
        .attr("x2", 0)
        .attr("y2", heightCategorie);

    zoneCategories.selectAll(".tickCategorie")
        .append("line")
        .attr("class", "lineDivCate")
        .attr("x1", 0)
        .attr("y1", 0)
        .attr("x2", (widthGraph - widhCategories))
        .attr("y2", 0);

    zoneCategories.selectAll("g.y.axis path")
        .attr("class", "lineAxeY");
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

    pos2 = 360;
    pos3 = 710;

    sizeLineTime = timeLineHeight -sizeInfoLineTime;

    //Zone TimeLine ------------------------------------------------------------------------------
    zoneTimeLine = graph.append("g")
        .attr("class", "zoneTimeLine")
        .attr("transform", "translate(" + widhCategories + ","+posYTimeline+")");

    //Information LineTime
    infoTimeLine = zoneTimeLine.append("g")
        .attr("class", "infoTimeline");

    infoTimeLine.append("rect")
        .attr("class","infoZoneTime")
        .attr("width", (widthGraph - widhCategories))
        .attr("height", sizeInfoLineTime);

    infoTimeLine.append("line")
        .attr("class", "lineAxeX")
        .attr("x1", 0)
        .attr("y1", 0)
        .attr("x2", (widthGraph - widhCategories))
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
        //.call(zoomTimeLine);

    timeLineZone.append("rect")
        .attr("class","zoneTime")
        .attr("width", (widthGraph - widhCategories))
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

//Functions ------------------------------------------------------------------------------

function dragmovePosition(xCoord) {

    var dateCurrent, ctlVisible;

    dateCurrent = valuesX.invert(xCoord);
    dateCurrent = formatDate(dateCurrent);

    d3.select(".textActualDate")
        .text(function(d) { return "Current Date: "+dateCurrent;  });
    d3.select(".positionLineTime").attr("transform", "translate(" + xCoord + ",0)");

    //Search Items small to datac current
    dataItemsGraph.forEach(function(e){
        if(e.dateItem <=  valuesX.invert(xCoord)){

            zoneItem.selectAll(".dataItem").each(function(valuesItem){
                ctlVisible = d3.select(this).attr("visible");
                if(e.idItem == valuesItem.idItem && ctlVisible == "false"){

                    d3.select(this)
                        .attr("visible", true)
                        .append("circle")
                        .attr("class", function(d) { return "item idItem"+d.idItem+" item_idCat"+ d.idCat  ;  })
                        .attr("cx", function(d){
                            return xpos = valuesX(new Date(d.dateItem));
                        } )
                        .attr("cy", function(d){
                            return ypos = valuesY(d.idCat) + (heightLastCategorie /2);
                        } )
                        .attr("r",sizeRadio)
                        .attr('stroke-width',2)
                        //.attr('id',function(d) { return "item_idItem"+ d.idItem;})
                        .attr('id',function(d) { return d.idItem;})
                        .attr('idCat', function(d){ return d.idCat; })
                        .attr("fill", "#ffffff")
                        .on('mouseover', function(d){
                            d3.select(this).style("fill","orange")
                        })
                        .on('mouseout', function(d){
                            d3.select(this).style("fill","steelblue")
                        });
                }

            });

        }else{
            zoneItem.selectAll(".dataItem").each(function(valuesItem){
                ctlVisible = d3.select(this).attr("visible");
                if(e.idItem == valuesItem.idItem && ctlVisible == "true"){

                    d3.select(this).attr("visible", false);

                    d3.selectAll(".item").each(function(val){

                        if(e.idItem == val.idItem){
                            d3.select(this).remove();
                        }
                    });

                }

            });
        }
    });

}

function zoomed() {

    zoneTimeLine.select(".x.axis").call(axiX).selectAll("text")
        .attr("y", 6)
        .attr("x", 6).style("text-anchor", "start");

    //Current Date
    d3.select(".textStartDate")
        .text(function(d) { return "Start Date: "+formatDate(valuesX.domain()[0]);  });

    d3.select(".textEndDate")
        .text(function(d) { return "End Date: "+formatDate(valuesX.domain()[0]);  });


    sizeRadio = 10 * zoomTimeLine.scale();
    if(sizeRadio >= 20) sizeRadio = 20;
    if(sizeRadio <= 4) sizeRadio = 4;

    d3.selectAll(".item")
        .attr("cx", function(d){
            return xpos = valuesX(new Date(d.dateItem));
        } )
        .attr("r", sizeRadio );


}

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

function mouseClickCategorie(d){

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

        d3.selectAll(".item").each(function(value){

            posZoneX = d3.select(this).attr("cx");
            posZoneY = d3.select(this).attr("cy") + (heightLastCategorie/2);
            var catItem = d3.select(this).attr("idCat");

            positionItems.push({ id:value.idItem, posx: posZoneX, posy: d3.select(this).attr("cy") });

            if(catItem != d){
                if(posZoneY > itemYpos) newPosY = itemYpos + heightLastCategorie;
                if(posZoneY < itemYpos) newPosY = itemYpos;

                d3.select(this)
                    .transition().duration(800)
                    .delay(delayTransition)
                    .attr("cx", posZoneX)
                    .attr("cy", newPosY)
                    .style("opacity",0)

            }else if(catItem == d){
                var randomPos;
                randomPos = Math.floor((Math.random() * (posYTimeline - 50 )) + 50);
                //Verify le random

                d3.select(this)
                    .transition().duration(800)
                    .delay(delayTransition)
                    .attr("cx", posZoneX)
                    .attr("cy", randomPos);

            }

        });

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
                        .style("visibility", "visible");

                    if(value == d){
                        var idRect = ".zoneCategorie"+d;

                        d3.select(tickCategorie).select(idRect)
                            .transition().duration(800)
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

        d3.selectAll(".item")
            .transition().duration(800)
            .delay(delayTransition)
            .attr("cx", function(d){
                return xpos = valuesX(new Date(d.dateItem));
            } )
            .attr("cy", function(d){
                return ypos = valuesY(d.idCat) + (heightLastCategorie /2);
            } )
            .style("opacity",1);

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
    d3.selectAll(idCat)
        .style("fill","orange");

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
        .style("fill","steelblue");
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

            d3.selectAll(".item").each(function(value){
                var catItem = d3.select(this).attr("idCat");
                var itemYpos = (heightLastCategorie /2) + categories.posy;

                //console.log(catItem);
                if(catItem == categories.id){
                    d3.select(this)
                        .transition().duration(800)
                        .delay(delayTransition)
                        .attr("cy", itemYpos);
                }

            });

        })

    }
};
