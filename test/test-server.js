const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');
const server = require('../server.js');


var should = chai.should();
var app = server.app;
var storage = server.storage;

chai.use(chaiHttp);

describe('root url', function() {
	  it('should make a call to the root url', function(done) {
	  	chai.request(app)
	  		.get('/')
	  		.end(function(err, res) {
	  			res.should.have.status(200);
	  			res.should.be.html;
	  			done();
	  		});
	  });

	});
