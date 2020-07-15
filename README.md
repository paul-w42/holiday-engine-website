# Holiday Engine Website
The Holiday Engine website ( holidayengine.org ) is a mostly static site that presents various information pertaining to our yearly Holiday Engine Food Drive, including scheduling, routes, and community sponsors.

In addition to basic static information, there is also a page that lets visitors track the Holiday Engines in near real-time.

In addition to the website, there is an android app used to transmit engine locations, and a server-side executable (golang based) that receives those location updates and in turn updates the location data files for the website.

### Licensing

This software is released under the MIT license.  See the included LICENSE file.

This site does use [https://github.com/jquery/jquery](jQuery) which is licensed under the MIT license.

The pages that display maps also utilise the Google Maps API, which uses a commercial license.


### Development Notes

* Requires a Google API Key for map functionality.  The ```routes-map.html``` page, the ```track.html``` / ```track-bc.html``` pages, ```maplevalley-maps.html```, and ```covington-maps.html``` all require this key.  Those locations are marked with ```[KEY-VALUE-HERE]```

* Most of the site is basic html, though the route description pages and the tracking page both use Google Maps.  The latter also utilizes quite a bit of javascript (compared to the rest of the site) to update Engine locations.

* The ```track-bc.html``` page adds breadcrumbs functionality to the ```track.html``` page. 

* Some javascript functions only work from behind a web server, so for testing purposes it is useful to use the built in python 3 server, with the command: 

  > ```$ python3 -m http.server```

* Mapping in neighborhood/route pages
  - Most work is done inside the imported javascript file, ```neighborhoods2020.js```
  - The ```routesList``` array contains a list of datecodes and corresponding neighborhoods visited, arranged by route/engine.
  - The ```comboLatList``` and ```comboLonList``` contain the values for LatLon used to create/center Google map objects.
  - In some neighborhoods a block party is attended as opposed to walking the entire route.  These are listed under the ```parties``` list.
  - The date-code is in a format of ```YYYYMMDD``` (there must be two day values).
  - Linking to a days route page is done with four separate parameter values, three of them have useful defaults (we link from ```routes-mv.html``` and ```routes-covington.html``` pages).
    - ```d``` for date-code, i.e. ```20201204```
    - ```e``` for engines, default is ```1,2```.  For our purposes, 1..4 are valid values.
    - ```c``` for location code - possibly unique to us, as we have two locales served by one fire district.  Another option is to have a separate site or routes page for a different locale.  Default is blank, which calls our primary locale.
    - ```z``` zoom level to default to when displaying the map.  Default value is 14.


### Tracking Engines

The tracking part is heavily reliant on both the Google Maps API and Javascript. As engine locations change, the coordinates in their respective static ```.js``` files on the website are updated by the server.

The website re-loads these files approximately every 3 seconds (w/ an appended unix time stamp parameter to force a fresh load). The engine location is then updated on the map.

Attempted this year but just now completed, a bread crumb trail is supposed to display itself on the tracking page for each engine. The purpose here is that if a visitor is late to the page, they can determine if the engine has passed their location yet or not. This works in testing locally.

### Route Planning and Playback

One of the large challenges for this event is efficiently planning an evenings routes so that the engine(s) can cover what has been planned without staying out too late (generally 9pm goal).

For that purpose over time a route playback mechanism has been created.  This latest version uses the breadcrumbs that are generated for the tracking page, saves those to a different location after the route has been finished, and makes them viewable with the ```route-playback.html``` page.  It is recommended that this page not be made public.

### To Do Items

Note that ```track-bc.html``` (breadcrumbs) library is written in ES6 primarily, and could be converted to .js with babel for increased compatibility.

