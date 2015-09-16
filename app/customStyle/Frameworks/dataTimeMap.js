/**
 * Created by Oscar on 13.09.15.
 */
var timeMapData;
timeMapData = [
    {   "id": 1, "name": "Bulle", date: new Date(2014, 1, 10), "coordinates": [7.063768, 46.613474] },
    {   "id": 2, "name": "Romont", date: new Date(2014, 4, 5), "coordinates": [6.914822, 46.691155] },
    {   "id": 5, "name": "Fribourg Centre", date: new Date(2015, 4, 5), "coordinates": [7.158113, 46.803620] },
    {   "id": 6, "name": "Rue Louis-d'Affry 4", date: new Date(2015, 4, 5), "coordinates": [7.150366, 46.803562] },
    {   "id": 10, "name": "Avenue de Provence 16", date: new Date(2016, 4, 5), "coordinates": [6.608035,46.523263 ] },
    {   "id": 11, "name": "5 98-106 Lausanne", date: new Date(2016, 4, 5), "coordinates": [6.613270, 46.530526] },
    {   "id": 12, "name": "CHUV", date: new Date(2015, 4, 5), "coordinates": [6.641509, 46.526452] },
    {   "id": 18, "name": "Banque cantonale", date: new Date(2016, 4, 5), "coordinates": [6.133746, 46.211771] },
    {   "id": 20, "name": "Iglesia de Dios Ministerial de Jesucristo Internacional", date: new Date(2015, 4, 5), "coordinates": [6.127309,46.207851 ] },
    {   "id": 25, "name": "hepia", date: new Date(2015, 4, 5), "coordinates": [6.114048,46.205445 ] },
    {   "id": 30, "name": "Lavertezzo", date: new Date(2015, 4, 5), "coordinates": [8.893006,46.240008 ] },
    {   "id": 31, "name": "Riehenstrasse 328", date: new Date(2015, 4, 5), "coordinates": [7.616776,47.570311 ] }
];

var timeMapSVG = {
    country : " ../scripts/maps/suisse/suisse.json " ,
    state : " ../scripts/maps/suisse/states_che.json "
    //city : " ../scripts/maps/suisse/cities_che.json "
};


var timeMapOptions = {
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
    map : {
        dragmoveData: false,
        sizeItem: 5,
        zoomMap: false,
        tipCountry: false,
        tipState: false,
        tipCity: false,
        tipItem: false
    }
};



