function initialize(){let e=new URLSearchParams(window.location.search.substring(1)),o=e.get("d"),t=["1","2"];e.has("e")&&(t=e.get("e").split(",")),console.log("Engines: "+t);let n="";e.has("c")&&(n="-"+e.get("c"));let s=14;e.has("z")&&(s=parseInt(e.get("z")));const a=o.substring(0,4);console.log("Year: "+a);const g=o.substring(4,6);console.log("Month: "+g);let l=o.substring(6);console.log("Day: "+l),console.log("Zoom: "+String(s));let c=new Date(a,g-1,l);const i=String(c).substring(0,String(c).indexOf(a)+4);console.log(i),$("#route-date").text("Routes for "+i),console.log("DateKey: "+o),console.log("DateKey + Code: "+o+n);var r={zoom:s,center:new google.maps.LatLng(comboLatList[o+n],comboLonList[o+n]),mapTypeId:google.maps.MapTypeId.ROADMAP},p=new google.maps.Map(document.getElementById("map_canvas"),r);prepareMap(p,o,t)}