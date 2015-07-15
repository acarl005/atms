var app = require('../app.js');
var request = require('supertest');

var expect = require('chai').expect;


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

describe('GET /', function(){
  it('respond with appropriate view', function(done){
    request(app)
    .get('/')
    .expect('Content-Type', /html/)
    .expect(200)
    .end(function(err, res){
      if (err) throw err;
      expect(res.text).to.match(/JPM/);
      done();
    });
  })
})