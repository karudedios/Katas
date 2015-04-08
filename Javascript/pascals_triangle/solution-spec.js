var pascal = require('./solution.js').pascal;

describe("Pascal's triangle", function () {
	var validateAssertion = function (levels, expected) {
		var result = pascal(levels);
		var strResult = result.toString();
		var strExpected = expected.toString();
		var areEquals = strResult === strExpected;
		expect(areEquals).toBeTruthy(
			result + " is not equals " + expected
		);
	}

	it("should create pascal triangles of n levels", function() {
		var level0 = [];
		var level1 = level0.concat(    [1]   );
		var level2 = level1.concat(   [1,1]   );
		var level3 = level2.concat(  [1,2,1]  );
		var level4 = level3.concat( [1,3,3,1] );
		var level5 = level4.concat([1,4,6,4,1]);

		validateAssertion(1, level1);
		validateAssertion(2, level2);
		validateAssertion(3, level3);
		validateAssertion(4, level4);
		validateAssertion(5, level5);
	});
});