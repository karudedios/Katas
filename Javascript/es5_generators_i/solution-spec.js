var module = require('./solution.js')
var generator = module.generator;
var dummySeq = module.dummySeq;
var factorialSeq = module.factorialSeq;
var fibonacciSeq = module.fibonacciSeq;
var rangeSeq = module.rangeSeq;
var primeSeq = module.primeSeq;
var partialSumSeq = module.partialSumSeq;

describe("ES5 Generators Part 1", function (){
	function getCollection(size) {
		return Array.apply(null, {length:size});
	}
	it("should get itself if no sequence found", function () {
		var gen = generator(dummySeq);
		
		for (var i in getCollection(10)) {
			expect('dummy').toEqual(gen.next());
		}
	})
	it("should get next step of sequence per call", function () {

	})
});