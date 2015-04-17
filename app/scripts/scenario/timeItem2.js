/**
 * Created by Oscar on 02.04.15.
 */

//Config Graph --------------------------------------------------------------
var margin = {top: 20, right: 20, bottom: 30, left: 100},
    width = 960, height, timeHeight = 50, minHeight = 200;

//Config Data --------------------------------------------------------------

var dataItemsGraph =[], nameCategoriesGraph=[];
var idItem, idCat, nameCat, dateItem, NameItem;

dataCategories[0].categories.forEach(function(value){
    nameCategoriesGraph.push(value.name);
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

//Config TimeLine --------------------------------------------------------------
var minDate = new Date(2013, 11, 31);
var maxDate = new Date(2015, 11, 31);

var customTimeFormat = d3.time.format.multi([
    ["%H:%M", function(d) { return d.getHours(); }],
    ["%a %d", function(d) { return d.getDay() && d.getDate() != 1; }],
    ["%d", function(d) { return d.getDate() != 1; }],
    ["%b", function(d) { return d.getMonth(); }],
    ["%Y", function() { return true; }]
]);

var x = d3.time.scale()
    .range([0, (width-margin.left)])
    .domain([minDate, maxDate]);

var xAxis = d3.svg.axis()
    .scale(x)
    .tickFormat(customTimeFormat)
    .tickSize(20,0);

var zoomTimeLine = d3.behavior.zoom()
    .x(x)
    .scaleExtent([0.1, 1000])
    .on("zoom", zoomed);

/*
 .node {
 cursor: pointer;
 }
 */


//Config Categories --------------------------------------------------------------

var heightCategorie, heightLastCategorie, rangeSize;

heightCategorie = 50;
rangeSize = heightCategorie * nameCategoriesGraph.length;
heightLastCategorie = rangeSize / (nameCategoriesGraph.length - 1);
height = (heightCategorie * nameCategoriesGraph.length) + timeHeight + heightLastCategorie;
posYTimeline = height-timeHeight;

var valuesY = d3.scale.ordinal()
    .domain(nameCategoriesGraph)
    .rangePoints([rangeSize, 0]);

var axiY = d3.svg.axis()
    .scale(valuesY)
    .orient("left");
//.tickSize(margin.left);


//Plan graph ------------------------------------------------------------------------------
var graph = d3.select("#timeItem")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("class","timeline");


//Zone Items ------------------------------------------------------------------------------
var zoneItem = graph.append("g")
    .attr("class", "zoneItem")
    .append("g")
    .attr("transform", "translate(" + margin.left + ",0)");

//Line
zoneItem.append("g")
    .attr("class","dataLine")
    .selectAll(".bar")
    .data(dataItemsGraph)
    .enter().append("line")
    .attr("class", function(d) { return "itemLine idItem"+d.idItem;  })
    .attr("x1",function(d) { return x(new Date(d.dateItem));  })
    .attr("y1",function(d) { var posItemY; posItemY = valuesY(d.nameCat) + (heightLastCategorie /2); return posItemY  })
    .attr("x2",function(d) { return x(new Date(d.dateItem));  })
    .attr("y2",function(d) { var posItemY; posItemY = valuesY(d.nameCat) + (heightLastCategorie /2); return posItemY  });

//Circle
zoneItem.append("g")
    .attr("class","data")
    .selectAll(".bar")
    .data(dataItemsGraph)
    .enter().append("circle")
    .attr("class", function(d) { return "item idItem"+d.idItem+" item_idCat"+ d.idCat  ;  })
    .attr("cx", function(d) { return x(new Date(d.dateItem));  })
    .attr("cy", function(d) { var posItemY; posItemY = valuesY(d.nameCat) + (heightLastCategorie /2); return posItemY  })
    .attr("r","10")
    .attr('stroke-width',2)
    .attr('id',function(d) { return "item_idItem"+ d.idItem;})
    //.attr('idCat',function(d) { return "item_idCat"+ d.idCat  })
    .attr('clicked', false)
    .attr("fill", "#ffffff")

    /*.on("mouseover", function(d) {
     //console.log(d); deux facon de prende la valeur
     var champ = ".item.idItem"+ d.idItem;
     zoneItem.select(champ)
     .transition()
     .attr("fill","steelblue")
     .attr("r", 15);
     })
     .on("mouseout", function() {
     d3.select(this)
     .transition()
     .attr('fill',"#ffffff")
     .attr("r", 10);
     })*/
    .on("mouseover", function(d) { mouseOverItem(d) })
    .on("mouseout", function(d) { mouseOutItem(d) })
    .on("click", function(d) { mouseClick(d) })

//Text
zoneItem.append("g")
    .attr("class","dataInfo")
    .selectAll(".bar")
    .data(dataItemsGraph)
    .enter().append("text")
    .attr("class", function(d) { return "itemText idItem"+d.idItem;  })
    .attr("x", function(d) { return x(new Date(d.dateItem));  })
    .attr("y", function(d) { var posItemY; posItemY = valuesY(d.nameCat) + (heightLastCategorie /2); return posItemY  })
    .style("fill-opacity",0)
    .text(function(d) { return d.NameItem;  });


//Zone TimeLine ------------------------------------------------------------------------------
var zoneTimeLine = graph.append("g")
    .attr("class", "zoneTimeLine")
    .append("g")
    .attr("transform", "translate(" + (margin.left - 1) + ",0)")
    .call(zoomTimeLine);

zoneTimeLine.append("rect")
    .attr("class","zoneTime")
    .attr("width", (width - margin.left))
    .attr("height", timeHeight)
    .attr("y", posYTimeline);

zoneTimeLine.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0,"+ posYTimeline +")")
    .call(xAxis)
    .selectAll("text")
    .attr("y", 6)
    .attr("x", 6)
    .style("text-anchor", "start");

zoneTimeLine.selectAll("g.x.axis path")
    .attr("class", "lineAxeX");

zoneTimeLine.selectAll("g.x.axis g.tick line")
    .attr("class", "axesTimeLine");

//Zone Categories ------------------------------------------------------------------------------
var zoneCategories = graph.append("g")
    .attr("class", "zoneCategories")
    .append("g")
    .attr("transform", "translate(0,0)");

zoneCategories.append("rect")
    .attr("class","zoneCategories")
    .attr("width", margin.left)
    .attr("height", height)
    .attr("x", 0)
    .attr("y", "0");

//Config Name Categorie
zoneCategories.append("g")
    .attr("class", "y axis")
    .attr("transform", "translate(" + margin.left + ",0)")
    .call(axiY)
    .selectAll(".tick")
    //.attr("id", function(d) { console.log(d); return "tickCat"+d;  })
    .attr("class", "tickCategorie")
    .on("mouseover", function(d) { mouseOverCategorie(d) })
    .on("mouseout", function(d) { mouseOutCategorie(d) });

zoneCategories.selectAll(".tickCategorie")
    .selectAll("text").remove();
/*
zoneCategories.selectAll(".tickCategorie")
    .selectAll("line").remove();*/

//Config Zone Categorie
zoneCategories.selectAll(".tickCategorie")
    .append("rect")
    .attr("class", function(d) { return "zoneCategorie "+d;  })
    .attr("width", margin.left)
    .attr("height", heightLastCategorie)
    .attr("x", -margin.left)
    .attr("y", "0")
    .attr("fill", "#D5DDF6");

zoneCategories.selectAll(".tickCategorie")
    .append("text")
    .attr("y", heightLastCategorie/2)
    .attr("x", -85)
    .style("text-anchor", "start")
    .text(function(d) { return d});;

//Config Line Limit Categorie
zoneCategories.selectAll(".tickCategorie")
    .append("line")
    .attr("class", "lineAxeYitems")
    .attr("x1", 0)
    .attr("y1", heightLastCategorie)
    .attr("x2", 0)
    .attr("y2", 0);
zoneCategories.selectAll(".tickCategorie")
    .append("line")
    .attr("class", "lineAxeYitems")
    .attr("x1", -margin.left)
    .attr("y1", heightLastCategorie)
    .attr("x2", 0)
    .attr("y2", heightLastCategorie);

zoneCategories.selectAll(".tickCategorie")
    .append("line")
    .attr("class", "lineDivCate")
    .attr("x1", 0)
    .attr("y1", 0)
    .attr("x2", (width-margin.left))
    .attr("y2", 0);

zoneCategories.selectAll("g.y.axis path")
    .attr("class", "lineAxeY");

//Functions ------------------------------------------------------------------------------
function zoomed() {
    graph.select(".x.axis").call(xAxis).selectAll("text")
        .attr("y", 6)
        .attr("x", 6).style("text-anchor", "start");

    graph.selectAll(".item").attr("cx", function(d) { return x(new Date(d.dateItem));  })
    graph.selectAll(".itemText").attr("x", function(d) { return x(new Date(d.dateItem))+10;  })
    graph.selectAll(".itemLine").attr("x1",function(d) { return x(new Date(d.dateItem));  }).attr("x2",function(d) { return x(new Date(d.dateItem));  })
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

function mouseOverCategorie(d){
    //console.log(d);

    var tickCategorie = ".zoneCategorie."+ d;
    var idCat;

    zoneCategories.select(tickCategorie)
        .transition()
        .attr("fill","steelblue");

    dataItemsGraph.forEach(function(value){
        if(value.nameCat == d) idCat = value.idCat;
    })

    idCat = ".item_idCat"+ idCat;

    zoneItem.selectAll(idCat)
        .transition()
        .attr("fill","steelblue");

}

function mouseOutCategorie(d){
    var tickCategorie = ".zoneCategorie."+ d;
    var idCat;

    zoneCategories.select(tickCategorie)
        .transition()
        .attr("fill","#D5DDF6");

    dataItemsGraph.forEach(function(value){
        if(value.nameCat == d) idCat = value.idCat;
    })

    idCat = ".item_idCat"+ idCat;

    zoneItem.selectAll(idCat)
        .transition()
        .attr("fill","#ffffff");
}

//Buttons --------------------------------------------------
d3.select("#sort").on("click", sortBars);

var sortOrder = false;

ordenar = function(a,b){
    console.log("valA: "+a+" valB: "+b);
    return a - b;
}

var sortBars = function () {
    console.log("button");

    //axiY.scale().domain().sort()

    zoneCategories.selectAll(".tickCategorie")
        .sort(ordenar)
        .transition()
        .delay(400)
        .attr("transform", "translate(" + margin.left + ",0)");



    /*
     sortOrder = !sortOrder;

     sortItems = function (a, b) {
     console.log("valA:"+a+" valB:"+b);
     if (sortOrder) {
     return a.value - b.value;
     }
     return b.value - a.value;
     };

     zoneCategories.selectAll(".tickCategorie")
     .sort(sortItems)
     .transition()
     .delay(function (d, i) {
     return i * 50;
     })
     .duration(1000)
     .attr("x", function (d, i) {
     return xScale(i);
     });
     */
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
        .attr("x", function(d) { return x(new Date(d.dateItem)) + 20;  })
        .style("fill-opacity",1);
}

function mouseOutItem(d){
    var champ = ".item.idItem"+ d.idItem;
    var attrText = ".itemText.idItem"+ d.idItem

    zoneItem.select(champ)
        .transition()
        .attr("fill","#ffffff")
        .attr("r", 10);

    zoneItem.select(attrText)
        .transition()
        .attr("x", function(d) { return x(new Date(d.dateItem));  })
        .style("fill-opacity",0);
}

function mouseClick(d) {

    var item = "#item_idItem"+ d.idItem;
    var attrCircle = ".item.idItem"+ d.idItem;
    var attrLine = ".itemLine.idItem"+ d.idItem;

    if (zoneItem.select(item).attr("clicked") == "false") {

        //Circle
        zoneItem.select(attrCircle)
            .transition()
            .attr("fill","steelblue");

        //Line
        zoneItem.select(attrLine)
            .transition()
            .duration(500)
            .attr('y2',posYTimeline);

        zoneItem.select(item).attr("clicked",true);
    }else if(zoneItem.select(item).attr("clicked") == "true") {
        //Circle
        zoneItem.select(attrCircle)
            .transition()
            .attr("fill","#ffffff");

        //Line
        zoneItem.select(attrLine)
            .transition()
            .duration(500)
            .attr('y2',function(d) { var posItemY; posItemY = valuesY(d.nameCat) + (heightLastCategorie /2); return posItemY  });
        zoneItem.select(item).attr("clicked",false);
    }

}