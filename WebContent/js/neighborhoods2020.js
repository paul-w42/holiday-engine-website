// Clients index and lookup by a date key
// Format is YEARMODY, i.e. [20181201] - Note the two-digit day value.  Please use.
// Great little javascript playground - https://jscomplete.com/playground

    /* AVAILABLE NEIGHBORHOODS ARE ... wildernessbrook arborsrockcreek arborsrockcreekfull lwcc_community_event
    arborsmaplewoods barclaywoods belmontcourt belmonte bellmontwoods cherryvale cedardowns cherokeebay daybreak daybreak_upper
    diamondhills upper_diamondhills eastwoodforest elkrun elkrun2 elkrun4 glaciercrest glaciervalley greenbrier2 haleysterrace
    hamptongrove highlandgreens highlandscedardowns highlandscedarriver highlandslakewilderness jaquelinemeadows jordanscrossing
    katesridge lakeforestestates lakepark lakewildernessvilla locloman lwccdrive malloy maplecrossingaptmts mapleglen 
    mapleridge maplewoods mountainview patricksfair pebblecreek riverbend rockcreekmeadows rockcreekranch  rosewoodpark
    rotaryneighborhood1 sawyercrest shadowfirs shadowridge thereserve thewoods terracemaplewoods valleygreen
    valleymeadows valleycrest vinemapleplace1 vinemapleplace2 watergardens wildernessdowns wildernessestates
    wildernesshollow woodridge wildernessgrove wildernessgrove_north  wildernessvillageaptmts sunshineGrove lower_diamondhills foxPointe parkHaven

    // Covington - heatherGlenn tahomaVista canaryHill madisonView 
    countryClubPlace croftinHills croftinHeights tamarack foxwood woodcreek 
    parkMeadowsRainierVista fairfield cohoCreek stonefield highpointe cornerstone lakeWinterwood
    (these next three north end of 204th Ave SE) mapleHills shireHills cedarCreekParke 

    Elk Run / Witte & 221st Ave SE  --> elkrun2
    Elk Run / SE 281st st           --> elkrun3
    Elk Run / SE 277th Pl           --> elkrun4
    */

// list of neighborhood map objects
var routesList = [
    // Maple Valley
    {route: "20201204-1", neighborhoods: ["mountainview","rockcreekmeadows","wildernessbrook","cantoncrossing","wildernessgrove_north","katesridge"]},

    {route: "20201205-1", neighborhoods: ["mapleridge","maplewoods", "arborsmaplewoods","terracemaplewoods"]},
    {route: "20201205-2", neighborhoods: ["meadowsatrockcreek","wildernessdowns", "hamptongrove","valleycrest","barclaywoods", "jordanscrossing", 
    "glaciercrest", "cherryvale", "sunshineGrove", "foxPointe"]},

    {route: "20201211-1", neighborhoods: ["elkrun4","mapleglen","upper_diamondhills"]},
    {route: "20201211-2", neighborhoods: ["lower_diamondhills","rosewoodpark","glaciervalley","highlandscedardowns", "elkrun2"]},

    {route: "20201212-1", neighborhoods: ["valleymeadows","valleygreen","daybreak_upper", "patricksfair"]},
    {route: "20201212-2", neighborhoods: ["belmontcourt","belmonte","bellmontwoods", "jaquelinemeadows"]},

    {route: "20201218-1", neighborhoods: ["haleysterrace","thereserve","eastwoodforest","elkrun3"]},
    {route: "20201218-2", neighborhoods: ["thewoods", "parkHaven", "lakepark", "highlandslakewilderness","arborsrockcreekfull", "lakeforestestates"]},

    {route: "20201219-4", neighborhoods: ["lakewildernessvilla","watergardens"]},
    {route: "20201219-1", neighborhoods: ["woodridge","highlandgreens","lwccdrive"]},
    {route: "20201219-2", neighborhoods: ["pebblecreek","shadowfirs","sawyercrest","greenbrier2"]},
    

    {route: "20200101-1", neighborhoods: ["lakewildernessvilla","watergardens", "pebblecreek","shadowfirs","sawyercrest","greenbrier2",
    "woodridge","highlandgreens","lwccdrive", "thewoods", "parkHaven", "lakepark", "highlandslakewilderness","arborsrockcreekfull", 
    "haleysterrace","thereserve","eastwoodforest","elkrun3", "belmontcourt","belmonte","bellmontwoods", "foxPointe", "jaquelinemeadows",
    "valleymeadows","valleygreen","daybreak_upper", "patricksfair", "lower_diamondhills", "arborsmaplewoods","terracemaplewoods",
    "rosewoodpark","glaciervalley", "elkrun4","mapleglen","upper_diamondhills", "meadowsatrockcreek","wildernessdowns",
    "highlandscedardowns", "elkrun2", "mapleridge","maplewoods", "mountainview","rockcreekmeadows","wildernessbrook",
    "cantoncrossing","wildernessgrove_north","katesridge", "hamptongrove","valleycrest","barclaywoods","jordanscrossing",
    "glaciercrest","cherryvale", "sunshineGrove"]},

    // Covington
    {route: "20201204-2", neighborhoods: ["cohoCreek", "lakeWinterwood"]},
    {route: "20201204-3", neighborhoods: ["parkMeadowsRainierVista"]}, 

    {route: "20201205-3", neighborhoods: ["mapleHills", "shireHills", "cornerstone"]}, // shirehills includes addisons landing

    {route: "20201211-3", neighborhoods: ["woodcreek", "foxwood"]},

    {route: "20201212-3", neighborhoods: ["madisonView", "canaryHill", "heatherGlenn", "tahomaVista", 
        "countryClubPlace", "mvcc", "ridgefield"]},

    {route: "20201218-3", neighborhoods: ["stonefield", "fairfield"]},

    {route: "20201219-3", neighborhoods: ["tamarack", "croftinHeights", "croftinHills", "highpointe" ]},

    //, "forestCreek"
    {route: "20200101-3", neighborhoods: ["parkMeadowsRainierVista", "cornerstone", "mapleHills", "cedarCreekParke", "shireHills", "woodcreek", 
    "foxwood", "cohoCreek", "stonefield", "highpointe", "fairfield", "madisonView", "canaryHill", "heatherGlenn", "tahomaVista", "countryClubPlace", 
    "tamarack", "croftinHeights", "croftinHills", "lakeWinterwood", "mvcc", "ridgefield"]},

    
    ];

// Center of map display for this days routes - latitude
var comboLatList = {
    "20201204": 47.363600,
    "20201205": 47.367075,
    "20201211": 47.360077,
    "20201212": 47.383474,
    "20201218": 47.366109,
    "20201219": 47.359166,
    "20200101": 47.366792,

    "20201204-c": 47.370983,
    "20201205-c": 47.368017,
    "20201211-c": 47.369399,
    "20201212-c": 47.378541,
    "20201218-c": 47.368536,
    "20201219-c": 47.370647,
    "20200101-c": 47.369524

    };
   
// Center of map display for this days routes - longitude
var comboLonList = {    
    "20201204": -122.037630,
    "20201205": -122.032333,
    "20201211": -122.040804,
    "20201212": -122.040417,
    "20201218": -122.040249,
    "20201219": -122.031444,
    "20200101": -122.036685,

    "20201204-c": -122.098539,
    "20201205-c": -122.069892,
    "20201211-c": -122.111198,
    "20201212-c": -122.157204,
    "20201218-c": -122.125267,
    "20201219-c": -122.125398,
    "20200101-c": -122.113678
    };

// Parse parties per route instead of day (was showing MV on Covington Map & opp)
var parties = {
    "20201205-2": [[47.354299, -122.023385]],
    "20201211-2": [[47.369608, -122.057258], [47.354031, -122.045111], [47.350063, -122.024188]], 
    "20201218-1": [[47.349527, -122.053067]],
    "20201218-2": [[47.379562, -122.032871], [47.372832, -122.026794]],
    "20201219-1": [[47.369146, -122.040218]],
    "20201219-2": [[47.340736, -122.027880]],

    "20201212-3": [[47.378562, -122.157982]]   // Meridian Valley CC
};

/* true/false - load markers/names on map
 *  map       - the map object for this page.  was destroying/deleting current object by
 *              declaring new in loadneighborhoods function
*/
function loadNeighborhoods() {

    var neighborhoods = {};


    var ridgefield  = [ 
        new google.maps.LatLng(47.385900, -122.149626),
        new google.maps.LatLng(47.385900, -122.147522),
        new google.maps.LatLng(47.384404, -122.147522),
        new google.maps.LatLng(47.384404, -122.144193),
        new google.maps.LatLng(47.379972, -122.144193),
        new google.maps.LatLng(47.379972, -122.147908),
        new google.maps.LatLng(47.384200, -122.149733)
    ];

    neighborhoods["ridgefield"] = ridgefield;


    var parkMeadowsRainierVista = [ 
        new google.maps.LatLng(47.383672, -122.100426),
        new google.maps.LatLng(47.385305, -122.100426),
        new google.maps.LatLng(47.385305, -122.098967),
        new google.maps.LatLng(47.383672, -122.098967),
        new google.maps.LatLng(47.383672, -122.096360),
        new google.maps.LatLng(47.385965, -122.096295),
        new google.maps.LatLng(47.385965, -122.095319),
        new google.maps.LatLng(47.384480, -122.093366),
        new google.maps.LatLng(47.380734, -122.096521),
        new google.maps.LatLng(47.380734, -122.101617),
        new google.maps.LatLng(47.382187, -122.101617),
        new google.maps.LatLng(47.382187, -122.099471),
        new google.maps.LatLng(47.383441, -122.099471),
        new google.maps.LatLng(47.383475, -122.100426)
    ];

    neighborhoods["parkMeadowsRainierVista"] = parkMeadowsRainierVista;

    var parkHaven  = [ 
        new google.maps.LatLng(47.385060, -122.039850),
        new google.maps.LatLng(47.384912, -122.037696),
        new google.maps.LatLng(47.383798, -122.037500),
        new google.maps.LatLng(47.383876, -122.038522),
	    new google.maps.LatLng(47.384698, -122.039775)
    ];

    neighborhoods["parkHaven"] = parkHaven;

    var sunshineGrove  = [ 
	    new google.maps.LatLng(47.352557, -122.021548),
	    new google.maps.LatLng(47.352557, -122.020244),
	    new google.maps.LatLng(47.352026, -122.020164),
	    new google.maps.LatLng(47.352034, -122.021526)
	];
	
	neighborhoods["sunshineGrove"] = sunshineGrove;
    

    var kentTamarack = [ 
	    new google.maps.LatLng(47.378692, -122.128199),
	    new google.maps.LatLng(47.378692, -122.123103),
	    new google.maps.LatLng(47.376080, -122.123103),
	    new google.maps.LatLng(47.376080, -122.128199)
	];
	
	neighborhoods["kentTamarack"] = kentTamarack;

    var kentCroftinheights = [ 
	    new google.maps.LatLng(47.376011, -122.126734),
	    new google.maps.LatLng(47.374638, -122.126734),
	    new google.maps.LatLng(47.374638, -122.126407),
	    new google.maps.LatLng(47.373065, -122.126407),
	    new google.maps.LatLng(47.373065, -122.123103),
	    new google.maps.LatLng(47.376011, -122.123103)
	];
	
	neighborhoods["kentCroftinheights"] = kentCroftinheights;
	
    var kentCroftinhills = [ 
	    new google.maps.LatLng(47.372575, -122.126520),
	    new google.maps.LatLng(47.374556, -122.126520),
	    new google.maps.LatLng(47.374556, -122.128297),
	    new google.maps.LatLng(47.376058, -122.128297),
	    new google.maps.LatLng(47.376058, -122.131191),
	    new google.maps.LatLng(47.375147, -122.131191),
	    new google.maps.LatLng(47.375147, -122.131749),
	    new google.maps.LatLng(47.374209, -122.131749),
	    new google.maps.LatLng(47.374209, -122.133557),
	    new google.maps.LatLng(47.372575, -122.133557)
	];
	
	neighborhoods["kentCroftinhills"] = kentCroftinhills;
	
    var kentCountryclubplace = [ 
	    new google.maps.LatLng(47.375993, -122.154837),
	    new google.maps.LatLng(47.372495, -122.154837),
	    new google.maps.LatLng(47.372495, -122.156629),
	    new google.maps.LatLng(47.374242, -122.156629),
	    new google.maps.LatLng(47.374242, -122.159998),
	    new google.maps.LatLng(47.375993, -122.159998)
	];
	
	neighborhoods["kentCountryclubplace"] = kentCountryclubplace;
	
    var kentMadisonview = [ 
	    new google.maps.LatLng(47.372513, -122.156688),
	    new google.maps.LatLng(47.372513, -122.158357),
	    new google.maps.LatLng(47.374224, -122.158357),
	    new google.maps.LatLng(47.374224, -122.156688)
	];
	
	neighborhoods["kentMadisonview"] = kentMadisonview;
	
    var kentCanaryhill = [ 
	    new google.maps.LatLng(47.372520, -122.158464),
	    new google.maps.LatLng(47.372520, -122.159998),
	    new google.maps.LatLng(47.374231, -122.159998),
	    new google.maps.LatLng(47.374231, -122.158464)
	];
	
	neighborhoods["kentCanaryhill"] = kentCanaryhill;	
	
    var kentTahomavista = [ 
	    new google.maps.LatLng(47.374307, -122.160148),
	    new google.maps.LatLng(47.374307, -122.161758),
	    new google.maps.LatLng(47.375114, -122.161758),
	    new google.maps.LatLng(47.375088, -122.165336),
	    new google.maps.LatLng(47.375989, -122.165336),
	    new google.maps.LatLng(47.375989, -122.160148)
	];
	
	neighborhoods["kentTahomavista"] = kentTahomavista;
	
    var kentHeatherglenn = [ 
	    new google.maps.LatLng(47.373951, -122.161763),
	    new google.maps.LatLng(47.373951, -122.165336),
	    new google.maps.LatLng(47.375067, -122.165336),
	    new google.maps.LatLng(47.375067, -122.161763)
	];
	
	neighborhoods["kentHeatherglenn"] = kentHeatherglenn;

    var elkrun3 = [ // SE 281st St
	    new google.maps.LatLng(47.350026, -122.053433),
	    new google.maps.LatLng(47.350026, -122.050445),
	    new google.maps.LatLng(47.349242, -122.050445),
	    new google.maps.LatLng(47.349242, -122.053433)
	];

    neighborhoods["elkrun3"] = elkrun3;

    var foxwood = [
		new google.maps.LatLng(47.368952, -122.105833),
        new google.maps.LatLng(47.372513, -122.105833),
		new google.maps.LatLng(47.372513, -122.110902),
		new google.maps.LatLng(47.368952, -122.110902)
	];

    neighborhoods["foxwood"] = foxwood

    var lwcc_community_event = [
        new google.maps.LatLng(47.369347, -122.040116),
        new google.maps.LatLng(47.369180, -122.039860),
        new google.maps.LatLng(47.369067, -122.040085),
        new google.maps.LatLng(47.369251, -122.040310)
    ];

    neighborhoods["lwcc_community_event"] = lwcc_community_event;

    var wildernessbrook = [
         new google.maps.LatLng(47.362099, -122.042889),
         new google.maps.LatLng(47.362099, -122.040191),
         new google.maps.LatLng(47.362953, -122.040191),
         new google.maps.LatLng(47.362953, -122.042739)
     ];

    neighborhoods["wildernessbrook"] = wildernessbrook;

    var cantoncrossing = [
         new google.maps.LatLng(47.364227, -122.041904),
         new google.maps.LatLng(47.364227, -122.037634),
         new google.maps.LatLng(47.363434, -122.037634),
         new google.maps.LatLng(47.363434, -122.040199),
         new google.maps.LatLng(47.362998, -122.040199),
         new google.maps.LatLng(47.362998, -122.041904)
     ];

    neighborhoods["cantoncrossing"] = cantoncrossing;


    var arborsrockcreek = [
        new google.maps.LatLng(47.368813, -122.019533),
        new google.maps.LatLng(47.370674, -122.019533),
        new google.maps.LatLng(47.370674, -122.018382),
        new google.maps.LatLng(47.371226, -122.018382),
        new google.maps.LatLng(47.371226, -122.016279),
        new google.maps.LatLng(47.368813, -122.016279)
    ];

    neighborhoods["arborsrockcreek"] = arborsrockcreek;

    var arborsrockcreekfull = [
        new google.maps.LatLng(47.368813, -122.022330),
        new google.maps.LatLng(47.370674, -122.022330),
        new google.maps.LatLng(47.370674, -122.018382),
        new google.maps.LatLng(47.371226, -122.018382),
        new google.maps.LatLng(47.371226, -122.016279),
        new google.maps.LatLng(47.368813, -122.016279)
    ];

    neighborhoods["arborsrockcreekfull"] = arborsrockcreekfull;


    var mapleglen = [
        new google.maps.LatLng(47.347781, -122.037914),
        new google.maps.LatLng(47.347781, -122.044673),
        new google.maps.LatLng(47.349422, -122.044598),
        new google.maps.LatLng(47.351392, -122.042763),
        new google.maps.LatLng(47.351457, -122.041326),
        new google.maps.LatLng(47.352235, -122.037871)
    ];

    neighborhoods["mapleglen"] = mapleglen;

    var diamondhills = [
        new google.maps.LatLng(47.350598, -122.037576),
        new google.maps.LatLng(47.347721, -122.037576),
        new google.maps.LatLng(47.347721, -122.032560),
        new google.maps.LatLng(47.350592, -122.032512)
    ];

    neighborhoods["diamondhills"] = diamondhills;

    var rosewoodpark = [
        new google.maps.LatLng(47.350592, -122.032308),
        new google.maps.LatLng(47.348215, -122.032431),
        new google.maps.LatLng(47.348019, -122.031691),
        new google.maps.LatLng(47.348746, -122.027271),
        new google.maps.LatLng(47.350592, -122.027260)
    ];

    neighborhoods["rosewoodpark"] = rosewoodpark;

    var wildernessestates = [
        new google.maps.LatLng(47.382646, -122.048010),
        new google.maps.LatLng(47.381941, -122.047377),
        new google.maps.LatLng(47.381062, -122.043225),
        new google.maps.LatLng(47.382602, -122.042688),
        new google.maps.LatLng(47.383125, -122.042710),
        new google.maps.LatLng(47.383125, -122.043804),
        new google.maps.LatLng(47.382206, -122.044432),
        new google.maps.LatLng(47.382657, -122.046223),
        new google.maps.LatLng(47.383198, -122.046942),
        new google.maps.LatLng(47.383267, -122.048010),
    ];

    neighborhoods["wildernessestates"] = wildernessestates;

    var wildernessdowns = [
        new google.maps.LatLng(47.380248, -122.055391),
        new google.maps.LatLng(47.383343, -122.055391),
        new google.maps.LatLng(47.383343, -122.057043),
        new google.maps.LatLng(47.381607, -122.057076),
        new google.maps.LatLng(47.380248, -122.056968)
    ];

     neighborhoods["wildernessdowns"] = wildernessdowns;

    var daybreak = [
        new google.maps.LatLng(47.382922, -122.021134),
        new google.maps.LatLng(47.383387, -122.021842),
        new google.maps.LatLng(47.384309, -122.023355),
        new google.maps.LatLng(47.385711, -122.025265),
        new google.maps.LatLng(47.388290, -122.029138),
        new google.maps.LatLng(47.390244, -122.032077),
        new google.maps.LatLng(47.390433, -122.031230),
        new google.maps.LatLng(47.388936, -122.028998),
        new google.maps.LatLng(47.388065, -122.026305),
        new google.maps.LatLng(47.385428, -122.023634),
        new google.maps.LatLng(47.386597, -122.024589),
        new google.maps.LatLng(47.386866, -122.022260),
        new google.maps.LatLng(47.386074, -122.020168),
        new google.maps.LatLng(47.386089, -122.019063),
        new google.maps.LatLng(47.388050, -122.019535),
        new google.maps.LatLng(47.388225, -122.018087),
        new google.maps.LatLng(47.386765, -122.017390),
        new google.maps.LatLng(47.384469, -122.017432)
    ];

    neighborhoods["daybreak"] = daybreak;

    var daybreak_upper = [
        new google.maps.LatLng(47.390137, -122.031954),
        new google.maps.LatLng(47.383141, -122.021729),
        new google.maps.LatLng(47.383338, -122.020571),
        new google.maps.LatLng(47.384347, -122.020141),
        new google.maps.LatLng(47.385497, -122.023269),
        new google.maps.LatLng(47.388228, -122.026016),
        new google.maps.LatLng(47.390529, -122.031246)
    ];

    neighborhoods["daybreak_upper"] = daybreak_upper;

    var pebblecreek = [
        new google.maps.LatLng(47.343737, -122.042978),
        new google.maps.LatLng(47.345700, -122.043021),
        new google.maps.LatLng(47.345947, -122.037570),
        new google.maps.LatLng(47.344886, -122.037699),
        new google.maps.LatLng(47.343737, -122.038150)
    ];

    neighborhoods["pebblecreek"] = pebblecreek;

    var shadowfirs = [
        new google.maps.LatLng(47.345933, -122.027678),
        new google.maps.LatLng(47.345904, -122.031004),
        new google.maps.LatLng(47.346369, -122.033172),
        new google.maps.LatLng(47.347299, -122.032442),
        new google.maps.LatLng(47.347692, -122.030833),
        new google.maps.LatLng(47.348041, -122.026970),
        new google.maps.LatLng(47.348375, -122.024910),
        new google.maps.LatLng(47.348375, -122.023323),
        new google.maps.LatLng(47.348055, -122.022121),
        new google.maps.LatLng(47.347459, -122.020898),
        new google.maps.LatLng(47.347125, -122.021391),
        new google.maps.LatLng(47.347009, -122.026412),
        new google.maps.LatLng(47.345933, -122.026370)
    ];

    neighborhoods["shadowfirs"] = shadowfirs;
    /*
    var lwccdrive = [   // includes Crowne Pointe
        new google.maps.LatLng(47.379393, -122.047961),	// NW
        new google.maps.LatLng(47.378703, -122.043230), // NE
        new google.maps.LatLng(47.377831, -122.043573),
        new google.maps.LatLng(47.376785, -122.045472),
        new google.maps.LatLng(47.376312, -122.045987), // SE 250th St
        new google.maps.LatLng(47.375833, -122.043756),	// .. clockwise ..
        new google.maps.LatLng(47.373713, -122.041186),
        new google.maps.LatLng(47.372027, -122.040306),
        new google.maps.LatLng(47.370036, -122.040092),
        new google.maps.LatLng(47.369064, -122.038995),
        new google.maps.LatLng(47.367223, -122.038166),
        new google.maps.LatLng(47.366474, -122.038713),
        new google.maps.LatLng(47.365798, -122.039915),	// entrance highland greens
        new google.maps.LatLng(47.366394, -122.042018),
        new google.maps.LatLng(47.368160, -122.042640),
        new google.maps.LatLng(47.368778, -122.040913),
        new google.maps.LatLng(47.370502, -122.042152),
        new google.maps.LatLng(47.371926, -122.042130),
        new google.maps.LatLng(47.371868, -122.045156),	// cul-d-sac
        new google.maps.LatLng(47.373844, -122.045671),	// cul-d-sac
        new google.maps.LatLng(47.373655, -122.043375),
        new google.maps.LatLng(47.374774, -122.044576),
        new google.maps.LatLng(47.375689, -122.047452),	// club house
        new google.maps.LatLng(47.378116, -122.047366),
        new google.maps.LatLng(47.378789, -122.047969)
    ];

    neighborhoods["lwccdrive"] = lwccdrive; */

    var cherokeebay = [
        new google.maps.LatLng(47.358224, -122.055531), // bottom left
        new google.maps.LatLng(47.358224, -122.045360),
        new google.maps.LatLng(47.361247, -122.045360),
        new google.maps.LatLng(47.363689, -122.043171),
        new google.maps.LatLng(47.368569, -122.045553),
        new google.maps.LatLng(47.368569, -122.047720),
        new google.maps.LatLng(47.365371, -122.048085),
        new google.maps.LatLng(47.365371, -122.052505),
        new google.maps.LatLng(47.364775, -122.054522),
        new google.maps.LatLng(47.365066, -122.058041)
    ];

    neighborhoods["cherokeebay"] = cherokeebay;

    var lwccdrive = [   // includes Crowne Pointe */
        new google.maps.LatLng(47.375715, -122.047462),

        new google.maps.LatLng(47.374087, -122.044544),
        new google.maps.LatLng(47.373390, -122.046046),
        new google.maps.LatLng(47.371908, -122.044373),
        new google.maps.LatLng(47.371995, -122.042356),
        new google.maps.LatLng(47.368594, -122.041197),
        new google.maps.LatLng(47.367897, -122.042699),
        new google.maps.LatLng(47.366240, -122.042012),
        new google.maps.LatLng(47.366007, -122.038450),
        new google.maps.LatLng(47.369147, -122.038794),
        new google.maps.LatLng(47.373157, -122.040768),
        new google.maps.LatLng(47.375541, -122.043514),
        new google.maps.LatLng(47.376383, -122.045639),
        new google.maps.LatLng(47.376885, -122.045944),
        new google.maps.LatLng(47.377939, -122.043477),
        new google.maps.LatLng(47.378782, -122.043434),
        new google.maps.LatLng(47.379246, -122.045660),
        new google.maps.LatLng(47.379289, -122.047935),
        new google.maps.LatLng(47.378185, -122.047935),
        new google.maps.LatLng(47.377401, -122.046969)
    ];

    neighborhoods["lwccdrive"] = lwccdrive;

    var highlandgreens = [
        new google.maps.LatLng(47.364148, -122.040719),
        new google.maps.LatLng(47.364148, -122.037640),
        new google.maps.LatLng(47.366081, -122.037715),
        new google.maps.LatLng(47.366023, -122.039496),
        new google.maps.LatLng(47.365456, -122.040655),
    ];

    neighborhoods["highlandgreens"] = highlandgreens;

    var highlandslakewilderness = [
        new google.maps.LatLng(47.381216, -122.037426), /* top left - maps counter-clockwise */
        new google.maps.LatLng(47.379865, -122.036546),
        new google.maps.LatLng(47.376763, -122.033188),
        new google.maps.LatLng(47.375930, -122.032300),
        new google.maps.LatLng(47.375930, -122.030194),
        new google.maps.LatLng(47.374714, -122.028435),
        new google.maps.LatLng(47.374714, -122.026922),
        new google.maps.LatLng(47.377417, -122.030731), /* left of wild hollow */
        new google.maps.LatLng(47.378841, -122.030849),
        new google.maps.LatLng(47.379800, -122.030205),
        new google.maps.LatLng(47.381516, -122.030629), /* top right */
        new google.maps.LatLng(47.382190, -122.031568),
        new google.maps.LatLng(47.382103, -122.037415)
    ];

    neighborhoods["highlandslakewilderness"] = highlandslakewilderness;


    var greenbrier2 = [
        new google.maps.LatLng(47.343334, -122.032249),
        new google.maps.LatLng(47.340228, -122.032249),
        new google.maps.LatLng(47.339799, -122.026563),
        new google.maps.LatLng(47.341013, -122.027024),
        new google.maps.LatLng(47.341871, -122.027432),
        new google.maps.LatLng(47.343334, -122.027453)
    ];

    neighborhoods["greenbrier2"] = greenbrier2;


    var watergardens = [
        new google.maps.LatLng(47.357855, -122.052956),
        new google.maps.LatLng(47.357586, -122.052956),
        new google.maps.LatLng(47.357586, -122.053546),
        new google.maps.LatLng(47.356540, -122.053546),
        new google.maps.LatLng(47.356540, -122.052339),
        new google.maps.LatLng(47.356100, -122.052339),
        new google.maps.LatLng(47.356100, -122.051046),
        new google.maps.LatLng(47.354461, -122.051046),
        new google.maps.LatLng(47.354461, -122.048310),
        new google.maps.LatLng(47.357855, -122.048310)
    ];

    neighborhoods["watergardens"] = watergardens;

    var lakewildernessvilla = [
        new google.maps.LatLng(47.385907, -122.047996), // entrance north
        new google.maps.LatLng(47.385064, -122.047996), // entrance south
        new google.maps.LatLng(47.385064, -122.044027),
        new google.maps.LatLng(47.383234, -122.044027),
        new google.maps.LatLng(47.383234, -122.042803),
        new google.maps.LatLng(47.386699, -122.042803),
        new google.maps.LatLng(47.386699, -122.046430),
        new google.maps.LatLng(47.385907, -122.046430)
    ];

    neighborhoods["lakewildernessvilla"] = lakewildernessvilla;


    var lakeforestestates = [
        new google.maps.LatLng(47.374531, -122.026831),
        new google.maps.LatLng(47.375017, -122.025576),
        new google.maps.LatLng(47.374313, -122.024910),
        new google.maps.LatLng(47.372482, -122.024015),
        new google.maps.LatLng(47.372336, -122.026241),
        new google.maps.LatLng(47.372336, -122.030597),
        new google.maps.LatLng(47.374494, -122.030650)
    ];

    neighborhoods["lakeforestestates"] = lakeforestestates;


    var wildernesshollow = [
        new google.maps.LatLng(47.377669, -122.027228),
        new google.maps.LatLng(47.376514, -122.026541),
        new google.maps.LatLng(47.376078, -122.026520),
        new google.maps.LatLng(47.376035, -122.027571),
        new google.maps.LatLng(47.376383, -122.028558),
        new google.maps.LatLng(47.377844, -122.029921),
        new google.maps.LatLng(47.378912, -122.029771),
        new google.maps.LatLng(47.379587, -122.028805),
        new google.maps.LatLng(47.378163, -122.027689)
    ];

    neighborhoods["wildernesshollow"] = wildernesshollow;

    var maplewoods = [
        new google.maps.LatLng(47.355849, -122.016102),
        new google.maps.LatLng(47.351997, -122.015029),
        new google.maps.LatLng(47.351880, -122.011296),
        new google.maps.LatLng(47.349642, -122.004901),
        new google.maps.LatLng(47.350790, -122.004193),
        new google.maps.LatLng(47.352680, -122.009000),
        new google.maps.LatLng(47.354730, -122.010695),
        new google.maps.LatLng(47.355035, -122.013055),
        new google.maps.LatLng(47.356096, -122.013463)
    ];

    neighborhoods["maplewoods"] = maplewoods;

    var mapleridge = [
        new google.maps.LatLng(47.350688, -122.003399),
        new google.maps.LatLng(47.351546, -121.998636),
        new google.maps.LatLng(47.356067, -121.998850),
        new google.maps.LatLng(47.356300, -122.003528),
        new google.maps.LatLng(47.355820, -122.004772),
        new google.maps.LatLng(47.354235, -122.005137),
        new google.maps.LatLng(47.352287, -122.001854),
        new google.maps.LatLng(47.351633, -122.003485)
    ];

    neighborhoods["mapleridge"] = mapleridge;

    var arborsmaplewoods = [
        new google.maps.LatLng(47.353799, -122.016483),
        new google.maps.LatLng(47.352185, -122.016580),
        new google.maps.LatLng(47.352127, -122.019036),
        new google.maps.LatLng(47.353849, -122.019101)
    ];

    neighborhoods["arborsmaplewoods"] = arborsmaplewoods;

    var woodridge = [
        new google.maps.LatLng(47.365224, -122.021466),
        new google.maps.LatLng(47.367302, -122.022003),
        new google.maps.LatLng(47.367251, -122.016558),
        new google.maps.LatLng(47.365224, -122.016451)
    ];

    neighborhoods["woodridge"] = woodridge;


    var elkrun = [
        new google.maps.LatLng(47.354817, -122.038053),
        new google.maps.LatLng(47.357731, -122.037887),
        new google.maps.LatLng(47.357484, -122.040773),
        new google.maps.LatLng(47.354119, -122.040907)
    ];

    neighborhoods["elkrun"] = elkrun;

    var glaciervalley = [
        new google.maps.LatLng(47.350621, -122.019954),
        new google.maps.LatLng(47.348841, -122.019846),
        new google.maps.LatLng(47.348790, -122.022990),
        new google.maps.LatLng(47.348877, -122.024696),
        new google.maps.LatLng(47.348782, -122.026820),
        new google.maps.LatLng(47.349109, -122.027099),
        new google.maps.LatLng(47.350621, -122.027099)
    ];

    neighborhoods["glaciervalley"] = glaciervalley;

    var vinemapleplace2 = [
        new google.maps.LatLng(47.383237, -122.048227),
        new google.maps.LatLng(47.383237, -122.049018),
        new google.maps.LatLng(47.382505, -122.048227)
    ];

    neighborhoods["vinemapleplace2"] = vinemapleplace2;

    var foxPointe = [
        new google.maps.LatLng(47.379551, -122.026618),
        new google.maps.LatLng(47.379551, -122.023705),
        new google.maps.LatLng(47.378392, -122.023770),
        new google.maps.LatLng(47.377859, -122.024411),
        new google.maps.LatLng(47.379121, -122.026618)
    ];

    neighborhoods["foxPointe"] = foxPointe;

    var belmontcourt = [
        new google.maps.LatLng(47.377853, -122.024074),
        new google.maps.LatLng(47.376523, -122.021670),
        new google.maps.LatLng(47.376947, -122.021252),
        new google.maps.LatLng(47.378222, -122.021456),
        new google.maps.LatLng(47.378379, -122.023612)
    ];

    neighborhoods["belmontcourt"] = belmontcourt;

    var belmonte = [
        new google.maps.LatLng(47.378389, -122.023591),	// southwest corner
        new google.maps.LatLng(47.378299, -122.021365), // southeast corner
        new google.maps.LatLng(47.379661, -122.021365), // added SE 248th PL
        new google.maps.LatLng(47.379661, -122.023510)
        //new google.maps.LatLng(47.379018, -122.021552),
        //new google.maps.LatLng(47.379018, -122.023532)
    ];

    neighborhoods["belmonte"] = belmonte;

    var valleymeadows = [
        new google.maps.LatLng(47.386859, -122.034180),
        new google.maps.LatLng(47.387150, -122.034566),
        new google.maps.LatLng(47.390316, -122.034867),
        new google.maps.LatLng(47.389343, -122.032099),
        new google.maps.LatLng(47.387113, -122.032270),
        new google.maps.LatLng(47.386859, -122.033300)
    ];

    neighborhoods["valleymeadows"] = valleymeadows;


    var locloman = [
        new google.maps.LatLng(47.401007, -121.964722),
        new google.maps.LatLng(47.398015, -121.966331),
        new google.maps.LatLng(47.398030, -121.960237),
        new google.maps.LatLng(47.398945, -121.960194),
        new google.maps.LatLng(47.399598, -121.960473),
        new google.maps.LatLng(47.401007, -121.961267),
        new google.maps.LatLng(47.399656, -121.964335),
        new google.maps.LatLng(47.401007, -121.962662)
        ];

    neighborhoods["locloman"] = locloman;

    var rockcreekranch = [
        new google.maps.LatLng(47.354045, -121.984785),
        new google.maps.LatLng(47.353783, -121.987746),
        new google.maps.LatLng(47.353943, -121.990900),
        new google.maps.LatLng(47.354736, -121.990407),
        new google.maps.LatLng(47.354886, -121.989428),
        new google.maps.LatLng(47.355575, -121.988953),
        new google.maps.LatLng(47.355936, -121.986995),
        /* new google.maps.LatLng(47.355770, -121.991163),
        new google.maps.LatLng(47.357359, -121.989162),
        new google.maps.LatLng(47.356734, -121.989119), */
        new google.maps.LatLng(47.355770, -121.984892),
        new google.maps.LatLng(47.354830, -121.984935)
    ];

    neighborhoods["rockcreekranch"] = rockcreekranch;

    /* up above spring lake */
    var shadowridge = [
        new google.maps.LatLng(47.444517, -122.086987),
        new google.maps.LatLng(47.446114, -122.086279),
        new google.maps.LatLng(47.447028, -122.087202),
        new google.maps.LatLng(47.448392, -122.087116),
        new google.maps.LatLng(47.448392, -122.089112),
        new google.maps.LatLng(47.447637, -122.089734),
        new google.maps.LatLng(47.447536, -122.091730),
        new google.maps.LatLng(47.446302, -122.093275),
        new google.maps.LatLng(47.444924, -122.091300),
        new google.maps.LatLng(47.444866, -122.088897),
        new google.maps.LatLng(47.444735, -122.087824)
    ];

    neighborhoods["shadowridge"] = shadowridge;

    var riverbend = [
        new google.maps.LatLng(47.463205, -122.111900),
        new google.maps.LatLng(47.464772, -122.111707),
        new google.maps.LatLng(47.466063, -122.106986),
        new google.maps.LatLng(47.463786, -122.106557),
        new google.maps.LatLng(47.463205, -122.107716)
    ];

    neighborhoods["riverbend"] = riverbend;

    var meadowsatrockcreek = [
        new google.maps.LatLng(47.358117, -122.040929),     /* bottom left */
        new google.maps.LatLng(47.361387, -122.040907),
        new google.maps.LatLng(47.361591, -122.034298),
        new google.maps.LatLng(47.358175, -122.034127)
    ];

    neighborhoods["meadowsatrockcreek"] = meadowsatrockcreek;

    var wildernessvillageaptmts = [
        new google.maps.LatLng(47.386663, -122.041669),
        new google.maps.LatLng(47.386688, -122.040714),
        new google.maps.LatLng(47.385973, -122.040725),
        new google.maps.LatLng(47.385958, -122.039486),
        new google.maps.LatLng(47.386539, -122.039416),
        new google.maps.LatLng(47.385450, -122.037565),
        new google.maps.LatLng(47.384974, -122.037758),
        new google.maps.LatLng(47.385079, -122.040086),
        new google.maps.LatLng(47.385947, -122.041277)
    ];

    neighborhoods["wildernessvillageaptmts"] = wildernessvillageaptmts;

    var jaquelinemeadows = [
        new google.maps.LatLng(47.389463, -122.053186),
        new google.maps.LatLng(47.389859, -122.052317),
        new google.maps.LatLng(47.390447, -122.050252),
        new google.maps.LatLng(47.390338, -122.048095),
        new google.maps.LatLng(47.389140, -122.048031),
        new google.maps.LatLng(47.388610, -122.048117),
        new google.maps.LatLng(47.386951, -122.050534),
        new google.maps.LatLng(47.386951, -122.052999),
        new google.maps.LatLng(47.389336, -122.052999)
    ];

    neighborhoods["jaquelinemeadows"] = jaquelinemeadows;


    var maplecrossingaptmts = [
        new google.maps.LatLng(47.390171, -122.051877),
        new google.maps.LatLng(47.390720, -122.052451),
        new google.maps.LatLng(47.392692, -122.047977),
        new google.maps.LatLng(47.391195, -122.048450),
        new google.maps.LatLng(47.390905, -122.049190)
    ];

    neighborhoods["maplecrossingaptmts"] = maplecrossingaptmts;

    var valleygreen = [
        new google.maps.LatLng(47.386634, -122.035028),
        new google.maps.LatLng(47.386554, -122.035832),
        new google.maps.LatLng(47.386082, -122.036734),
        new google.maps.LatLng(47.385740, -122.036712),
        new google.maps.LatLng(47.384705, -122.034255),
        new google.maps.LatLng(47.384157, -122.032077),
        new google.maps.LatLng(47.384119, -122.030983),
        new google.maps.LatLng(47.383253, -122.030892),
        new google.maps.LatLng(47.383253, -122.029020),

        new google.maps.LatLng(47.385884, -122.029020),
        new google.maps.LatLng(47.387548, -122.029052),
        new google.maps.LatLng(47.388797, -122.031165),
        new google.maps.LatLng(47.388579, -122.031927),
        new google.maps.LatLng(47.386634, -122.032024)
    ];

    neighborhoods["valleygreen"] = valleygreen;

    var patricksfair = [
        new google.maps.LatLng(47.383241, -122.028843),
        new google.maps.LatLng(47.384767, -122.028843),
        new google.maps.LatLng(47.386634, -122.028891),
        new google.maps.LatLng(47.386663, -122.027174),
        new google.maps.LatLng(47.384338, -122.023934),
        new google.maps.LatLng(47.383750, -122.023838),
        new google.maps.LatLng(47.383278, -122.024374)
    ];

    neighborhoods["patricksfair"] = patricksfair;


    var bellmontwoods = [
        new google.maps.LatLng(47.383107, -122.022806),
        new google.maps.LatLng(47.379762, -122.021858),
        //new google.maps.LatLng(47.379074, -122.021402), /* bottom right */
        //new google.maps.LatLng(47.379074, -122.023481),
        new google.maps.LatLng(47.379730, -122.023918),
        new google.maps.LatLng(47.379704, -122.028065), /* bottom left */
        new google.maps.LatLng(47.382050, -122.029502),
        new google.maps.LatLng(47.383038, -122.029814),
        new google.maps.LatLng(47.383038, -122.029245),
        new google.maps.LatLng(47.383107, -122.025254)
    ];


    neighborhoods["bellmontwoods"] = bellmontwoods;

    var katesridge = [
        new google.maps.LatLng(47.365680, -122.029181),
        new google.maps.LatLng(47.365994, -122.027668),
        new google.maps.LatLng(47.367018, -122.028607),
        new google.maps.LatLng(47.368464, -122.029556),
        new google.maps.LatLng(47.369575, -122.030650),
        new google.maps.LatLng(47.369641, -122.031916),
        new google.maps.LatLng(47.369263, -122.033139),
        new google.maps.LatLng(47.366894, -122.033150),
        new google.maps.LatLng(47.366349, -122.032378),
        new google.maps.LatLng(47.365680, -122.032077)
    ];

    neighborhoods["katesridge"] = katesridge;

    var wildernessgrove = [
        new google.maps.LatLng(47.361910, -122.037925),
        new google.maps.LatLng(47.365646, -122.037646),
        new google.maps.LatLng(47.365646, -122.033730),
        new google.maps.LatLng(47.362579, -122.033730),
        new google.maps.LatLng(47.362579, -122.034084)
    ];

    neighborhoods["wildernessgrove"] = wildernessgrove;

    var highlandscedarriver = [
        new google.maps.LatLng(47.403447, -122.033923),
        new google.maps.LatLng(47.403926, -122.031627),
        new google.maps.LatLng(47.407107, -122.030597),
        new google.maps.LatLng(47.407746, -122.027764),
        new google.maps.LatLng(47.403273, -122.026584),
        new google.maps.LatLng(47.402053, -122.023022),
        new google.maps.LatLng(47.400121, -122.022808),
        new google.maps.LatLng(47.399460, -122.022529),
        new google.maps.LatLng(47.397100, -122.024331),
        new google.maps.LatLng(47.397100, -122.026284),
        new google.maps.LatLng(47.399889, -122.032614),
        new google.maps.LatLng(47.402568, -122.032313),
        new google.maps.LatLng(47.402518, -122.033987)
    ];

    neighborhoods["highlandscedarriver"] = highlandscedarriver;


    var eastwoodforest = [
        new google.maps.LatLng(47.354118, -122.054029),
        new google.maps.LatLng(47.354118, -122.058899),
        new google.maps.LatLng(47.350105, -122.058899),
        new google.maps.LatLng(47.350105, -122.054029)
    ];

    neighborhoods["eastwoodforest"] = eastwoodforest;

    var vinemapleplace1 = [
        new google.maps.LatLng(47.407589, -122.036320),
        new google.maps.LatLng(47.406751, -122.035360),
        new google.maps.LatLng(47.407498, -122.034603),
        new google.maps.LatLng(47.407840, -122.035628)
    ];

    neighborhoods["vinemapleplace1"] = vinemapleplace1;

    var highlandscedardowns = [
        new google.maps.LatLng(47.370179,-122.059119),
        new google.maps.LatLng(47.370499,-122.055772),
        new google.maps.LatLng(47.368435,-122.055600),
        new google.maps.LatLng(47.368435,-122.059119)
    ];

    neighborhoods["highlandscedardowns"] = highlandscedardowns;

    var haleysterrace = [
        new google.maps.LatLng(47.354468, -122.053932),
        new google.maps.LatLng(47.355529, -122.053975),
        new google.maps.LatLng(47.355529, -122.055069),
        new google.maps.LatLng(47.356386, -122.055069),
        new google.maps.LatLng(47.356386, -122.056252),
        new google.maps.LatLng(47.357854, -122.056252),
        new google.maps.LatLng(47.357869, -122.058969),
        new google.maps.LatLng(47.354468, -122.059194)
    ];

    neighborhoods["haleysterrace"] = haleysterrace;


    var mountainview = [
        new google.maps.LatLng(47.358639, -122.043541),
        new google.maps.LatLng(47.358661, -122.044829),
        new google.maps.LatLng(47.361008, -122.044807),
        new google.maps.LatLng(47.361001, -122.043262)
    ];

    neighborhoods["mountainview"] = mountainview;


    var sawyercrest = [
        new google.maps.LatLng(47.343695, -122.021917),
        new google.maps.LatLng(47.343695, -122.024599),
        new google.maps.LatLng(47.347083, -122.024599),
        new google.maps.LatLng(47.347083, -122.021917)
    ];

    neighborhoods["sawyercrest"] = sawyercrest;


    var elkrun2 = [
        new google.maps.LatLng(47.354380, -122.046524),
        new google.maps.LatLng(47.354344, -122.044453),
        new google.maps.LatLng(47.353690, -122.044474),
        new google.maps.LatLng(47.352047, -122.048272),
        new google.maps.LatLng(47.353748, -122.048230)
    ];

    neighborhoods["elkrun2"] = elkrun2;

    var cedardowns = [
        new google.maps.LatLng(47.367460, -122.062354),
        new google.maps.LatLng(47.372576, -122.062354),
        new google.maps.LatLng(47.375685, -122.059650),
        new google.maps.LatLng(47.374349, -122.049694),
        new google.maps.LatLng(47.370483, -122.050724),
        new google.maps.LatLng(47.367751, -122.060894)
    ];

    neighborhoods["cedardowns"] = cedardowns;


    var hamptongrove = [
        new google.maps.LatLng(47.352597, -122.027226), // bottom left
        new google.maps.LatLng(47.356319, -122.027226), // top right
        new google.maps.LatLng(47.356319, -122.025520),
        new google.maps.LatLng(47.354494, -122.025520),
        new google.maps.LatLng(47.354305, -122.025799),
        new google.maps.LatLng(47.352597, -122.025799)  // bottom right
    ];

    neighborhoods["hamptongrove"] = hamptongrove;


    var valleycrest = [
        new google.maps.LatLng(47.354494, -122.025420),
        new google.maps.LatLng(47.356319, -122.025420),
        new google.maps.LatLng(47.356319, -122.023056),
        new google.maps.LatLng(47.354494, -122.023056)
    ];

    neighborhoods["valleycrest"] = valleycrest;


    var barclaywoods = [
        new google.maps.LatLng(47.352597, -122.025699), // bottom left
        new google.maps.LatLng(47.354305, -122.025699),
        new google.maps.LatLng(47.354388, -122.025520),
        new google.maps.LatLng(47.354358, -122.023056),
        new google.maps.LatLng(47.352597, -122.023056)
    ];

    neighborhoods["barclaywoods"] = barclaywoods;


    var glaciercrest = [
        new google.maps.LatLng(47.352597, -122.022956), // bottom left
        new google.maps.LatLng(47.354358, -122.022956),
        new google.maps.LatLng(47.354358, -122.020410),
        new google.maps.LatLng(47.352597, -122.020174)
    ];

    neighborhoods["glaciercrest"] = glaciercrest;



    var lakepark = [
        new google.maps.LatLng(47.383168, -122.036122),
        new google.maps.LatLng(47.383531, -122.036047),
        new google.maps.LatLng(47.383760, -122.035816),
        new google.maps.LatLng(47.384414, -122.035816),
        new google.maps.LatLng(47.384955, -122.036723),
        new google.maps.LatLng(47.384806, -122.037313),
        new google.maps.LatLng(47.383702, -122.037313),
        new google.maps.LatLng(47.383168, -122.037120)
    ];

    neighborhoods["lakepark"] = lakepark;



    var thewoods = [
        new google.maps.LatLng(47.384215, -122.042677),
        new google.maps.LatLng(47.384796, -122.041465),
        new google.maps.LatLng(47.384796, -122.040285),
        new google.maps.LatLng(47.384215, -122.039534),
        new google.maps.LatLng(47.383089, -122.039384),
        new google.maps.LatLng(47.383089, -122.042677)
    ];

    neighborhoods["thewoods"] = thewoods;


    var jordanscrossing = [
        new google.maps.LatLng(47.354494, -122.022989),
        new google.maps.LatLng(47.356319, -122.022989),
        new google.maps.LatLng(47.356319, -122.022243),
        new google.maps.LatLng(47.354494, -122.022243)
    ];

    neighborhoods["jordanscrossing"] = jordanscrossing;


    var rotaryneighborhood1 = [

    ];

    neighborhoods["rotaryneighborhood1"] = rotaryneighborhood1;



    var rockcreekmeadows = [
        new google.maps.LatLng(47.361518, -122.042951), // top left
        new google.maps.LatLng(47.361518, -122.041217), // top right
        new google.maps.LatLng(47.359105, -122.041217),
        new google.maps.LatLng(47.359105, -122.042254),
        new google.maps.LatLng(47.360067, -122.043180)
    ];

    neighborhoods["rockcreekmeadows"] = rockcreekmeadows;



    var thereserve = [
		new google.maps.LatLng(47.354519, -122.063121),
		new google.maps.LatLng(47.356227, -122.063121),
		new google.maps.LatLng(47.356227, -122.060364),
		new google.maps.LatLng(47.354519, -122.060364)
	];

    neighborhoods["thereserve"] = thereserve;


    var terracemaplewoods = [
  		new google.maps.LatLng(47.354570, -122.018908),
  		new google.maps.LatLng(47.355188, -122.018993),
  		new google.maps.LatLng(47.355195, -122.018554),
  		new google.maps.LatLng(47.355757, -122.018531),
  		new google.maps.LatLng(47.355739, -122.016255),
  		new google.maps.LatLng(47.354002, -122.016389),
  		new google.maps.LatLng(47.354151, -122.017414)
   	];

    neighborhoods["terracemaplewoods"] = terracemaplewoods;


    var cherryvale = [
      	  new google.maps.LatLng(47.352051, -122.021609),
          new google.maps.LatLng(47.352051, -122.020112),
          new google.maps.LatLng(47.351164, -122.020112),
          new google.maps.LatLng(47.351164, -122.021609)
       	];

    neighborhoods["cherryvale"] = cherryvale;


    var elkrun4 = [ // SE 277th Pl & 228th Ave SE
     	  new google.maps.LatLng(47.353552, -122.037758),
          new google.maps.LatLng(47.352840, -122.037758),
          new google.maps.LatLng(47.351772, -122.042490),
          new google.maps.LatLng(47.352571, -122.042490)
       	];

    neighborhoods["elkrun4"] = elkrun4;

    var wildernessgrove_north = [
     	  new google.maps.LatLng(47.365050, -122.037490),
          new google.maps.LatLng(47.365108, -122.032115),
          new google.maps.LatLng(47.365936, -122.032115),
          new google.maps.LatLng(47.365769, -122.037490)
       	];

    neighborhoods["wildernessgrove_north"] = wildernessgrove_north;

    var lower_diamondhills = [
        new google.maps.LatLng(47.350570, -122.032408),
        new google.maps.LatLng(47.347733, -122.032527),
        new google.maps.LatLng(47.347726, -122.034440),
        new google.maps.LatLng(47.350570, -122.033836)
        ];

     neighborhoods["lower_diamondhills"] = lower_diamondhills;


    var upper_diamondhills = [
     	  new google.maps.LatLng(47.350550, -122.037619),
          new google.maps.LatLng(47.350550, -122.034057),
          new google.maps.LatLng(47.348450, -122.034475),
          new google.maps.LatLng(47.347163, -122.035634),
          new google.maps.LatLng(47.347199, -122.037619)
       	];

    neighborhoods["upper_diamondhills"] = upper_diamondhills;

    var malloy = [
     	  new google.maps.LatLng(47.377698, -122.024690),
          new google.maps.LatLng(47.379109, -122.026831),
     	  new google.maps.LatLng(47.379925, -122.026868),
          new google.maps.LatLng(47.379934, -122.023827),
     	  new google.maps.LatLng(47.378410, -122.023864)
       	];

    neighborhoods["malloy"] = malloy;

    var forestCreek = [ 
        new google.maps.LatLng(47.368000, -122.069650),
        new google.maps.LatLng(47.368000, -122.067244),
        new google.maps.LatLng(47.367229, -122.067244),
        new google.maps.LatLng(47.367229, -122.069650)
    ];

    neighborhoods["forestCreek"] = forestCreek;


   var mvcc = [ 
        new google.maps.LatLng(47.382170, -122.165043), /* 245th & 132nd Ave */
        new google.maps.LatLng(47.382170, -122.164244), /* east of above pt */
        new google.maps.LatLng(47.383779, -122.164169),
        new google.maps.LatLng(47.385111, -122.164169),
        new google.maps.LatLng(47.385111, -122.161411),
        new google.maps.LatLng(47.386778, -122.161411),
        new google.maps.LatLng(47.386778, -122.156101),
        new google.maps.LatLng(47.385903, -122.156101),
	    new google.maps.LatLng(47.385622, -122.154448),
	    new google.maps.LatLng(47.385622, -122.152142),
	    new google.maps.LatLng(47.383756, -122.152142),
	    new google.maps.LatLng(47.383706, -122.149427),
        new google.maps.LatLng(47.381495, -122.149363),
        new google.maps.LatLng(47.379586, -122.148762),
	    new google.maps.LatLng(47.379552, -122.149331),
	    new google.maps.LatLng(47.372557, -122.149567), /* Far SE Corner */
        new google.maps.LatLng(47.372557, -122.153375),
        new google.maps.LatLng(47.374058, -122.154781),
	    new google.maps.LatLng(47.375971, -122.154802),
	    new google.maps.LatLng(47.376627, -122.156948),
        new google.maps.LatLng(47.376157, -122.157721),
        new google.maps.LatLng(47.376157, -122.162624),
	    new google.maps.LatLng(47.377538, -122.162822),
        new google.maps.LatLng(47.377997, -122.161288),
        new google.maps.LatLng(47.379503, -122.161529),
	    new google.maps.LatLng(47.379548, -122.165279),
        new google.maps.LatLng(47.380900, -122.165279),
        new google.maps.LatLng(47.380963, -122.163504),
        new google.maps.LatLng(47.381560, -122.163750),
        new google.maps.LatLng(47.381568, -122.165043)
    ];

    neighborhoods["mvcc"] = mvcc;

    var avalonCourt = [ 
        new google.maps.LatLng(47.373898, -122.165285),
        new google.maps.LatLng(47.373898, -122.161784),
        new google.maps.LatLng(47.373130, -122.161784),
        new google.maps.LatLng(47.373130, -122.165285)
    ];

    neighborhoods["avalonCourt"] = avalonCourt;


    var lakeWinterwood = [ 
        new google.maps.LatLng(47.347296, -122.101931),
        new google.maps.LatLng(47.353988, -122.101931),
        new google.maps.LatLng(47.355402, -122.092237),
        new google.maps.LatLng(47.354491, -122.092323),
        new google.maps.LatLng(47.353622, -122.093203),
        new google.maps.LatLng(47.351838, -122.097001),
        new google.maps.LatLng(47.350447, -122.098546),
        new google.maps.LatLng(47.349201, -122.100155),
        new google.maps.LatLng(47.347795, -122.099747),
        new google.maps.LatLng(47.347296, -122.099747)
    ];

    neighborhoods["lakeWinterwood"] = lakeWinterwood;

    var cedarCreekParke  = [ 
        new google.maps.LatLng(47.367045, -122.069856),
	    new google.maps.LatLng(47.365288, -122.069856),
	    new google.maps.LatLng(47.365288, -122.070715),
	    new google.maps.LatLng(47.364406, -122.070715),
	    new google.maps.LatLng(47.364406, -122.073622),
        new google.maps.LatLng(47.367045, -122.073622)
    ];

    neighborhoods["cedarCreekParke"] = cedarCreekParke;

    var shireHills  = [ 
        new google.maps.LatLng(47.367204, -122.075215),
        new google.maps.LatLng(47.369081, -122.075704),
        new google.maps.LatLng(47.370151, -122.075709),
        new google.maps.LatLng(47.371425, -122.074684),
        new google.maps.LatLng(47.372771, -122.072898),
        new google.maps.LatLng(47.372771, -122.072131),
        new google.maps.LatLng(47.371649, -122.072131),
        new google.maps.LatLng(47.370459, -122.070200),
        new google.maps.LatLng(47.368930, -122.070200),
        new google.maps.LatLng(47.368930, -122.071133),
        new google.maps.LatLng(47.367204, -122.071133)
    ];

    neighborhoods["shireHills"] = shireHills;


    var mapleHills  = [ 
        new google.maps.LatLng(47.371028, -122.070452),
        new google.maps.LatLng(47.372658, -122.069781),
        new google.maps.LatLng(47.372658, -122.062695),
        new google.maps.LatLng(47.369000, -122.062695),
        new google.maps.LatLng(47.369000, -122.069647),
        new google.maps.LatLng(47.370377, -122.069814)
    ];

    neighborhoods["mapleHills"] = mapleHills;


    var cornerstone = [ 
        new google.maps.LatLng(47.358230, -122.083434),
        new google.maps.LatLng(47.359315, -122.083434),
        new google.maps.LatLng(47.362246, -122.081545),
        new google.maps.LatLng(47.362246, -122.080714),
        new google.maps.LatLng(47.358230, -122.080714)
    ];

    neighborhoods["cornerstone"] = cornerstone;


    var highpointe  = [ 
        new google.maps.LatLng(47.365278, -122.123141),
        new google.maps.LatLng(47.361834, -122.123141),
        new google.maps.LatLng(47.361834, -122.128345),
        new google.maps.LatLng(47.365278, -122.128345)
    ];

    neighborhoods["highpointe"] = highpointe;

    var stonefield  = [ 
        new google.maps.LatLng(47.368892, -122.122841),
        new google.maps.LatLng(47.368892, -122.117922),
        new google.maps.LatLng(47.368184, -122.117922),
        new google.maps.LatLng(47.366088, -122.118758),
        new google.maps.LatLng(47.366088, -122.120405),
        new google.maps.LatLng(47.364992, -122.120405),
        new google.maps.LatLng(47.364992, -122.122841)
    ];

    neighborhoods["stonefield"] = stonefield;

    var cohoCreek  = [ 
        new google.maps.LatLng(47.369927, -122.117616),
        new google.maps.LatLng(47.369927, -122.115438),
        new google.maps.LatLng(47.368540, -122.115438),
        new google.maps.LatLng(47.368540, -122.112498),
        new google.maps.LatLng(47.366136, -122.112498),
        new google.maps.LatLng(47.366136, -122.115824),
        new google.maps.LatLng(47.366856, -122.115824),
        new google.maps.LatLng(47.366856, -122.117691)
    ];

    neighborhoods["cohoCreek"] = cohoCreek;


    var fairfield  = [ 
        new google.maps.LatLng(47.368912, -122.133430),
        new google.maps.LatLng(47.368912, -122.131032),
        new google.maps.LatLng(47.372273, -122.131032),
        new google.maps.LatLng(47.372273, -122.124209),
        new google.maps.LatLng(47.368857, -122.124209),
        new google.maps.LatLng(47.368857, -122.123235),
        new google.maps.LatLng(47.366810, -122.123235),
        new google.maps.LatLng(47.366391, -122.126671),
        new google.maps.LatLng(47.365935, -122.128361),
        new google.maps.LatLng(47.365935, -122.129793),
        new google.maps.LatLng(47.366828, -122.130351),
        new google.maps.LatLng(47.367709, -122.133430)
    ];

    neighborhoods["fairfield"] = fairfield;

    var foxwood = [
		new google.maps.LatLng(47.368952, -122.105833),
        new google.maps.LatLng(47.372513, -122.105833),
		new google.maps.LatLng(47.372513, -122.110902),
		new google.maps.LatLng(47.368952, -122.110902)
	];

    neighborhoods["foxwood"] = foxwood


    var parkMeadowsRainierVista = [ 
        new google.maps.LatLng(47.383672, -122.096360),
        new google.maps.LatLng(47.385965, -122.096295),
        new google.maps.LatLng(47.386483, -122.096043),
        new google.maps.LatLng(47.386884, -122.094842),
        new google.maps.LatLng(47.386884, -122.091703), // Top Right
        new google.maps.LatLng(47.385211, -122.091703),
        new google.maps.LatLng(47.385211, -122.093366),
        new google.maps.LatLng(47.384480, -122.093366),
        new google.maps.LatLng(47.380734, -122.096521),
        new google.maps.LatLng(47.380734, -122.101617),
        new google.maps.LatLng(47.382187, -122.101617),
        new google.maps.LatLng(47.382187, -122.099471),
        new google.maps.LatLng(47.383672, -122.099471)  // Top Left near 281st 
    ];

    neighborhoods["parkMeadowsRainierVista"] = parkMeadowsRainierVista;

    var tamarack = [ 
	    new google.maps.LatLng(47.378692, -122.128199),
	    new google.maps.LatLng(47.378692, -122.123103),
	    new google.maps.LatLng(47.376080, -122.123103),
	    new google.maps.LatLng(47.376080, -122.128199)
	];

    var woodcreek = [
        new google.maps.LatLng(47.372513, -122.101906),
        new google.maps.LatLng(47.368952, -122.101906),
        new google.maps.LatLng(47.368952, -122.105833),
        new google.maps.LatLng(47.372513, -122.105833)
    ];

    neighborhoods["woodcreek"] = woodcreek;
	
	neighborhoods["tamarack"] = tamarack;

    var croftinHeights = [ 
	    new google.maps.LatLng(47.376011, -122.126734),
	    new google.maps.LatLng(47.374638, -122.126734),
	    new google.maps.LatLng(47.374638, -122.126407),
	    new google.maps.LatLng(47.373065, -122.126407),
	    new google.maps.LatLng(47.373065, -122.123103),
	    new google.maps.LatLng(47.376011, -122.123103)
	];
	
	neighborhoods["croftinHeights"] = croftinHeights;
	
    var croftinHills = [ 
	    new google.maps.LatLng(47.372575, -122.126520),
	    new google.maps.LatLng(47.374556, -122.126520),
	    new google.maps.LatLng(47.374556, -122.128297),
	    new google.maps.LatLng(47.376058, -122.128297),
	    new google.maps.LatLng(47.376058, -122.131191),
	    new google.maps.LatLng(47.375147, -122.131191),
	    new google.maps.LatLng(47.375147, -122.131749),
	    new google.maps.LatLng(47.374209, -122.131749),
	    new google.maps.LatLng(47.374209, -122.133557),
	    new google.maps.LatLng(47.372575, -122.133557)
	];
	
	neighborhoods["croftinHills"] = croftinHills;
	
    var countryClubPlace = [ 
	    new google.maps.LatLng(47.375993, -122.154837),
	    new google.maps.LatLng(47.372495, -122.154837),
	    new google.maps.LatLng(47.372495, -122.156629),
	    new google.maps.LatLng(47.374242, -122.156629),
	    new google.maps.LatLng(47.374242, -122.159998),
	    new google.maps.LatLng(47.375993, -122.159998)
	];
	
	neighborhoods["countryClubPlace"] = countryClubPlace;
	
    var madisonView = [ 
	    new google.maps.LatLng(47.372513, -122.156688),
	    new google.maps.LatLng(47.372513, -122.158357),
	    new google.maps.LatLng(47.374224, -122.158357),
	    new google.maps.LatLng(47.374224, -122.156688)
	];
	
	neighborhoods["madisonView"] = madisonView;
	
    var canaryHill = [ 
	    new google.maps.LatLng(47.372520, -122.158464),
	    new google.maps.LatLng(47.372520, -122.159998),
	    new google.maps.LatLng(47.374231, -122.159998),
	    new google.maps.LatLng(47.374231, -122.158464)
	];
	
	neighborhoods["canaryHill"] = canaryHill;	
	
    var tahomaVista = [ 
	    new google.maps.LatLng(47.374307, -122.160148),
	    new google.maps.LatLng(47.374307, -122.161758),
	    new google.maps.LatLng(47.375114, -122.161758),
	    new google.maps.LatLng(47.375088, -122.165336),
	    new google.maps.LatLng(47.375989, -122.165336),
	    new google.maps.LatLng(47.375989, -122.160148)
	];
	
	neighborhoods["tahomaVista"] = tahomaVista;
	
    var heatherGlenn = [ 
	    new google.maps.LatLng(47.373951, -122.161763),
	    new google.maps.LatLng(47.373951, -122.165336),
	    new google.maps.LatLng(47.375067, -122.165336),
	    new google.maps.LatLng(47.375067, -122.161763)
	];
	
	neighborhoods["heatherGlenn"] = heatherGlenn;

    return neighborhoods;

}

var starIcon = { 
    url: './images/star.png',
    //scaledSize: new google.maps.Size(23, 23),
    origin: new google.maps.Point(0, 0),
    anchor: new google.maps.Point(17, 17)
    };
    
neighborhoods = loadNeighborhoods();    // external neighborhoods_2014.js file

function setMarkers(map) {
    console.log("EMPTY FUNCTION INSIDE NEIGHBORHOODS2019_1.JS!");
}

function pageRefresh(time) {
}

    
// Returns the routes array for this engineId on todays date
function retrieveRoutesArray(engineId, day) {
    

    // key for todays date & engineId
    var targetRoute;
    /*
    if ((day == null) || (day == "")) {
        // retreive todays date
        var date = new Date();
        var year = date.getFullYear();
        var month = date.getMonth() + 1;	// zero indexed, add 1
        var day = date.getDate();
        
        targetRoute = year.toString() + month.toString() + day.toString() + "-" + engineId;  
        console.log("Current Date: " + targetRoute);      
    }
    else {*/
        if (engineId == "") {
            targetRoute = day;
        }
        else  {
            targetRoute = day + "-" + engineId;
        }
    //}
    
    // console.log("retrieveRoutesArray()->targetRoute: ", targetRoute);
    
    // find the corresponding key in the routesList array, return subsequent array
    for (i = 0; i < routesList.length; i++) {
        if (targetRoute == routesList[i].route) {
            // We have successfully found the date/engine-route key, return neighborhoods array
            return routesList[i].neighborhoods;
        }
    }
    // console.log("retrieveRoutesArray(): returning empty array");
    return [];
}

// Retrieve the routes array from retrieveRoutesArray, and then
// using that array, build out the data array from this file
// Have to return something like [neighborhoods["pebblecreek"],neighborhoods["shadowfirs"],neighborhoods["sawyercrest"],neighborhoods["greenbrier2"]]
function buildRoutesArray(engineId, day) {
    
    //console.log("buildRoutesArray()->engineId: ", engineId);
    //console.log("buildRoutesArray()->day: ", day);
    
    routeList = retrieveRoutesArray(engineId, day);
    
    // console.log("buildRoutesArray()->routeList: ", routeList);  // Good so far ... 
    
    
    var overLays = new Object();
    var routesArray = [[],[]];      // returning two dimensional array
    
    for (a = 0; a < routeList.length; a++) {
    
      routesArray[a] = [];  // initialize ... 
      
      // neighborhoods declared above ...
      for (i = 0; i < neighborhoods[routeList[a]].length; i++) {
        //console.log("buildRoutesArray()-> ", neighborhoods[routeList[a]][i]);
        routesArray[a][i] = neighborhoods[routeList[a]][i];
      } 
    }

    return routesArray;
}


// Prepare map for this days routes
// For each route/engine, create that routes overlays
// day is datekey, i.e. "2019126"
// engines is array of engine-id's to show, i.e. ["1", "2"]
function prepareMap(map, day, engines) {
    
    // SET SHADED AREAS PER ENGINE
    colors = ["#FF0000", "#FF9A33", "#99CC00", "#CD23E3"];

    for (e = 0; e < engines.length; e++) {
        engine = buildRoutesArray(engines[e], day);
        
        nh = new google.maps.Polygon({
            paths: engine,
            strokeColor: colors[e],
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: colors[e],
            fillOpacity: 0.35
        });
        
        nh.setMap(map);
    }
    
    // Parties are now specified per route instead of per day
    // Cycle through routes, displaying parties as exist
    // SET PARTIES MARKERS WHERE EXIST
    for (e = 0; e < engines.length; e++) {
    
        var routeId;
        routeId = day + "-" + engines[e];
        
        //console.log("routeId: ", routeId);
        
        if (parties[routeId]) {
            for (i = 0; i < parties[routeId].length; i++) { 
                var partyMarker = new google.maps.Marker({
                    position: {lat: parties[routeId][i][0], lng: parties[routeId][i][1]},
                    map: map,
                    icon: starIcon
                    });
            }
        }
    }
}



