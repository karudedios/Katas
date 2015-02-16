var ES5_1 = require("../es5_generators_i/solution.js");
var ES5_2 = require("./solution.js");

/* ES5 Generators 1 - Sequencers*/
var generator = ES5_1.generator;
var dummySeq = ES5_1.dummySeq;
var fibonacciSeq = ES5_1.fibonacciSeq;
var factorialSeq = ES5_1.factorialSeq;
var rangeSeq = ES5_1.rangeSeq;
var primeSeq = ES5_1.primeSeq;
var partialSumSeq = ES5_1.partialSumSeq;
/*END*/

/*ES5 Generators 2 - Pipeline Sequencers*/
var pipeSeq = ES5_2.pipeSeq;
var accumulator = ES5_2.accumulator;
var isEven = ES5_2.isEven;
var printEven = ES5_2.printEven;
/*END*/

describe("ES5 Generators Part 2", function () {
	var evaluateAssertion = function() {
		var args = [].slice.call(arguments, 0);

		var sequence = args.shift();
		var expectations = args.pop();
		var pipes = args.pop();
		var params = args;

		var pipeSequence = pipeSeq.call(this, sequence, params);
		pipes.forEach(function (pipeFn) { pipeSequence = pipeSequence.pipeline(pipeFn); });
		var gen = generator(pipeSequence.invoke());
		expectations.forEach(function (expecting) {
			expect(expecting).toEqual(gen.next());
		});
	}
	describe("When pipes are not specified should behave in the same way as it did before", function () {		
		it("should get next step of sequence per call", function () {
			evaluateAssertion(fibonacciSeq, [], [1, 1, 2, 3, 5]);
			evaluateAssertion(factorialSeq, [], [1, 1, 2, 6, 24]);
			evaluateAssertion(rangeSeq, 2, 5, [], [2, 7, 12, 17, 22]);
			evaluateAssertion(primeSeq, [], [2, 3, 5, 7, 11]);
			evaluateAssertion(partialSumSeq, 2, 5, 1, -5, 17, [], [2, 7, 8, 3, 20]);
		});
	});

	describe("When pipes are specified, should apply every pipe to the result of the sequence", function () {
		it("should apply the accumulator to a sequence", function() {
			evaluateAssertion(fibonacciSeq, [accumulator], [1, 2, 4, 7, 12]);
			evaluateAssertion(factorialSeq, [accumulator], [1, 2, 4, 10, 34]);
			evaluateAssertion(rangeSeq, 2, 5, [accumulator], [2, 9, 21, 38, 60]);
			evaluateAssertion(primeSeq, [accumulator], [2, 5, 10, 17, 28]);
			evaluateAssertion(partialSumSeq, 2, 5, 1, -5, 17, [accumulator], [2, 9, 17, 20, 40]);
		});
	});
});