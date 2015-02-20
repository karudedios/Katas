function pipeSeq(sequencer) {
  var seq = generator.apply(null, [sequencer].concat(Array.prototype.slice.call(arguments, 1)));
  var pipes = [];
  return {
    addLimit: function(limiter) {
    },
    pipeline: function(pipe) {
      pipes.push(pipe.apply(null, Array.prototype.slice.call(arguments, 1)));
      return this;
    },
    invoke: function() {
      return function() {
        return function() {
          
          return pipes.reduce(function(value, pipe) {
            return pipe(value);
          }, seq.next());
          
        };
      };
    }
  };
}

function stepLimiter(maxSteps) {
}

function resultLimiter(maxResult) {
}

module.exports = {
  pipeSeq: pipeSeq,
  stepLimiter: stepLimiter,
  resultLimiter: resultLimiter
}