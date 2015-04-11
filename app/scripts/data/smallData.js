/**
 * Created by Oscar on 02.04.15.
 */
var data = [
    {date: new Date(2014, 1, 1), categorie: 3, title: "Top Level"},
    {date: new Date(2014, 2, 1), categorie: 1, title: "Level 2: A"},
    {date: new Date(2014, 3, 1), categorie: 2, title: "Son of A"},
    {date: new Date(2014, 4, 1), categorie: 3, title: "Daughter of A"},
    {date: new Date(2015, 9, 14), categorie: 2, title: "Level 2: B"},
    {date: new Date(2015, 2, 1), categorie: 2, title: "Item Test"},
    {date: new Date(2015, 8, 1), categorie: 1, title: "New article"},
];
var categories = [
    {categorie: 3, title: "Sports"},
    {categorie: 1, title: "News"},
    {categorie: 2, title: "Categorie"},
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
