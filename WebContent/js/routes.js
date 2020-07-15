
function initialize() {

    // ADDED 3/24/20 - Create dynamic single-page for route maps, as opposed to separate page for each date-key
    // Day value requires leading zero for some browsers.
    let urlParams = new URLSearchParams(window.location.search.substring(1));
    let dateKey = urlParams.get('d');

    let engines = ["1", "2"];   // default values
    if (urlParams.has("e")) {
        engines = urlParams.get("e").split(",");
    }
    console.log("Engines: " + engines);

    let code = "";
    if (urlParams.has("c")) {
        code = "-" + urlParams.get("c");
    }

    let zoom = 14;
    if (urlParams.has("z")) {
        zoom = parseInt(urlParams.get("z"));
    }
    
    const year = dateKey.substring(0,4);
    console.log("Year: " + year);
    const month = dateKey.substring(4,6);
    console.log("Month: " + month);
    let day = dateKey.substring(6);
    console.log("Day: " + day);

    console.log("Zoom: " + String(zoom));

    let d = new Date(year, month-1, day);
    const dText = String(d).substring(0,String(d).indexOf(year)+4);
    console.log(dText);

    $("#route-date").text("Routes for " + dText);
    
    console.log("DateKey: " + dateKey);
    console.log("DateKey + Code: " + dateKey + code);

    //var dateKey = "2019126";

    // Center map at a location between Santa & Sparky
    var latlng = new google.maps.LatLng(comboLatList[dateKey + code], comboLonList[dateKey + code]);
    var myOptions = {
        zoom: zoom,
        center: latlng,
        mapTypeId: google.maps.MapTypeId.ROADMAP
        };

    var map = new google.maps.Map(document.getElementById("map_canvas"),  myOptions);
    
    //engines = ["1", "2"];

    prepareMap(map, dateKey, engines);
}