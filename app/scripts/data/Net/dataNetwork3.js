/**
 * Created by Oscar on 13.05.15.
 */
var networkData;
networkData = [
    {
        "nodes": [
            {"id": 1, date: new Date(2014, 1, 10), "pox": 200, "name": "Myriel", "group": 1},
            {"id": 2, date: new Date(2014, 2, 3), "pox": 75, "name": "Napoleon", "group": 1},
            {"id": 3, date: new Date(2015, 9, 14), "pox": 150, "name": "Mlle.Baptistine", "group": 1},
            {"id": 4, date: new Date(2015, 4, 4), "pox": 90, "name": "Mme.Magloire", "group": 1}
        ],
        "links": [
            {"id": 1, "source": 1, "target": 2, "value": 8, date: new Date(2014, 8, 3) },
            {"id": 2, "source": 2, "target": 3, "value": 7, date: new Date(2014, 3, 3) },
            {"id": 3, "source": 2, "target": 4, "value": 5, date: new Date(2014, 6, 20) },
            {"id": 4, "source": 3, "target": 4, "value": 4, date: new Date(2014, 10, 10) },
            {"id": 5, "source": 1, "target": 4, "value": 14, date: new Date(2014, 2, 2) }

        ]

    }];


var networkFriends = [], nodes = [], link = [];

var month, day, year, data_date, i;

var cantNodes = 600, cantLinks = 500;

function makeDate(){
    month = Math.floor((Math.random() * 10) + 1);
    day = Math.floor((Math.random() * 28) + 1);
    year = Math.floor((Math.random() * 5) + 1);

    if(year == 1) year = 2010;
    if(year == 2) year = 2011;
    if(year == 3) year = 2012;
    if(year == 4) year = 2013;
    if(year == 5) year = 2014;

    return new Date(year, month, day)
}

for(i=1; i<=cantNodes; i++){

    data_date = makeDate();

    nodes.push({
        id: i,
        date: data_date ,
        name: "item No. "+i
    })
}

var source, target;

for(i=1; i<=cantLinks; i++){

    data_date = makeDate();
    source = nodes[Math.floor(Math.random()*nodes.length)];
    target = nodes[Math.floor(Math.random()*nodes.length)];

    if(source.id == target.id){
        target = nodes[Math.floor(Math.random()*nodes.length)];
    }

    if(source.date <= data_date && target.date <= data_date){
        link.push({
            id: i,
            source: source.id,
            target: target.id,
            date: data_date
        })
    }

}

networkFriends.push({"nodes": nodes, "links": link});
/*
networkFriends = [
    {
        "nodes": [
            {"id": 1, date: new Date(2008, 3, 4), "name": "Item 1"},
            {"id": 2, date: new Date(2008, 1, 1), "name": "Items 2"},
            {"id": 3, date: new Date(2009, 1, 14), "name": "Item 3"},
            {"id": 4, date: new Date(2009, 1, 14), "name": "Items 4"},
            {"id": 5, date: new Date(2010, 11, 1), "name": "items 5"},
            {"id": 6, date: new Date(2012, 4, 6), "name": "Diana"},
            {"id": 7, date: new Date(2013, 7, 3), "name": "Joseph"},
            {"id": 8, date: new Date(2008, 8, 20), "name": "amiJispon"}
        ],
        "links": [
            {"id": 1, "source": 1, "target": 2, date: new Date(2008, 5, 23) },
            {"id": 2, "source": 1, "target": 3, date: new Date(2013, 2, 13) },
            {"id": 3, "source": 1, "target": 4, date: new Date(2013, 0, 21) },
            {"id": 4, "source": 1, "target": 5, date: new Date(2014, 3, 14) }
            {"id": 5, "source": 1, "target": 6, date: new Date(2014, 3, 14) },
            {"id": 6, "source": 1, "target": 7, date: new Date(2014, 3, 14) },
            {"id": 7, "source": 2, "target": 6, date: new Date(2013, 9, 5) }
        ]

    }];

*/