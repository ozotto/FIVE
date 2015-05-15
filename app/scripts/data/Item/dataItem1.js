/**
 * Created by Oscar on 02.04.15.
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


var data = [
    {date: new Date(2014, 1, 10), categorie: 3, title: "Top Level"},
    {date: new Date(2014, 2, 3), categorie: 1, title: "Level 2: A"},
    {date: new Date(2014, 3, 14), categorie: 2, title: "Son of A"},
    {date: new Date(2014, 4, 6), categorie: 3, title: "Daughter of A"},
    {date: new Date(2015, 9, 14), categorie: 2, title: "Level 2: B"},
    {date: new Date(2015, 2, 8), categorie: 2, title: "Item Test"},
    {date: new Date(2015, 8, 29), categorie: 1, title: "New article"},
];

//Data Network
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

//Data Tree
var dataTree = [
    {
        "name": "Top Level",
        "date" : new Date(2014,2,10),
        "parent": "null",
        "children": [
            {
                "name": "Level 2: A",
                "date" : new Date(2014,3,10),
                "parent": "Top Level",
                "children": [
                    {
                        "name": "Son of A",
                        "date" : new Date(2014,3,25),
                        "parent": "Level 2: A"
                    },
                    {
                        "name": "Daughter of A",
                        "date" : new Date(2014,6,15),
                        "parent": "Level 2: A"
                    }
                ]
            },
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
            }
        ]
    }
];
