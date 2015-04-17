/**
 * Created by Oscar on 17.04.15.
 */

    /*Borrar para optimizar */

var dataCategories = [], myCategories = [], myItems = [];
var numCat, numItem, i;
var month, day;

var data_nameCat, data_title, data_date, data_idCat;
    numCat = 3, numItem = 10;

    for(i=1; i<=numCat; i++) {
        data_nameCat = "Categorie"+i;
        myCategories.push({ "id": i, "name": data_nameCat })
    }

    for(i=1; i<=numItem; i++) {
        data_title = "Title No. "+i;

        month = Math.floor((Math.random() * 10) + 1);
        day = Math.floor((Math.random() * 28) + 1);
        data_date = new Date(2014, month, day);

        data_idCat = Math.floor((Math.random() * numCat) + 1);

        myItems.push({ "id": i, "title": data_title, "date":data_date, "categorie": data_idCat })
    }

dataCategories.push({"categories": myCategories, "items": myItems});

var dataTree = [], childrenData = [];

var nameNode, dateNode, parentNode, childrenNode;
var nameChildren, dateChildren, parentChildren;
var nivels, numChildren;

nivels = 1; numChildren=3;

for(i = 1; i<=nivels; i++){
    nameNode = "node"+i;

    month = Math.floor((Math.random() * 10) + 1);
    day = Math.floor((Math.random() * 28) + 1);
    dateNode = new Date(2014, month, day);

    parentNode = null;
    childrenNode = null;

    for(var j=1; j<=numChildren; j++){
        nameChildren = "children"+j;

        var month2 = Math.floor((Math.random() * 10) + month);
        var day2 = Math.floor((Math.random() * 28) + day);
        dateChildren = new Date(2014, month2, day2);

        parentChildren = nameNode;

        //.......
        var numChil = Math.floor((Math.random() * 5) + 1);
        var chil = [];

        for(var z=1; z<=numChil; z++){
            var naChil, daChil
            naChil = "chil node"+z;

            var month3 = Math.floor((Math.random() * 10) + month2);
            var day3 = Math.floor((Math.random() * 28) + day2);
            daChil = new Date(2014, month3, day3);

            chil.push({ "name": naChil, "date": daChil, "parent": parentChildren, "children": null });
        }

        childrenData.push({ "name": nameChildren, "date": dateChildren, "parent": parentChildren, "children": chil });
    }

    dataTree.push({  "name": nameNode, "date": dateNode, "parent": parentNode, "children": childrenData })

}
/*
dataTree = [
    {
        "name": "Top Level",
        "date": new Date(2014, 2, 10),
        "parent": "null",
        "children": [
            {
                "name": "Level 2: A",
                "date": new Date(2014, 3, 10),
                "parent": "Top Level",
                "children": [
                    {
                        "name": "Son of A",
                        "date": new Date(2014, 3, 25),
                        "parent": "Level 2: A"
                    },
                    {
                        "name": "Daughter of A",
                        "date": new Date(2014, 6, 15),
                        "parent": "Level 2: A"
                    }
                ]
            },
            {
                "name": "Level 2: B",
                "date": new Date(2014, 4, 10),
                "parent": "Top Level",
                "children": [
                    {
                        "name": "Oscar",
                        "date": new Date(2014, 10, 14),
                        "parent": "Level 2: B"
                    }
                ]
            },
            {
                "name": "Annouk",
                "date": new Date(2014, 10, 10),
                "parent": "Top Level",
                "children": [
                    {
                        "name": "ggg",
                        "date": new Date(2014, 11, 14),
                        "parent": "Annouk"
                    }
                ]
            }
        ]
    }
];
*/