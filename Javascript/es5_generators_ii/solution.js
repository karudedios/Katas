function pipeSeq(sequencer) {
  var _pipe = [];
  var _params = [];
  var args = [].slice.call(arguments, 1);
  return {
    pipeline : function (fn) { _pipe.push(fn); _params.push([].slice.call(arguments, 1)); return this; },
    invoke : function () {
      var c;
      var value;
      for (var i in _pipe) {
        value = sequencer.apply(null, args).call(this, value);
        c = _pipe[i].call(this, value);
        if (c) value = c;
      }

      return value;
    }
  }
}


function accumulator() {
  var sum = 1;
  return function(value) {
    sum += (value || 0);
    return sum;
  };
}

function isEven() {
  var n = arguments[0];
  return +n % 2 === 0 ? +n : false;
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

var seq = pipeSeq(accumulator)
  .pipeline(isEven);

for (i in [0,0,0,0,0]) (seq.invoke())