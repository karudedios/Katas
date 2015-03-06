var ES5_1 = require('../es5_generators_i/solution.js');
var ES5_2 = require('../es5_generators_ii/solution.js');
var ES5_3 = require('../es5_generators_iii/solution.js');

generator = ES5_1.generator;

describe("ES5 Generators - Part 3", function () {
	var evaluateAssertion = function() {
		var args = [].slice.call(arguments, 0);

		var expectations = args.pop();
		var failFrom = args.pop();
		var limiterValues = args.pop();
		var limiters = args.pop();
		var pipes = args.pop();

		var sequence = args.shift();
		var params = args;

		var sequence = ES5_3.pipeSeq(sequence);

		pipes.forEach(function (pipe) {
			sequence = sequence.pipeline(pipe);
		});
		limiters.forEach(function (limiter) {
			sequence = sequence.addLimit(limiter, limiterValues.shift());
		});

		var gen = ES5_1.generator(sequence.invoke(), params);

		expectations.forEach(function(expectation, idx) {
			if (idx >= failFrom) {
				expect(gen.next).toThrow("End of sequence")
			} else {
				expect(gen.next()).toEqual(expectation);
			}
		});
	}

	it("should limit by steps", function () {
		evaluateAssertion(
			ES5_1.fibonacciSeq, // sequence
			[ES5_2.accumulator], // pipelines
			[ES5_3.stepLimiter], // limiters
			[4], // limiter params
			4, // last non failing index
			[1, 2, 4, 7, Error] // expectations
		);
	});

	it("should limit by result", function () {
		evaluateAssertion(
			ES5_1.fibonacciSeq,
			[ES5_2.accumulator],
			[ES5_3.resultLimiter],
			[21],
			6,
			[1, 2, 4, 7, 12, 20, Error]
		);
	});
});