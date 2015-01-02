fs = require ('fs');
eval (fs.readFileSync('solution.js') + '');

describe("narcissistic numbers", function () {
	var narcissisticCollection = [153, 371, 1, 2, 3, 4, 5, 6, 7, 8, 9];
	var nonNarcissisticCollection = [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];

	it("should return true for narcissistic numbers", function() {
		narcissisticCollection.forEach(function (number) {
			expect(narcissistic(number)).toBeTruthy();
		})
	});

	it("should return false for non-narcissistic numbers", function() {
		nonNarcissisticCollection.forEach(function (number) {
			expect(narcissistic(number)).toBeFalsy();
		})
	});

	it("should only work with numbers", function() {
		expect(narcissistic("I swear am a number.")).toBeFalsy();
	});
});