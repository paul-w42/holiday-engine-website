/**
 * JS File that provides functions enabling engine tracking with breadcrumbs.
 */


    let crumbImages = [];
    let engineMarkers = new Map();
    let showEngines = 0;    // 0 -> show both mv engines, 1 -> engine 1 only, 2 -> engine 2 only, 3 -> engine 3 only
    let resetIfNoMarker = true;    // if there is no visible marker, center map and re-zoom to view
    let currentZoom = 13;
    let recentLocations = new Map();
    recentLocations.set(1, {lat: 0.0, lon: 0.0});
    recentLocations.set(2, {lat: 0.0, lon: 0.0});
    recentLocations.set(3, {lat: 0.0, lon: 0.0});

    let sMap;
    let latlng;
    let imageTest;
    let mapPrepared = false;

    let santaImage;
    
    let shape = {
            coord: [1, 1, 1, 20, 18, 20, 18 , 1],
            type: 'poly'
        };
    santaMarkers = []   // santaMarkers[0] --> Engine 1, santaMarkers[1] --> Engine 2, etc.

    /**
    * Called via let engineMarker = createCrumb(display, engine, lat, lon); from appendCrumb()
    * Purpose: to create an EngineMarker (breadcrumb) that can be added to the engineMarkers array
    */
    function createCrumb(engine, lat, lon) {
        let crumb = new google.maps.Marker({
                position: new google.maps.LatLng(lat, lon),
                map: sMap,
                icon: crumbImages[engine-1],
                zIndex: 1
            });

        return crumb;
    }


    /**
     * fileURL - URL pointing to crumbs file
     * engine - Engine Number this file pertains to (used so that if necessary we can use different images for each 
     *      engines crumbs trail).
     */
    function importCrumbsFileData(fileURI, engine) {
        uniqueID = "?d=" + Date.now();  // Attempt to force-load crumbs vs. using a cached version
        fileURI += uniqueID;

        let http = new XMLHttpRequest();
        let markersArray = [];
        http.open('HEAD', fileURI, true);

        http.onload = function() {

            // If file not found ---------------------
            if (http.status == 404) {
                return false;
            }
            else {
                // Currently only cycle through if crumbs file present on page load
                crumbsScript = document.createElement('script');
                document.getElementsByTagName('head')[0].appendChild(crumbsScript);
                
                crumbsScript.onload = function() {
                    let arrayName = "crumbs" + String(engine);

                    // Cycle through imported array w/ lat/lon
                    for (count = 0; count < (window[arrayName].length-1); count++) {
                        if (count % 2 != 0) { continue; }   // Skip even markers - too many on page
                        markersArray.push(createCrumb(engine, window[arrayName][count]["lat"], window[arrayName][count]["lon"]));
                    }
                    
                    engineMarkers.set(engine, markersArray);
                };

                crumbsScript.src = fileURI;
            }
        }
        http.send();
    }

    function getCrumbsFileURI(engine) {
        const baseName = "./location/crumbs-";
        return (baseName + (engine).toString() + ".js");
    }

    /**
     * Loads crumbs file into array for specified engine.
     * Created 3/14/20
     */
    function loadCrumbsFile(engine) {
        importCrumbsFileData(getCrumbsFileURI(engine), engine);
    }


    /**
     * Creates and appends a crumb to appropriate array
     * engine - engine to create marker for, also notes array to store in
     * display - boolean re display on global map or give marker a null map value
     *      lat/lon of marker that is being created
     * Called via trackEngines method when checking for new engine location
     */
    function appendCrumb(engine, display, lat, lon) {
        let markersArray = engineMarkers.get(engine);
        if (!(Array.isArray(markersArray))) {   // If engine just now started tracking there would be no array ... 
            markersArray = []
        }
        let engineMarker = createCrumb(engine, lat, lon);
        markersArray.push(engineMarker);
        engineMarkers.set(engine, markersArray);

    }


    function clearCrumbs(engine) {
        let markers = engineMarkers.get(engine);
                
        if (!(markers === undefined || markers.length == 0)) {
            let l = markers.length;
            for (i = 0; i < l; i++) {
                markers[i].setMap(null);
                markers[i] == null; 
            }
        }
    }

    /**
     * initRecentLocations(engine) resets the recent-locations values for the given engine.  Gives us the ability 
     * to re-initialize these locales when we track / stop tracking / track again.
     * Added 3/14/20
     */
    function initRecentLocations(engine) {
        recentLocations.get(engine).lat = window["lat" + engine];
        recentLocations.get(engine).lon = window["lon" + engine];
    }

    function createMarker(engine, lat, lon) {
        let santaLatLng = new google.maps.LatLng(lat, lon);
        santaMarkers[engine - 1] = new google.maps.Marker({
                position: santaLatLng,
                map: sMap,
                icon: santaImage,
                shape: shape,
                zIndex: 1
            });
    }

    // Will run initially w/ just the MV Engines being shown.  Visitor must select Covington to see that one.
    function trackEngines(initial) {

        if (sMap) {
            currentZoom = sMap.getZoom();
            latlng = sMap.getCenter();
        }
        
        var santaDoc, santaScript;
        santaDoc = document.getElementById('santa_js');   // retrieve script import object
        santaScript = document.createElement('script');   // create a new script object
        
        santaScript.src = './location/engine1.js?d='+ Date.now(); // set src of new object to js.js?d=<random #>, forces update
        santaDoc.parentNode.removeChild(santaDoc);   // remove original object
        santaScript.id = 'santa_js';                 // set new object id to match old ... so we can repeat
        document.getElementsByTagName('head')[0].appendChild(santaScript); // attach new object to existing document

        var sparkyDoc, sparkyScript;
        sparkyDoc = document.getElementById('sparky_js');   // retrieve script import object
        sparkyScript = document.createElement('script');   // create a new script object
        
        sparkyScript.src = './location/engine2.js?d='+ Date.now(); // set src of new object to js.js?d=<random #>, forces update
        sparkyDoc.parentNode.removeChild(sparkyDoc);   // remove original object
        sparkyScript.id = 'sparky_js';                 // set new object id to match old ... so we can repeat
        document.getElementsByTagName('head')[0].appendChild(sparkyScript); // attach new object to existing document

        var covingtonDoc, covingtonScript;
        covingtonDoc = document.getElementById('covington_js');   // retrieve script import object
        covingtonScript = document.createElement('script');   // create a new script object
        covingtonScript.src = './location/engine3.js?d='+ Date.now(); // set src of new object to js.js?d=<random #>, forces update
        covingtonDoc.parentNode.removeChild(covingtonDoc);   // remove original object
        covingtonScript.id = 'covington_js';                 // set new object id to match old ... so we can repeat
        document.getElementsByTagName('head')[0].appendChild(covingtonScript); // attach new object to existing document
        
        if (!sMap) {
            var latlng = new google.maps.LatLng(((lat1 + lat2) / 2 ), ((lon1 + lon2) / 2));
            var myOptions = {
                zoom: currentZoom,
                center: latlng,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };
            sMap = new google.maps.Map(document.getElementById("map_canvas"),  myOptions);
        }

        // Remove Santa Markers
        for (i = 0; i < 3; i++) {
            if (santaMarkers[i]) {
                santaMarkers[i].setMap(null);
            }
        }

        // Initial layout - prime recentLocation ...
        if (initial) {
            initRecentLocations(1);
            initRecentLocations(2);

            createMarker(1, lat1, lon1);
            createMarker(2, lat2, lon2);
        }
        // check if have moved since prior run-through, update markers if true
        else {

            let santaLatLng;

            // if location has changed - save recent location to crumbs list, and re-load recent to match new locations
            if (showEngines == 0 || showEngines == 1) {
                    // Manage Crumbs for Engine
                if (recentLocations.get(1).lat != lat1 || recentLocations.get(1).lon != lon1) {
                    appendCrumb(1, true, recentLocations.get(1).lat, recentLocations.get(1).lon);
                    recentLocations.get(1).lat = lat1;
                    recentLocations.get(1).lon = lon1;
                }

                createMarker(1, lat1, lon1);
            }

            if (showEngines == 0 || showEngines == 2) {
                if (recentLocations.get(2).lat != lat2 || recentLocations.get(2).lon != lon2) {
                    appendCrumb(2, true, recentLocations.get(2).lat, recentLocations.get(2).lon);
                    recentLocations.get(2).lat = lat2;
                    recentLocations.get(2).lon = lon2;
                }
                
                createMarker(2, lat2, lon2);
            }

            if (showEngines == 3) {
                if (recentLocations.get(3).lat != lat3 || recentLocations.get(3).lon != lon3) {
                    appendCrumb(showEngines, true, recentLocations.get(3).lat, recentLocations.get(3).lon);
                    recentLocations.get(3).lat = lat3;
                    recentLocations.get(3).lon = lon3;
                }
                
                createMarker(3, lat3, lon3);
            }
        }

        if (resetIfNoMarker) {
            if (offMap()) {
                reCenterMap();
            }
        }
        
        //dateKey = "20181214";
        if (!mapPrepared) {
            var date = new Date();
            var year = date.getFullYear();
            var month = date.getMonth() + 1;	// zero indexed, add 1
            var day = date.getDate();
            
            // Change day for testing, i.e. "2019127"
            day = year.toString() + month.toString() + day.toString(); // + "-" + engineId;
            engines = ["1", "2", "3", "4"];
            prepareMap(sMap, day, engines);
            mapPrepared = true;
        }

    }

/**
 * Returns a Boolean value if the required marker (passed in) is not visible on the current map.  Apppropriate marker
 * is determined by showEngines variable value.
 * @param {*} map Map to display marker on
 * @param {*} mark1 1st marker to test for
 * @param {*} mark2 2nd ...
 * @param {*} mark3 3rd ...
 */
 function offMap() {

    if (sMap) {   // We have an instantiated map
        if (sMap.getBounds()) { // We have bounds on this map
            if (showEngines == 0 || showEngines == 1) {
                if (sMap.getBounds().contains(santaMarkers[0].getPosition())) {
                    return false;
                }
            }
            if (showEngines == 0 || showEngines == 2) {
                if (sMap.getBounds().contains(santaMarkers[1].getPosition())) {
                    return false;
                }
            }
            if (showEngines == 3) {
                if (sMap.getBounds().contains(santaMarkers[2].getPosition())) {
                    return false;
                }
            }
            return true;
        }
    }
    return false;
}

/**
 * Generally called if offMap returns true, this function will recenter the map to make visible the currently selected marker.
 * @param {*} map 
 * @param {*} marker1 
 * @param {*} marker2 
 * @param {*} marker3 
 */
function reCenterMap() {
    let comboLat, comboLon;

    if (showEngines == 0) {
        comboLat = (lat1 + lat2) / 2;
        comboLon = (lon1 + lon2) / 2;
    }
    else if (showEngines == 1) {
        comboLat = lat1;
        comboLon = lon1;
    }
    else if (showEngines == 2) {
        comboLat = lat2;
        comboLon = lon2;
    }
    else {
        comboLat = lat3;   
        comboLon = lon3;
    }

    sMap.panTo(new google.maps.LatLng(comboLat, comboLon));

    if (sMap) {
        if (sMap.getBounds()) {
            while (offMap()) {
                sMap.setZoom(sMap.getZoom() - 1);
            }
        }
    }
}
