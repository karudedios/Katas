'use strict';

var values = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten'];
var functions = [function plus(a, b) { return a + b; }, function minus(a, b) { return a - b; }, function times(a, b) { return a * b; }, function dividedBy(a, b) { return a / b; }];

var getConfig = function(value, get, enumerable, configurable, writable) {
  var ob = { enumerable: !!enumerable, configurable: !!configurable };
  if (value) ob.value = value, ob.writable = !!writable; else ob.get = get;
  return ob;
}

var FluentCalculator = new (
  function F(fn, val) {
    values.forEach(function(value, index) {
      Object.defineProperty(this, value, {
        get: function() { return new (function (v) {
          Object.defineProperty(this, 'valueOf', getConfig(function() { return v; }, null));
          functions.forEach(function(fn) {
            Object.defineProperty(this, fn.name, getConfig(null, function() { return new F(fn, v); }, true))
          }.bind(this));          
        }) (fn((val || 0), index));
      },
      enumerable: true,
      configurable: false
      })
    }.bind(this));
  }
)(function(_, b) { return b; }, 0);

module.exports = FluentCalculator;