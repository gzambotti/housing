var map,searchWidgetNav,searchWidgetPanel,activeView,tbHighCity,tbMidCity,tbLowCity,tbHighZip,tbMidZip,tbLowZip,sessionCity={},sessionZip={};Date.prototype.IsoNum=function(e){var t=6e4*this.getTimezoneOffset(),i=new Date(this-t).toISOString().slice(0,-1);return i.replace(/[-T:\.Z]/g,"").substring(0,e||20)};var timeX=new Date,time=timeX.IsoNum(14),hash=function(e){return"number"==typeof e&&e===parseInt(e,10)&&(e=Array(e+1).join("x")),e.replace(/x/g,function(){var e=Math.round(61*Math.random())+48;return e=e>57?e+7>90?e+13:e+7:e,String.fromCharCode(e)})},require,userhash=hash(10);require(["esri/map","esri/toolbars/draw","esri/dijit/Search","esri/geometry/webMercatorUtils","esri/geometry/Polygon","esri/geometry/Point","esri/geometry/Extent","esri/geometry/geometryEngine","esri/SpatialReference","esri/geometry/Circle","esri/graphic","esri/layers/GraphicsLayer","esri/symbols/SimpleMarkerSymbol","esri/symbols/SimpleLineSymbol","esri/symbols/SimpleFillSymbol","esri/renderers/SimpleRenderer","esri/Color","dojo/on","bootstrap/Collapse","bootstrap/Dropdown","bootstrap/Tab","bootstrap/Alert","calcite-maps/calcitemaps","dojo/domReady!"],function(e,t,i,n,a,o,r,s,c,l,u,d,m,p,g,y,h,v){function b(e){var t=new i({map:map,enableHighlight:!1},e);return t.startup(),t}function f(){tbHighCity=new t(map),tbHighCity.setMarkerSymbol(K),tbHighCity.on("draw-complete",M),tbMidCity=new t(map),tbMidCity.setMarkerSymbol(Q),tbMidCity.on("draw-complete",z),tbLowCity=new t(map),tbLowCity.setMarkerSymbol(ee),tbLowCity.on("draw-complete",S),$("#infoCity").on("click",function(e){"info"!==e.target.id&&("househigh"===e.target.value?(map.disableMapNavigation(),tbHighCity.activate("point"),tbMidCity.deactivate(),tbLowCity.deactivate()):"housemid"===e.target.value?(map.disableMapNavigation(),tbMidCity.activate("point"),tbHighCity.deactivate(),tbLowCity.deactivate()):"houselow"===e.target.value?(map.disableMapNavigation(),tbLowCity.activate("point"),tbMidCity.deactivate(),tbHighCity.deactivate()):console.log(e.target.value))}),map.graphics.on("click",function(e){B();var t=e.graphic;e.graphic.getDojoShape().getNode();map.graphics.remove(t);var i=Number(document.getElementById("countunit").innerText);i>0&&i<800&&(document.getElementById("countunit").innerText=Number(document.getElementById("countunit").innerText)-200)})}function w(e){if($(".alert").length>0)for(var t=$(".alert").length-1;t>=0;t--)$(".alert")[t].remove();var i=function(){};return i.info=function(e){$("#alert_placeholder").append('<div class="alert alert-info alert-dismissable"><span class="loc">'+e+"</span></div>"),$(".alert-dismissable").fadeTo(1500,500).slideUp(500,function(){console.log("")})},i.info(e)}function M(e){tbHighCity.deactivate(),map.enableMapNavigation();var t=n.xyToLngLat(e.geometry.x,e.geometry.y),i=new o(t[0],t[1],{spatialReference:{wkid:4326}});D.contains(i),0==D.contains(i)?w("Wrong location! Place your unit within the Boston city boundary."):(map.graphics.add(new u(e.geometry,K)),L(t[0],t[1],"high"),V(),x())}function z(e){tbMidCity.deactivate(),map.enableMapNavigation();var t=n.xyToLngLat(e.geometry.x,e.geometry.y),i=new o(t[0],t[1],{spatialReference:{wkid:4326}});D.contains(i),0==D.contains(i)?w("Wrong location! Place your unit within the Boston city boundary."):(map.graphics.add(new u(e.geometry,Q)),L(t[0],t[1],"mid"),V(),x())}function S(e){tbLowCity.deactivate(),map.enableMapNavigation();var t=n.xyToLngLat(e.geometry.x,e.geometry.y),i=new o(t[0],t[1],{spatialReference:{wkid:4326}});D.contains(i),0==D.contains(i)?w("Wrong location! Place your unit within the Boston city boundary."):(map.graphics.add(new u(e.geometry,ee)),L(t[0],t[1],"low"),V(),x())}function C(e,t){Object.keys(t).forEach(function(i){e.setAttribute(i,t[i])})}function L(e,t,i){var n=document.getElementById("mapViewDiv_graphics_layer"),a=n.getElementsByTagName("path");C(a[a.length-1],{x:t.toString(),y:e.toString(),type:i})}function V(){document.getElementById("countunit").innerText=Number(document.getElementById("countunit").innerText)+200,document.getElementById("countunitzip").innerText=Number(document.getElementById("countunitzip").innerText)+200}function E(){for(var e=document.getElementsByClassName("round-button-circle"),t=0;t<e.length;t++)e[t].disabled=!0;document.getElementById("unitsubmit").disabled=!1,document.getElementById("zipunitsubmit").disabled=!1}function B(){for(var e=document.getElementsByClassName("round-button-circle"),t=0;t<e.length;t++)e[t].disabled=!1;document.getElementById("unitsubmit").disabled=!0,document.getElementById("zipunitsubmit").disabled=!0}function x(){var e=Number(document.getElementById("countunit").innerText);console.log(e),e>=600?E():B()}function Z(){var e=Number(document.getElementById("countunitzip").innerText);console.log(e),e>=600?E():B()}function T(){map.removeLayer(rPolygonZip);for(var e=[],t=document.getElementById("mapViewDiv_graphics_layer"),i=t.getElementsByTagName("path"),n=0;n<i.length;n++)e.push({x:i[n].getAttribute("x"),y:i[n].getAttribute("y"),type:i[n].getAttribute("type")});sessionCity.timestamp=time,sessionCity.sessionid=time+"_"+userhash,sessionCity.zip=String(document.getElementById("zipcodetext").value),sessionCity.geo=e;var a=JSON.stringify(sessionCity);console.log(a),$.post("js/submit.php",{cityJsonString:a},function(e){console.log("data city submitted correctly")}).fail(function(){console.log("Posting failed.")}),document.getElementById("countunitzip").innerText=0,I(sessionCity.zip),N(),E(),document.getElementById("zipunitsubmit").disabled=!0}function I(e,t){var i="http://services1.arcgis.com/qN3V93cYGMKQCOxL/arcgis/rest/services/bostonzipcode1/FeatureServer/0/query?where=ZIP_CODE+%3D+%27"+e+"%27&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&resultType=none&distance=&units=esriSRUnit_Meter&outFields=ZIP_CODE&returnGeometry=true&returnCentroid=true&multipatchOption=&maxAllowableOffset=&geometryPrecision=&outSR=&returnIdsOnly=false&returnCountOnly=false&returnExtentOnly=false&returnDistinctValues=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&resultOffset=&resultRecordCount=&returnZ=false&returnM=false&quantizationParameters=&sqlFormat=none&f=pjson";$.ajax({type:"GET",dataType:"json",url:i,success:function(e){F=new a(new esri.SpatialReference({wkid:4326})),$.each(e.features[0].geometry.rings,function(e,t){F.addRing(t)}),W=new d({id:"zipcodePoly"}),W.add(new u(F,te)),map.addLayer(W),map.centerAndZoom([e.features[0].centroid.x,e.features[0].centroid.y],14),j=e.features[0].centroid.x,A=e.features[0].centroid.y,map.disableDoubleClickZoom()}})}function N(){map.graphics.clear();var e=new g(g.STYLE_SOLID,new p(p.STYLE_SHORTDASHDOTDOT,new h([5,5,5]),3),new h([20,20,20,.1]));map.on("click",function(t){if(null==_){var i=n.xyToLngLat(t.mapPoint.x,t.mapPoint.y),r=new o(i[0],i[1],{spatialReference:{wkid:4326}});if(0==F.contains(r))w("Wrong location! Place your location within the Zipcode boundary");else{_=new l({center:i,geodesic:!0,radius:1,radiusUnit:"esriMiles"});var c=new d({id:"gBuffer"});c.add(new u(_,e));var m=s.intersect(W.graphics[0].geometry,c.graphics[0].geometry);q=new d({id:"gBufferCut"}),q.add(new u(m,e)),map.addLayer(q),gPolygonBuffer=new a(new esri.SpatialReference({wkid:4326})),$.each(q.graphics[0].geometry.rings,function(e,t){gPolygonBuffer.addRing(t)}),P(),B()}}else console.log(_)})}function P(){tbHighZip=new t(map),tbHighZip.setMarkerSymbol(K),tbHighZip.on("draw-complete",H),tbMidZip=new t(map),tbMidZip.setMarkerSymbol(Q),tbMidZip.on("draw-complete",R),tbLowZip=new t(map),tbLowZip.setMarkerSymbol(ee),tbLowZip.on("draw-complete",k),$("#infoZip").on("click",function(e){"info"!==e.target.id&&("househigh"===e.target.value?(map.disableMapNavigation(),tbHighZip.activate("point"),tbMidZip.deactivate(),tbLowZip.deactivate()):"housemid"===e.target.value?(map.disableMapNavigation(),tbMidZip.activate("point"),tbHighZip.deactivate(),tbLowZip.deactivate()):"houselow"===e.target.value?(map.disableMapNavigation(),tbLowZip.activate("point"),tbMidZip.deactivate(),tbHighZip.deactivate()):console.log(e.target))}),map.graphics.on("click",function(e){console.log(e.graphic),B();var t=e.graphic;map.graphics.remove(t);var i=Number(document.getElementById("countunitzip").innerText);console.log(i),i>0&&i<800&&(document.getElementById("countunitzip").innerText=Number(document.getElementById("countunitzip").innerText)-200)})}function H(e){tbHighZip.deactivate(),map.enableMapNavigation();var t=n.xyToLngLat(e.geometry.x,e.geometry.y),i=new o(t[0],t[1],{spatialReference:{wkid:4326}});0==gPolygonBuffer.contains(i)?w("Wrong location! Place your unit within the Buffer zone!"):(map.graphics.add(new u(e.geometry,K)),L(t[0],t[1],"high"),V(),Z())}function R(e){tbMidZip.deactivate(),map.enableMapNavigation();var t=n.xyToLngLat(e.geometry.x,e.geometry.y),i=new o(t[0],t[1],{spatialReference:{wkid:4326}});0==gPolygonBuffer.contains(i)?w("Wrong location! Place your unit within the Buffer zone!"):(map.graphics.add(new u(e.geometry,Q)),L(t[0],t[1],"mid"),V(),Z())}function k(e){tbLowZip.deactivate(),map.enableMapNavigation();var t=n.xyToLngLat(e.geometry.x,e.geometry.y),i=new o(t[0],t[1],{spatialReference:{wkid:4326}});0==gPolygonBuffer.contains(i)?w("Wrong location! Place your unit within the Buffer zone!"):(map.graphics.add(new u(e.geometry,ee)),L(t[0],t[1],"low"),V(),Z())}function O(){for(var e=[],t=document.getElementById("mapViewDiv_graphics_layer"),i=t.getElementsByTagName("path"),n=0;n<i.length;n++)e.push({x:i[n].getAttribute("x"),y:i[n].getAttribute("y"),type:i[n].getAttribute("type")});sessionZip.timestamp=time,sessionZip.sessionid=time+"_"+userhash,sessionZip.zip=String(document.getElementById("zipcodetext").value),sessionZip.homeX=j,sessionZip.homeY=A,sessionZip.geo=e;var a=JSON.stringify(sessionZip);console.log(a),$.post("js/submit_2.php",{zipJsonString:a},function(e){console.log("data city submitted correctly")}).fail(function(){alert("Posting failed.")})}var D,_,j,A,F,W,q;map=new e("mapViewDiv",{basemap:"gray",center:[-71.05,42.32],zoom:12});var G=new g(g.STYLE_NULL,new p(p.STYLE_SOLID,new h([5,5,5]),2)),Y="http://140.247.114.222/arcgis/rest/services/housing/housing/MapServer/1/query?where=1+%3D1&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&resultType=none&distance=&units=esriSRUnit_Meter&outFields=&returnGeometry=true&returnCentroid=false&multipatchOption=&maxAllowableOffset=&geometryPrecision=&outSR=&returnIdsOnly=false&returnCountOnly=false&returnExtentOnly=false&returnDistinctValues=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&resultOffset=&resultRecordCount=&returnZ=false&returnM=false&quantizationParameters=&sqlFormat=none&f=pjson";$.ajax({type:"GET",dataType:"json",url:Y,success:function(e){D=new a(new esri.SpatialReference({wkid:4326})),$.each(e.features[0].geometry.rings,function(e,t){D.addRing(t)}),rPolygonZip=new d({id:"zipcodePoly"}),rPolygonZip.add(new u(D,G)),map.addLayer(rPolygonZip)}}),searchDivNav=b("searchNavDiv"),searchWidgetPanel=b("searchPanelDiv"),map.on("load",f),document.getElementById("unitsubmit").addEventListener("click",T),document.getElementById("zipunitsubmit").addEventListener("click",O);var U="M0,1108h256V0H0V1108z  M160,64h64v64h-64V64z M160,192h64v64h-64V192z M160,320h64v64h-64V320z M160,448h64v64h-64V448z M160,576h64v64h-64V576z M160,704h64v64h-64V704z M160,832h64v64h-64V832z M160,960h64v64h-64V960z M32,64h64v64H32V64z M32,192 h64v64H32V192z M32,320h64v64H32V320z M32,448h64v64h-64V448z M32,576h64v64h-64V576z M32,704h64v64h-64V704z M32,832h64v64h-64V832z M32,960h64v64h-64V960z",J="M0,262h160V0H0V262z M108,44h32v32h-32V64z M108,114h32v32h-32V64z M108,184h32v32h-32V64z M60,44h32v32h-32V64z M60,114h32v32h-32V64z M60,184h32v32h-32V64z  M12,44h32v32H12V44z M12,114h32v32H12V44z M12,184h32v32H12V44z",X="M0,276h630V0H0V256z M30,34h64v64H32V64z M30,172h64v64H32V192z M130,34h64v64h-64V34z M130,172h64v64h-64V192z M230,34h64v64h-64V34z M230,172h64v64h-64V192z M330,34h64v64h-64V34z M330,172h64v64h-64V192z M430,34h64v64h-64V34z M430,172h64v64h-64V192z M530,34h64v64h-64V34z M530,172h64v64h-64V192z",K=new m;K.setPath(U),K.setSize("54"),K.setColor(new h("000"));var Q=new m;Q.setPath(J),Q.setSize("28"),Q.setColor(new h("#000"));var ee=new m;ee.setPath(X),ee.setSize("34"),ee.setColor(new h("#000"));var te=new g(g.STYLE_NULL,new p(p.STYLE_SOLID,new h([255,0,0]),3))});