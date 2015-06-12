'use strict';

var values = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
var functions = [
    function plus(a, b) { return a + b; }
  , function minus(a, b) { return a - b; }
  , function times(a, b) { return a * b; }
  , function dividedBy(a, b) { return a / b; }
  , function toThePowerOf(a, b) { return Math.pow(a, b); }
];

var FluentCalculator = new (function FluentCalculator() {
  function FluentFunction(n1, n2, fn, cf) {
    values.forEach(function(n, i) {
      Object.defineProperty(this, n, {
        get: function() { return new FluentValue(cf(n1, n2), i, fn); },
        enumerable: true
      });
    }.bind(this));
  }

  function FluentValue(n1, n2, cf) {
    values.forEach(function(n, i) {
      Object.defineProperty(this, n, {
        get: function() { return new FluentValue(n1, +(n2 + '' + i), cf); },
        enumerable: true
      });
    }.bind(this));

    functions.forEach(function(fn) {
      Object.defineProperty(this, fn.name, {
        get: function() { return new FluentFunction(n1, n2, fn, cf); },
        enumerable: true
      });
    }.bind(this));

    Object.defineProperty(this, 'valueOf', {
      value: function(){ return cf(n1, n2); }
    });
  }

  return new FluentValue(0, 0, function(_, x) { return x; })
})();

//console.log((FluentCalculator.one.zero.zero.zero.minus.nine.nine.five.toThePowerOf.four.dividedBy.two.five))

module.exports = FluentCalculator;