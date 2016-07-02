module.exports = function(data){
    if (!(data.length)){
	return function(x){};
    }
    var sorted = data.slice().sort(function(a,b){ return +a-b; });
    var xs = [], ps = [];
    var i,j=0,l=sorted.length,x;
    xs[0] = sorted[0];
    ps[0] = 1/l;
    for(i=1;i<l;++i){
	x = sorted[i];
	if (x===xs[j]){
	    ps[j] = (1+i)/l;
	} else {
	    j++;
	    xs[j] = x;
	    ps[j] = (1+i)/l;
	}
    }
    var f = function(x){
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
    return f;
};
