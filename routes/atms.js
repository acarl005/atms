var express = require('express');
var router = express.Router();
var https = require('https');
var querystring = require('querystring');
var url = require('url');

router.get('/', function(req, res, next) {

  var queryData = url.parse(req.url, true).search;

  var options = {
    host: 'm.chase.com',
    path: '/PSRWeb/location/list.action' + queryData,
    method: 'GET',
    port: 443,
    headers: {
      'Content-Type': 'application/json'
    }
  };

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
