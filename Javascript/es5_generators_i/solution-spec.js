var module = require('./solution.js')
var generator = module.generator;
var dummySeq = module.dummySeq;
var fibonacciSeq = module.fibonacciSeq;
var factorialSeq = module.factorialSeq;
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

	it("should get next step of sequence per call - Fibonacci", function () {
		var gen = generator(fibonacciSeq);
		expect(1).toEqual(gen.next());
		expect(1).toEqual(gen.next());
		expect(2).toEqual(gen.next());
		expect(3).toEqual(gen.next());
		expect(5).toEqual(gen.next());
	});

	it("should get next step of sequence per call - Factorial", function (){
		var gen = generator(factorialSeq);
		expect(1).toEqual(gen.next());
		expect(1).toEqual(gen.next());
		expect(2).toEqual(gen.next());
		expect(6).toEqual(gen.next());
		expect(24).toEqual(gen.next());
	});

	it("should get next step of sequence per call - Range Call", function (){
		var gen = generator(rangeSeq, 2, 5);
		expect(2).toEqual(gen.next());
		expect(7).toEqual(gen.next());
		expect(12).toEqual(gen.next());
		expect(17).toEqual(gen.next());
		expect(22).toEqual(gen.next());
	});

	it("should get next step of sequence per call - Prime", function (){
		var gen = generator(primeSeq);
		expect(2).toEqual(gen.next());
		expect(3).toEqual(gen.next());
		expect(5).toEqual(gen.next());
		expect(7).toEqual(gen.next());
		expect(11).toEqual(gen.next());
	});

	it("should get next step of sequence per call - Partial Sum", function (){
		var gen = generator(partialSumSeq, 2, 5, 1, -5, 17);
		expect(2).toEqual(gen.next());
		expect(7).toEqual(gen.next());
		expect(8).toEqual(gen.next());
		expect(3).toEqual(gen.next());
		expect(20).toEqual(gen.next());
	});
});