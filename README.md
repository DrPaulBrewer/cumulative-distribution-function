cumulative-distribution-function
----------


[![Build Status](https://travis-ci.org/DrPaulBrewer/cumulative-distribution-function.svg?branch=master)](https://travis-ci.org/DrPaulBrewer/cumulative-distribution-function)
[![Coverage Status](https://coveralls.io/repos/github/DrPaulBrewer/cumulative-distribution-function/badge.svg?branch=master)](https://coveralls.io/github/DrPaulBrewer/cumulative-distribution-function?branch=master)

Calculates statistical cumulative distribution function from data array of x values.

## Installation

`npm i cumulative-distribution-function -S`

## Dependencies

None.  Suitable for usage on nodejs or on the browser, via browserify.

## Initialization

`const cdf = require('cumulative-distribution-function');`

## Usage

Pass a numeric data array as input, `cdf(data)` returns a **function**, the [empirical cumulative distribution function](https://en.wikipedia.org/wiki/Empirical_distribution_function),
a step function that counts the proportion of data less than or equal to the input x.

The function returned by cdf(data) takes a number x and returns the proportion of values less than or equal to x.  

## Example

```
var mydata = [13,2,5,3,23,7,11,13,19,23];
var mycdf  = cdf(mydata); // cdf(mydata) returns a **function**, so mycdf is a **function**
mycdf(-5)  // 0.0 because all mydata are greater than -5
mycdf(2)  // 0.1 because 1 of 10 mydata are less than or equal to 2
mycdf(3)  // 0.2 because 2 of 10 mydata are less than or equal to 3
mycdf(13) // 0.7 because 7 of 10 mydata are less than or equal to 13
mycdf(19) // 0.8 because 8 of 10 mydata are less than or equal to 19
mycdf(20) // 0.8 because 8 of 10 mydata are less than or equal to 20
mycdf(25) // 1.0 because all mydata are less than or equal to 25
mycdf.xs() // returns [2,    3,  5,  7, 11, 13, 19, 23] from sorted, unique mydata
mycdf.ps() // returns [0.1,0.2,0.3,0.4,0.5,0.7,0.8,1.0] from corresponding cumulative proportions
```

##Missing or Empty Data

Calling cdf with a missing or empty data array returns a function that returns undefined.

The `.xs()` and `.ps()` auxiliary functions will return empty arrays.  

```
var mycdf = cdf([]); // empty or missing data
mycdf(5) // returns undefined 
mycdf.xs() // returns empty array []
mycdf.ps() // returns empty array []
```

## Tests

Use mocha framework.

### Copyright

Copyright 2016 Paul Brewer, Economic and Financial Technology Consulting LLC

### License

MIT

