/////////////////////////////////////////////////////////////////
function Maybe () {
  Object.freeze(this);
};

/////////////////////////////////////////////////////////////////
function Just (x) {
  this.toString = function () { return "Just " + x.toString(); };
  this.just = x;
  Object.freeze(this);
};
Just.prototype = new Maybe();
Just.prototype.constructor = Just;

/////////////////////////////////////////////////////////////////
function Nothing () {
  this.toString = function () { return "Nothing"; };
  Object.freeze(this);
};
Nothing.prototype = new Maybe();
Nothing.prototype.constructor = Nothing;

/////////////////////////////////////////////////////////////////
Maybe.unit = function (x) {
  // return a Maybe that holds x
  return new Just(x);
};

Maybe.bind = function (f) {
  // given a function from a value to a Maybe return a function from a Maybe to a Maybe
  return function (maybe) {
    if (!(maybe instanceof Maybe)) throw new Error("");
    if (maybe instanceof Nothing) return new Nothing();
    if (maybe instanceof Just) return new Just(f.call(this, maybe.just));
  }
};

Maybe.lift = function (f) {
  // given a function from value to value, return a function from value to Maybe
  // if f throws an exception, (lift f) should return a Nothing
  return function () {
    try {
      return new Just(f.apply(this, [].slice.call(arguments)));
    }
    catch(ex) {
      return new Nothing();
    }
  }
};

Maybe.do = function(m) {
  if (!m.just) { return new Nothing(); }
  Array.prototype.slice.call(arguments, 1).map(Maybe.bind).forEach(function (fn) { m = fn.call(this, m); });
  return m;
};

module.exports.Nothing = Nothing;
module.exports.Maybe = Maybe;
module.exports.Just = Just;