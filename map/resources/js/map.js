var map;
// hides all points of intetrest
var styles = {
 hide: [
   {
     featureType: 'poi',
     stylers: [{visibility: 'off'}]
   }
 ]
};
// Initialize and add the map
function initMap() {
// setting the coordinates for the map and markers
  var skagen = {lat: 57.722894, lng: 10.588234};
  var drachmannshus = {lat: 57.7188865, lng: 10.5778183};
  var anchershus = {lat: 57.726152, lng: 10.5968967};
  var skagensmuseum = {lat: 57.7247637, lng: 10.5970668};

// creating the map with markers
var map = new google.maps.Map(
    document.getElementById('map'),{zoom: 14, center: skagen});
var SMmarker = new google.maps.Marker({position: skagensmuseum, map: map,
    type: 'museum', icon:{url:"resources/svg/skagen.png", anchor: new google.maps.Point(25,45), origin: new google.maps.Point(0, 0)}});
var AHmarker = new google.maps.Marker({position: anchershus, map: map,
   type: 'museum', icon:{url:"resources/svg/anchor.png", anchor: new google.maps.Point(25,45), origin: new google.maps.Point(0, 0)}});
var DHmarker = new google.maps.Marker({position: drachmannshus, map: map,
  type: 'museum', icon:{url:"resources/svg/drachmann.png", anchor: new google.maps.Point(25,50), origin: new google.maps.Point(0, 0)}});
map.setOptions({styles: styles['hide']
, mapTypeControl:false
});
// scaling the museum icons so it's readable
   AHmarker.icon.scaledSize = new google.maps.Size(198.5, 50);
   SMmarker.icon.scaledSize = new google.maps.Size(263, 50);
   DHmarker.icon.scaledSize = new google.maps.Size(258, 50);


 let buttonhtml = "";
 fetch("/resources/jsons/map.json").then(response =>{
 return response.json();
 }).then(data =>{
 for (let key of data){
   for (let item of key.content){
 buttonhtml += "<button type='button' data-title='"+ key.title +"'>"+item.name+"</button><hr class='map_hr'/>";
   }
  }
  document.getElementById('buttonholder').innerHTML = buttonhtml;
}).then(() =>{
  // remove the last hr element which gets made at the end
  document.getElementById('buttonholder').lastElementChild.remove();
// let the margin of <hr> elements be the same as the margin for <button> elements
  let buttonstyle = window.getComputedStyle(document.getElementById('buttonholder').firstElementChild);
  let hrgroup = Array.from(document.getElementsByClassName('map_hr'));
  for (var i = 0; i < hrgroup.length; i++) {
    hrgroup[i].style.margin=buttonstyle.margin
  }

  // make sure the margin is dynamic when the window is resized
  window.onresize = ()=>{
    for (var i = 0; i < hrgroup.length; i++) {
      hrgroup[i].style.margin=buttonstyle.margin
    }
  }
  let buttons = Array.from(document.getElementById('buttonholder').children);
  for (let click of buttons){
    fetch("/resources/jsons/map.json").then(response =>{
    return response.json();
  }).then(data =>{
    for (let key of data){
      if (click.dataset.title===key.title) {
        // let the height of the buttons be what's left of the window height after the map and menu at bottom is filled out
        let mapheight = window.getComputedStyle(document.getElementById('map'));

        let mapheightnum = parseInt(mapheight.height);

          click.style.height=(window.outerHeight - mapheightnum - 48)/3 + "px";

        for (let content of key.content){
          // center the map on museum on click of button
          click.onclick=()=>{
            map.setCenter(
              new google.maps.LatLng(content.lat, content.lng)
            );
          }
        }
      }
    }
  });
}
});


// text for the info box
 var SMcontentString = '<article id="content">'+
       '<h1 id="firstHeading" class="firstHeading"><a href="https://skagenskunstmuseer.dk/museer/skagens-museum/">'+
       'Skagens museum</a></h1>'+
       '<p>Brøndumsvej 4</p>'+
       '</article>';

 var DHcontentString = '<article id="content">'+
      '<h1 id="firstHeading" class="firstHeading"><a href="https://skagenskunstmuseer.dk/museer/drachmanns-hus/">'+
      'Drachmanns Hus</a></h1>'+
      '<p>Hans Baghs Vej 21</p>'+
      '</article>';

  var AHcontentString = '<article id="content">'+
      '<h1 id="firstHeading" class="firstHeading"><a href="https://skagenskunstmuseer.dk/museer/anchers-hus/">'+
      'Anchers Hus</a> </h1>'+
      '<p>Markvej 2-4</p>'+
      '</article>';
// making the info box and making sure it is above the museums
   var SMinfowindow = new google.maps.InfoWindow({
     content: SMcontentString,
     pixelOffset: new google.maps.Size(-112,0)
   });
   var DHinfowindow = new google.maps.InfoWindow({
     content: DHcontentString,
     pixelOffset: new google.maps.Size(-108,0)
   });
   var AHinfowindow = new google.maps.InfoWindow({
      content: AHcontentString,
      pixelOffset: new google.maps.Size(-78,0)
    });
    // making sure the info box opens and closes on click of marker
   SMmarker.addListener('click', function() {
     DHinfowindow.close();
     AHinfowindow.close();
     SMinfowindow.open(map, SMmarker);
   });
  DHmarker.addListener('click', function() {
    SMinfowindow.close();
    AHinfowindow.close();
    DHinfowindow.open(map, DHmarker);
  });
  AHmarker.addListener('click', function() {
    DHinfowindow.close();
    SMinfowindow.close();
    AHinfowindow.open(map, AHmarker);
  });
}
