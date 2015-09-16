/**
 * Created by Oscar on 13.09.15.
 */
var timeItemData =
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
    };

var timeItemOptions;

timeItemOptions = {
    graph : {
        width: 880,
        height: 460,
        responsive: true
    },
    timeLine : {
        minDate: new Date(2010, 05, 01),
        maxDate: new Date(2015, 11, 31),
        showCurrentDate: true,
        showActualDate: true,
        currentDate: new Date(2012, 11, 31),
        actualDate: new Date(),
        zoomTimeLine: false
    },
    items : {
        dragmoveData: false,
        sizeItem: 10,
        zoomItem: false,
        tipItem: true,
        selectCategorie: false,
    }
};