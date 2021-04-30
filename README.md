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

Pass a *number* data array as input.  Do not pass strings that look like numbers.  Invalid data may throw a `TypeError`

`f = cdf(data)` returns a **function** `f`, the [empirical cumulative distribution function](https://en.wikipedia.org/wiki/Empirical_distribution_function),
a step function `f(x)` that counts the proportion of data less than or equal to the number input x.

The function returned by cdf(data) takes a number x and returns the proportion of values less than or equal to x.  

## New for v2.0: Passing string data (e.g.`"42"`) or other invalid, missing or empty data instead of numbers will throw a TypeError.

Pass clean data. Convert and clean up your data with something like:

```
const clean_data = raw_data
                    .map((v)=>(+v))
                    .filter((v)=>(isFinite(v)));
```

where the map function will convert stringified numbers (e.g. '123') to numbers;
and the filter function will remove NaN's, +Infinity, and -Infinity.  

The simple map/filter conversion above won't work for everybody.  
For instance, `+v` converts `''` or `null` to `0` which is kept, and `undefined` to `NaN` which is filtered out.

## New for v2.1: Bisection loop limit

`Error("cdf function exceeded 40 bisection iterations, aborting bisection loop")`

The returned function `f` from `f = cdf(data)` will throw the above error instead of loop endlessly on invalid data. This helps in case an "attacker"
(or simply poor code) changes the `xs` data array accessible at `f.xs()` to be string data or other invalid data.   The limit of 40
bisections implies a data array size limit of roughly 2^40 or 10^12 entries.  This limit is beyond 2021 browser and nodejs capabilities but is short
enough to "fail quickly" in the case of an unusual failure in the bisection exit conditions.  


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

## Missing or Empty Data

Will throw TypeError

## Tests

Use mocha framework.

### Copyright

Copyright 2016- Paul Brewer, Economic and Financial Technology Consulting LLC

### License

MIT
