var map;
var service;

function initMap(lat, lng) {
    var myCoords = new google.maps.LatLng(lat, lng);
    var mapOptions = {
    center: myCoords,
    zoom: 14
    };
    map = new google.maps.Map(document.getElementById('map'), mapOptions);
    service = new google.maps.places.PlacesService(map);

    let options = sessionStorage.getItem("interests").split(/[,]+/);

    for (let i=0; i<options.length;i++)
    {
        var request = {
            location: myCoords,
            radius: '5000',
            query: options[i]
        };
    
        service.textSearch(request, callback);
    }
    marker.setMap(map);
}

function callback(results, status) {
        // Swap # to results.length for more options
    if (status == google.maps.places.PlacesServiceStatus.OK) {
      for (var i = 0; i < 5; i++) {
        createMarker(results[i]);
      }
    }
  }

function createMarker(establishment) {
    var marker = new google.maps.Marker({
        map: map,
        title: establishment.name,
        position: establishment.geometry.location
    });
    marker.setMap(map);
}

function filterList(input)
{
    return input.split(/[ ,]+/);
}
