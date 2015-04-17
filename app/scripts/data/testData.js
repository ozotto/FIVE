/**
 * Created by Oscar on 17.04.15.
 */

    /*Borrar para optimizar */

var dataCategories = [], myCategories = [], myItems = [];
var numCat, numItem, i;

var data_nameCat, data_title, data_date, data_idCat;
    numCat = 3, numItem = 10;

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

dataCategories.push({"categories": myCategories, "items": myItems});
