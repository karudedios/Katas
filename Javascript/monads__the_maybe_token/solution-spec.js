var module = require('./solution.js')

var Nothing = module.Nothing;
var Maybe = module.Maybe;
var Just = module.Just;

describe("Maybe specs", function () {
	it("should have Just and Nothing", function () {
		expect(new Just(5)).toBeTruthy();
		expect(new Nothing()).toBeTruthy();
	});

	it("should have lift return a Just when function succeeds or Nothing when it fails", function () {
		var f = function (x) { if (x % 2 == 0) { return x + 2; } throw error; };
		var mf = Maybe.lift(f);

		expect(mf(2) + '').toEqual(new Just(4) + '');
		expect(mf(3) + '').toEqual(new Nothing() + '');
	});

	it("should bind to a Just when Maybe object, Nothing when Nothing and an exception when not Maybe", function() {
		var f = function(x) { return x + 2; }
		var mf = Maybe.bind(f);

		expect(function () { mf(2) }).toThrow(new Error());
		expect(mf(new Just(2)) + '').toEqual(new Just(4) + '');
		expect(mf(new Nothing()) + '').toEqual(new Nothing() + '');
	});

	it("should 'do' every specified function as long as value is a Maybe or return when it's a Nothing", function () {
		var maybe_four = new Just(4);
		var plus_two = function (x) { return x + 2 };
		var times_three = function (x) { return x * 3 };

		var result = Maybe.do(maybe_four, plus_two, times_three);
		expect(result + '').toEqual(new Just(18) + '');
	});
});