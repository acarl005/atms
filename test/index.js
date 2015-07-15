var request = require('supertest');
var express = require('express');
var app = express();
var atms = require('../routes/atms');
var bodyParser = require('body-parser');
var expect = require('chai').expect;
app.use('/atms', atms);
app.use(bodyParser.json());


describe('GET /atms', function(){
  it('respond with json ATMs in ohio', function(done){
    request(app)
    .get('/atms?lat=40.147864&lng=-82.990959')
    .expect('Content-Type', /json/)
    .expect(200)
    .end(function(err, res){
      if (err) throw err;
      expect(res.body.locations).to.be.an('array');
      expect(res.body.locations.length).to.equal(15);
      expect(res.body.locations[0].state).to.equal('OH');
      done();
    });
  })
})