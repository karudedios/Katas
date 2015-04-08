function pipeSeq(sequencer) {
  var seq = generator.apply(null, [sequencer].concat([].slice.call(arguments, 1)));
  var pipes = [];
  var limits = []
  return {
    addLimit: function(limiter) {
      return limits.push(limiter.apply(null, [].slice.call(arguments, 1))), this;
    },
    pipeline: function(pipe) {
      return pipes.push(pipe.apply(null, [].slice.call(arguments, 1))), this;
    },
    invoke: function() {
      return function() {
        return function() {
          return pipes.reduce(function(value, pipe) {
            return limits.reduce(function (val, limit) {
              return limit(val);
            }, pipe(value));            
          }, seq.next());
        };
      };
    }
  };
}

function stepLimiter(maxSteps) {
  var step = 1;
  return function (val) {
    if (step > maxSteps)
      throw "End of sequence";

    step++;
    return val;
  }
}

function resultLimiter(maxResult) {
  return function (val) {
    if (val > maxResult)
      throw "End of sequence";

    return val;
  }
}

module.exports = {
  pipeSeq: pipeSeq,
  stepLimiter: stepLimiter,
  resultLimiter: resultLimiter
}