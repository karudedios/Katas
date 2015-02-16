function pipeSeq(sequencer) {
  var pipe = [];
  var args = [].concat.apply([], [].slice.call(arguments, 1))

  return {
    pipeline: function (fn) { pipe.push(fn.apply(null, [].slice.call(arguments, 1))); return this; },
    invoke: function () { 
      return function () {
        var n = sequencer.apply(null, args);
        return function () {
          return pipe.reduce(function (val, fn) { return fn.call(null, val); }, n.call());
        };
      }
    }
  }
}

function accumulator() {
  var sum = 0;
  return function(value) {
    return sum += value;
  };
}

function isEven() {
  return function (n) {
    return { status: n%2 == 0, number: +n };
  }
}

function printEven(prefix) {
  return function(data) {
    if (data.status) {
      return prefix + ' ' + data.number + ' is even.';
    } else {
      return prefix + ' ' + data.number + ' is not even.';
    }
  };
}

module.exports = { 
  pipeSeq: pipeSeq,
  accumulator: accumulator,
  isEven: isEven,
  printEven: printEven
};