var lat,
    lng;

var call = getLocation();

function getLocation() {
  return new Promise(function(resolve, reject) {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(pos) {
        resolve(pos);
      });
    } else {
      reject();
    }
  });
}

call.then(function(pos) {
  lat = pos.coords.latitude;
  lng = pos.coords.longitude;
  getAtms(lat, lng);
}, function() {
  alert("Geolocation is not supported by this browser.");
})

function getAtms(lat, lng) {
  var url = '/atms?'
  url += 'lat=' + lat + '&';
  url += 'lng=' + lng;
  $.get(url).then(function(res) {
    console.log(res);
  })
}