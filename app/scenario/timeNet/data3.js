
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