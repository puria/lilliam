
var google;

function init() {
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 13,
        center: {lat: 40.851753, lng:17.3837113},
        scrollwheel: false,
    });

	var places = ['ChIJD_ohRXRMRhMRyJH1hdKQMtc', 'ChIJvSD4__-vRxMRXKV0D0xMQYM']
    var infowindow = new google.maps.InfoWindow();
    var service = new google.maps.places.PlacesService(map);

    for (var i=0; i < places.length; i++) {

        var request = {
            location: map.getCenter(),
            placeId: places[i],
            fields: ['name', 'formatted_address', 'place_id', 'geometry', 'url']
        };

        service.getDetails(request, function(place, status) {
            if (status === google.maps.places.PlacesServiceStatus.OK) {
              var marker = new google.maps.Marker({
                map: map,
                position: place.geometry.location
              });

              google.maps.event.addListener(marker, 'click', (function() {
                  return function() {
                    infowindow.setContent('<div><strong>'+ place.name +'</strong><br>' + place.formatted_address +
                    '<br><br><strong><a href="'+place.url+'">Indicazioni stradali</a></strong></div>');
                    infowindow.open(map, this);
                  }
              })());
            }
        });
    }
}
    
    

google.maps.event.addDomListener(window, 'load', init);
