/*
var networkData = [], nodes = [], links = [];
var month, day, data_date, month2, day2, data_date2;
var numNodes = 15, numLinks = 25;

for(var i=1; i<=numNodes; i++) {

    month = Math.floor((Math.random() * 10) + 1);
    day = Math.floor((Math.random() * 28) + 1);
    data_date = new Date(2014, month, day);

    nodes.push({
        id: i,
        date: data_date,
        name: "Item No."+i
    });
}

for(var z= 1; i<=numLinks; z++){
    month2 = Math.floor((Math.random() * 10) + 1);
    day2 = Math.floor((Math.random() * 28) + 1);
    data_date2 = new Date(2014, month2, day2);

    var source = Math.floor((Math.random() * numNodes) + 1)
    var target = Math.floor((Math.random() * numNodes) + 1)

    if(source == target){
        target = Math.floor((Math.random() * numNodes) + 1)
    }else{
        links.push({
            id: z,
            source: source,
            target: target,
            date: data_date2
        });
    }
}

 networkData.push({ "nodes": nodes, "links": links });
*/



networkData = [
    {
        "nodes": [
            {"id": 1, date: new Date(2014, 1, 10), "pox": 200, "name": "Myriel", "group": 1},
            {"id": 2, date: new Date(2014, 2, 3), "pox": 75, "name": "Napoleon", "group": 1},
            {"id": 3, date: new Date(2015, 9, 14), "pox": 150, "name": "Mlle.Baptistine", "group": 1},
            {"id": 4, date: new Date(2015, 4, 4), "pox": 90, "name": "Mme.Magloire", "group": 1},
            {"id": 5, date: new Date(2015, 2, 11), "pox": 200, "name": "Myriel", "group": 1},
            {"id": 6, date: new Date(2014, 8, 10), "pox": 75, "name": "Napoleon", "group": 1},
            {"id": 7, date: new Date(2014, 1, 4), "pox": 150, "name": "Mlle.Baptistine", "group": 1},
            {"id": 8, date: new Date(2015, 9, 20), "pox": 90, "name": "Mme.Magloire", "group": 1}

        ],
        "links": [
            {"id": 1, "source": 1, "target": 2, "value": 8, date: new Date(2014, 8, 3) },
            {"id": 2, "source": 2, "target": 3, "value": 7, date: new Date(2014, 3, 3) },
            {"id": 3, "source": 2, "target": 4, "value": 5, date: new Date(2014, 6, 20) },
            {"id": 4, "source": 3, "target": 4, "value": 4, date: new Date(2014, 10, 10) },
            {"id": 5, "source": 1, "target": 4, "value": 14, date: new Date(2014, 2, 2) },
            {"id": 6, "source": 8, "target": 7, "value": 8, date: new Date(2015, 3, 7) },
            {"id": 7, "source": 5, "target": 6, "value": 7, date: new Date(2015, 6, 8) },
            {"id": 8, "source": 5, "target": 4, "value": 5, date: new Date(2015, 1, 12) },
            {"id": 9, "source": 5, "target": 3, "value": 4, date: new Date(2015, 11, 21) },
            {"id": 10, "source": 5, "target": 1, "value": 14, date: new Date(2015, 7, 7) }

        ]

    }];

