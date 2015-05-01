/**
 * Created by Oscar on 02.04.15.
 */
/*
var dataCategories = [], myCategories = [], myItems = [];
var numCat, numItem, i;

var data_nameCat, data_title, data_date, data_idCat;
numCat = 4, numItem = 500;

for(i=1; i<=numCat; i++) {
    data_nameCat = "Categorie"+i;
    myCategories.push({ "id": i, "name": data_nameCat })
}

for(i=1; i<=numItem; i++) {
    data_title = "Title No. "+i;
    var month, day;
    month = Math.floor((Math.random() * 10) + 1);
    day = Math.floor((Math.random() * 28) + 1);
    data_date = new Date(2014, month, day);

    data_idCat = Math.floor((Math.random() * numCat) + 1);

    myItems.push({ "id": i, "title": data_title, "date":data_date, "categorie": data_idCat })
}

dataCategories.push({"categories": myCategories, "items": myItems}); */


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
           /* {id: 10, title: "Top Level", date: new Date(2014, 2, 10), categorie: 3 },
            {id: 11, title: "Level 2: A", date: new Date(2014, 3, 3), categorie: 1},
            {id: 12, title: "Son of A", date: new Date(2014, 1, 14), categorie: 2},
            {id: 13, title: "Daughter of A", date: new Date(2014, 7, 6), categorie: 3},
            {id: 14, title: "Level 2: B", date: new Date(2015, 9, 14), categorie: 2},
            {id: 15, title: "Item Test", date: new Date(2015, 4, 8), categorie: 2},
            {id: 16, title: "New article", date: new Date(2015, 2, 29), categorie: 1},
            {id: 17, title: "Fashion", date: new Date(2015, 8, 15), categorie: 4},
            {id: 18, title: "Computers", date: new Date(2015, 1, 4), categorie: 5},
            {id: 19, title: "Top Level", date: new Date(2014, 9, 10), categorie: 3 },
            {id: 20, title: "Level 2: A", date: new Date(2014, 2, 3), categorie: 1},
            {id: 21, title: "Son of A", date: new Date(2014, 6, 14), categorie: 2},
            {id: 22, title: "Daughter of A", date: new Date(2014, 9, 6), categorie: 3},
            {id: 23, title: "Level 2: B", date: new Date(2015, 11, 14), categorie: 2},
            {id: 24, title: "Item Test", date: new Date(2015, 1, 8), categorie: 2},
            {id: 25, title: "New article", date: new Date(2015, 7, 29), categorie: 1},
            {id: 26, title: "Fashion", date: new Date(2015, 4, 15), categorie: 4},
            {id: 27, title: "Computers", date: new Date(2015, 2, 4), categorie: 5},
            {id: 28, title: "Top Level", date: new Date(2014, 9, 10), categorie: 3 },
            {id: 29, title: "Level 2: A", date: new Date(2014, 10, 3), categorie: 1},
            {id: 30, title: "Son of A", date: new Date(2014, 2, 14), categorie: 2},
            {id: 31, title: "Daughter of A", date: new Date(2014, 8, 6), categorie: 3},
            {id: 32, title: "Level 2: B", date: new Date(2015, 10, 14), categorie: 2},
            {id: 33, title: "Item Test", date: new Date(2015, 1, 8), categorie: 2},
            {id: 34, title: "New article", date: new Date(2015, 3, 29), categorie: 1},
            {id: 35, title: "Fashion", date: new Date(2015, 5, 15), categorie: 4},
            {id: 36, title: "Computers", date: new Date(2015, 2, 4), categorie: 5}, */
        ]
    }
];



var data = [
    {date: new Date(2014, 1, 10), categorie: 3, title: "Top Level"},
    {date: new Date(2014, 2, 3), categorie: 1, title: "Level 2: A"},
    {date: new Date(2014, 3, 14), categorie: 2, title: "Son of A"},
    {date: new Date(2014, 4, 6), categorie: 3, title: "Daughter of A"},
    {date: new Date(2015, 9, 14), categorie: 2, title: "Level 2: B"},
    {date: new Date(2015, 2, 8), categorie: 2, title: "Item Test"},
    {date: new Date(2015, 8, 29), categorie: 1, title: "New article"},
];
//Data Tree
var dataTree = [
    {
        "name": "Top Level",
        "date" : new Date(2014,2,10),
        "parent": "null",
        "children": [
            {
                "name": "Level 2: A",
                "date" : new Date(2014,5,16),
                "parent": "Top Level",
                "children": [
                    {
                        "name": "Son of A",
                        "date" : new Date(2014,9,25),
                        "parent": "Level 2: A"
                    },
                    {
                        "name": "Daughter of A",
                        "date" : new Date(2014,11,15),
                        "parent": "Level 2: A"
                    }
                ]
            },/*
            {
                "name": "Level 2: B",
                "date" : new Date(2014,4,10),
                "parent": "Top Level",
                "children" : [
                    {
                        "name": "Oscar",
                        "date" : new Date(2014,10,14),
                        "parent" : "Level 2: B"
                    }
                ]
            },
            {
                "name": "Annouk",
                "date" : new Date(2014,10,10),
                "parent": "Top Level",
                "children" : [
                    {
                        "name": "ggg",
                        "date" : new Date(2014,11,14),
                        "parent" : "Annouk"
                    }
                ]
            }*/
        ]
    }
];

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