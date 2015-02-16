var add = require('./solution.js').add

describe("Additionless addition", function () {
	var result, expectedResult;	
	function validateEquals(toSum, expected) {
		while(values = toSum.pop(), expectation = expected.pop()) {
			var result = add.apply(null, values);
			expect(result).toEqual(expectation);
		}
	}

	describe("for possitive numbers", function () {
		it("should add zero to zero and still be zero", function () {
			result = [[0, 0]];
			expectedResult = [0]
			validateEquals(result, expectedResult);
		});

		it("should add small numbers", function () {
			result = [[0, 3], [5, 6], [9, 11]];
			expectedResult = [3, 11, 20];
			validateEquals(result, expectedResult);
		});

		it("should add not so small numbers", function () {
			result = [[12, 88], [25, 98], [30, 150]];
			expectedResult = [100, 123, 180];
			validateEquals(result, expectedResult);
		});

		it("should add bigger numbers", function () {
			result = [[120, 808], [450, 700], [950, 1500]];
			expectedResult = [928, 1150, 2450];
			validateEquals(result, expectedResult);
		});
	});

	describe("for negative numbers", function() {
		it("should treat them as possitive numbers", function () {			
			result = [[-120, 808], [450, -700], [-950, -1500]];
			expectedResult = [928, 1150, 2450];
			validateEquals(result, expectedResult);
		})
	});
});