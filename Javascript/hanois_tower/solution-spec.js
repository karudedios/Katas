var hanoi = require('./solution.js').hanoi

describe("Hanoi tower solution", function () {
	var evaluateAssertion = function(expected, got) {
		expect(expected + '').toEqual(got + '');
	}

	it("should solve an odd tower, step by step", function () {
		var generator = hanoi(3);

		evaluateAssertion([[1, 2, 3], [], []], generator.currentStep());

		evaluateAssertion([[2, 3], [], [1]], generator.nextStep());
		evaluateAssertion([[3], [2], [1]], generator.nextStep());
		evaluateAssertion([[3], [1, 2], []], generator.nextStep());

		evaluateAssertion([[], [1, 2], [3]], generator.nextStep());
		evaluateAssertion([[1], [2], [3]], generator.nextStep());
		evaluateAssertion([[1], [], [2, 3]], generator.nextStep());

		evaluateAssertion([[], [], [1, 2, 3]], generator.nextStep());
		
		expect(generator.nextStep).toThrow(Error)
	});

	it("should solve an even tower, step by step", function () {
		var generator = hanoi(4);

		evaluateAssertion([[1, 2, 3, 4], [], []], generator.currentStep());

		evaluateAssertion([[2, 3, 4], [1], []], generator.nextStep());
		evaluateAssertion([[3, 4], [1], [2]], generator.nextStep());
		evaluateAssertion([[3, 4], [], [1, 2]], generator.nextStep());

		evaluateAssertion([[4], [3], [1, 2]], generator.nextStep());
		evaluateAssertion([[1, 4], [3], [2]], generator.nextStep());
		evaluateAssertion([[1, 4], [2, 3], []], generator.nextStep());

		evaluateAssertion([[4], [1, 2, 3], []], generator.nextStep());
		evaluateAssertion([[], [1, 2, 3], [4]], generator.nextStep());
		evaluateAssertion([[], [2, 3], [1, 4]], generator.nextStep());

		evaluateAssertion([[2], [3], [1, 4]], generator.nextStep());
		evaluateAssertion([[1, 2], [3], [4]], generator.nextStep());
		evaluateAssertion([[1, 2], [], [3, 4]], generator.nextStep());

		evaluateAssertion([[2], [1], [3, 4]], generator.nextStep());
		evaluateAssertion([[], [1], [2, 3, 4]], generator.nextStep());
		evaluateAssertion([[], [], [1, 2, 3, 4]], generator.nextStep());

		expect(generator.nextStep).toThrow(Error)
	});
});