/* Copyright 2016- Paul Brewer Economic & Financial Technology Consulting LLC */
/* tests for cumulative-distribution-function */
/* Open Source License: The MIT Public License */

var assert = require('assert');
var should = require('should');
var cdf = require("../index.js");

describe('tests for handling of invalid data or usage:', function() {
  function expectTypeError(data, x) {
    if (x === undefined) {
      it('cdf(' + JSON.stringify(data) + ') should throw TypeError', function() {
        function bad() {
          var f = cdf(data);
        }
        bad.should.throw(/cdf data must be an array of finite numbers, got:/);
      });
    } else {
      it('f(' + JSON.stringify(x) + ') should throw TypeError', function() {
        var f = cdf(data);

        function bad() {
          var p = f(x);
        }
        bad.should.throw(/cdf function input must be a number, got:/);
      });
    }
  }

  [
    undefined,
    [],
    {},
    null,
    [1, 2, 3, NaN, 4, 5, 6],
    [+Infinity, 3, 4, 5],
    [1, 2, 3, 4, -Infinity, 6],
    [1, "2", 3, "4", 5, 6],
    [1, {}, 3],
    [1, 2, undefined],
    [{
      a: 3
    }, 2, 3],
    [null, 2, 3],
    [1, 2, [3, 4], 5]
  ].forEach((data) => (expectTypeError([data])));

  [
    null,
    {},
    "",
    "2.5",
    [1, 2]
  ].forEach((x) => (expectTypeError([1, 2, 3], x)));
});


describe('f=cdf([13,2,5,3,23,7,11,13,19,23]) ', function() {
  var data = [13, 2, 5, 3, 23, 7, 11, 13, 19, 23];
  var xs = [2, 3, 5, 7, 11, 13, 19, 23];
  var ps = [0.1, 0.2, 0.3, 0.4, 0.5, 0.7, 0.8, 1.0];

  var f = cdf(data);

  it('f(NaN) is NaN', function() {
    assert(Number.isNaN(f(NaN)));
  });

  test_x = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, Infinity, -Infinity];
  test_p = [0, 0.1, 0.2, 0.2, 0.3, 0.3, 0.4, 0.4, 0.4, 0.4, 0.5, 0.5, 0.7, 0.7, 0.7, 0.7, 0.7, 0.7, 0.8, 0.8, 0.8, 0.8, 1.0, 1.0, 1.0, 1.0, 0];

  test_x.forEach(function(x, i) {
    var test_label = 'f(' + x + ') ~ ' + test_p[i];
    it(test_label, function() {
      f(x).should.be.approximately(test_p[i], 1e-6);
    });
  });

  it('f.xs() should equal ' + JSON.stringify(xs), function() {
    f.xs().should.deepEqual(xs);
  });

  it('f.ps() should equal ' + JSON.stringify(ps), function() {
    f.ps().forEach(function(p, i) {
      p.should.be.approximately(ps[i], 1e-6);
    });
  });
});

describe('f=cdf([3]) (data is a single point x=3)', function() {
  var f = cdf([3]);

  var xs = [3];
  var ps = [1];

  var test_x = [2, 2.9, 3, 3.1, -Infinity, +Infinity];
  var test_p = [0, 0, 1, 1, 0, 1];

  test_x.forEach(function(x, i) {
    var test_label = 'f(' + x + ') ~ ' + test_p[i];
    it(test_label, function() {
      f(x).should.be.approximately(test_p[i], 1e-6);
    });
  });

  it('f.xs() should equal ' + JSON.stringify(xs), function() {
    f.xs().should.deepEqual(xs);
  });

  it('f.ps() should equal ' + JSON.stringify(ps), function() {
    f.ps().forEach(function(p, i) {
      p.should.be.approximately(ps[i], 1e-6);
    });
  });
});

describe('a stringification "attack" on f.xs()', function(){
  var data = [1,2,3,4,5,6,7,8,9,10,100,101];
  var f = cdf(data);
  it('calling f(3) after f.xs() is stringified should throw an Error instead of loop infinitely', function(){
    var xs = f.xs();
    for(var i=0,l=xs.length; i<l; ++i){
      xs[i] = String(xs[i]);
    }
    function bad(){
      return f(3);
    }
    bad.should.throw(/iterations/);
  })
});
