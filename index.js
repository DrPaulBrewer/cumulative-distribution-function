/*
 *  Copyright 2016 Paul Brewer, Economic and Financial Technology Consulting LLC <drpaulbrewer@eaftc.com>
 *  This file is open source software.  License: The MIT License
 *
 */

/* jshint node:true,esnext:true,eqeqeq:true,undef:true,lastsemic:true,strict:true */

module.exports = function(data){
    "use strict";
    var f, sorted, xs, ps, i, j, l, xx;
    if (Array.isArray(data) && (data.length>0)){
	sorted = data.slice().sort(function(a,b){ return +a-b; });
	xs = [];
	ps = [];
	j=0;
	l=sorted.length;
	xs[0] = sorted[0];
	ps[0] = 1/l;
	for(i=1;i<l;++i){
	    xx = sorted[i];
	    if (xx===xs[j]){
		ps[j] = (1+i)/l;
	    } else {
		j++;
		xs[j] = xx;
		ps[j] = (1+i)/l;
	    }
	}
	f = function(x){
        if (typeof(x)!=='number')  throw new TypeError('cdf function input must be a number, got:'+typeof(x));
		if (Number.isNaN(x)) return x;
	    var left=0, right=xs.length-1, mid, midval;
	    if (x<xs[0]) return 0;
	    if (x>=xs[xs.length-1]) return 1;
	    while( (right-left)>1 ){
		mid = Math.floor((left+right)/2);
		midval = xs[mid];
		if (x>midval)
		    left = mid;
		else if (x<midval)
		    right = mid;
		else if (x===midval){
		    left = mid;
		    right = mid;
		}
	    }
	    return ps[left];
	};
	f.xs = function(){
	    return xs;
	};
	f.ps = function(){
	    return ps;
	};
    } else {
	// missing or zero length data
	f = function(){};
	f.xs = function(){ return [] };
	f.ps = f.xs;
    }
    return f;
};
