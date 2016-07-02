/* Copyright 2016 Paul Brewer Economic & Financial Technology Consulting LLC */
/* tests for PartialIndex */
/* Open Source License: The MIT Public License */

var assert = require('assert');
var should = require('should');
var cdf = require("../index.js");

describe('f=cdf([13,2,5,3,23,7,11,13,19,23]) ', function(){
    var data =  [13,2,5,3,23,7,11,13,19,23];
    var xs = [2,    3,  5,  7, 11, 13, 19, 23];
    var ps = [0.1,0.2,0.3,0.4,0.5,0.7,0.8,1.0];

    var f = cdf(data);

    test_x = [1,  2,  3,  4,  5,  6,  7,  8,  9,  10,  11,  12,  13,  14,  15,  16,  17,  18,  19,  20,  21,  22,  23,  24,  25];
    test_p = [0,0.1,0.2,0.2,0.3,0.3,0.4,0.4,0.4, 0.4, 0.5, 0.5, 0.7, 0.7, 0.7, 0.7, 0.7, 0.7, 0.8, 0.8, 0.8, 0.8, 1.0, 1.0, 1.0];

    test_x.forEach(function(x,i){
	var test_label = 'f('+x+') ~ '+test_p[i];
	it(test_label, function(){
	    f(x).should.be.approximately(test_p[i],1e-6);
	});
    });

    it('f.xs() should equal '+JSON.stringify(xs), function(){
	f.xs().should.deepEqual(xs);
    });

    it('f.ps() should equal '+JSON.stringify(ps), function(){
	f.ps().forEach(function(p,i){
	    p.should.be.approximately(ps[i],1e-6);
	});
    });

});

describe('f=cdf([3]) (data is a single point x=3)', function(){
    var f = cdf([3]);

    var xs = [3];
    var ps = [1];

    var test_x = [2,2.9,3,3.1];
    var test_p = [0,0,1,1];
    
    test_x.forEach(function(x,i){
	var test_label = 'f('+x+') ~ '+test_p[i];
	it(test_label, function(){
	    f(x).should.be.approximately(test_p[i],1e-6);
	});
    });

    it('f.xs() should equal '+JSON.stringify(xs), function(){
	f.xs().should.deepEqual(xs);
    });

    it('f.ps() should equal '+JSON.stringify(ps), function(){
	f.ps().forEach(function(p,i){
	    p.should.be.approximately(ps[i],1e-6);
	});
    });
});

describe('f=cdf() (missing data)', function(){
    var f = cdf();
    
    it('f(7) returns undefined', function(){
	assert.ok(typeof(f(7))==='undefined');
    });

    it('f.xs() should return []', function(){
	f.xs().should.deepEqual([]);
    });
    
    it('f.ps() should return []', function(){
	f.ps().should.deepEqual([]);
    });
});

describe('f=cdf([]) (empty data)', function(){
    var f = cdf();
    
    it('f(7) returns undefined', function(){
	assert.ok(typeof(f(7))==='undefined');
    });

    it('f.xs() should return []', function(){
	f.xs().should.deepEqual([]);
    });
    
    it('f.ps() should return []', function(){
	f.ps().should.deepEqual([]);
    });
});


    
