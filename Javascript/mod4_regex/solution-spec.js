fs = require ('fs');
eval (fs.readFileSync('solution.js') + '');

describe("Mod4 Regex", function() {
	var validCase = "[+16] [10]";
	var invalidCase = "[-13] [7]";
	var longValidCase = "[+04] days ago I saw something unbelievable! There were [7] cats there, bro. [7]";
	var longInvalidCase = "This [2014] was incredible!";
	var decimalCase = "[4.48]";

	it("should be instance of RegExp", function () {
		expect((Mod4) instanceof (RegExp)).toBeTruthy();
	});

	it("should match inside first brakets", function () {
		expect(Mod4.test(validCase)).toBeTruthy();
		expect(Mod4.test(invalidCase)).toBeFalsy();
	});

	it("should match even if there is more text or more brackets", function () {
		expect(Mod4.test(longValidCase)).toBeTruthy();
		expect(Mod4.test(longInvalidCase)).toBeFalsy();
	});

	it("should ignore decimals", function () {
		expect(Mod4.test(decimalCase)).toBeFalsy();
	});

	it("should only match numbers divisible by 4", function () {
		for (var number = 0; number < 100; number++) {
			expect(Mod4.test("[" + number + "]")).toEqual(number % 4 == 0);
		}
	});
});