var express = require('express');
var router = express.Router();
var https = require('https');
var querystring = require('querystring');

/* GET users listing. */
router.get('/', function(req, res, next) {
   // https://m.chase.com/PSRWeb/location/list.action?lat=40.147864&lng=-82.990959

   var data = querystring.stringify({
    lat: 40.147864,
    lng: -82.990959
  })

   var options = {
    host: 'm.chase.com',
    path: '/PSRWeb/location/list.action?lat=40.147864&lng=-82.990959',
    method: 'GET',
    port: 443,
    headers: {
      'Content-Type': 'application/json'
    }
  };

  callback = function(response) {
    console.log(Object.getOwnPropertyNames(response));
    console.log(response.complete);
    return res.send(response);
  }

  var req = https.request(options, function(data) {
    var output = '';
    console.log(options.host + ':' + data.statusCode);
    data.setEncoding('utf8');

    data.on('data', function (chunk) {
      output += chunk;
    });

    data.on('end', function() {
      var obj = JSON.parse(output);
      res.json(obj);
    });
  });

  req.on('error', function(err) {
      res.send('error: ' + err.message);
    });

  req.end();

});

module.exports = router;
