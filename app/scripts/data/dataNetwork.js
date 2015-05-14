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


var networkFriends;
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
            /*{"id": 5, "source": 1, "target": 6, date: new Date(2014, 3, 14) },
            {"id": 6, "source": 1, "target": 7, date: new Date(2014, 3, 14) },
            {"id": 7, "source": 2, "target": 6, date: new Date(2013, 9, 5) }*/
        ]

    }];
