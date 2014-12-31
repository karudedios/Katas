fs = require ('fs');
eval (fs.readFileSync('solution.js') + '');

describe("math_solver_regular_cases", function (){
	it("should add" , function () {
		expect(calc("1 + 1")).toEqual(2);
		expect(calc("15 + 21")).toEqual(36);
		expect(calc("787 + 454")).toEqual(1241);
		expect(calc("8231 + 4652")).toEqual(12883);
	});

	it("should substract" , function () {
		expect(calc("1 - 1")).toEqual(0);
		expect(calc("0 - 10")).toEqual(-10);
		expect(calc("138 - 10")).toEqual(128);
		expect(calc("78 - 456")).toEqual(-378);
	});

	it("should multiply" , function () {
		expect(calc("1 * 1")).toEqual(1);
		expect(calc("9 * 6")).toEqual(54);
		expect(calc("12 * 8")).toEqual(96);
		expect(calc("7 * 45")).toEqual(315);
	});

	it("should divide" , function () {
		expect(calc("1 / 1")).toEqual(1);
		expect(calc("2 / 4")).toEqual(.5);
		expect(calc("24 / 124")).toEqual(0.1935483870967742);
		expect(calc("-1 / 12")).toEqual(-0.08333333333333333);
	});

	it("should respect the order of operations" , function () {
		expect(calc("4 + 2 * 2")).toEqual(8);
		expect(calc("4 * 2 + 2")).toEqual(10);
		expect(calc("10 - 5 / 5")).toEqual(9);
		expect(calc("10 / 5 - 3")).toEqual(-1);
	});

	it("should solve parentheses first" , function () {
		expect(calc("(4 + 2) * 2")).toEqual(12);
		expect(calc("4 * (2 + 2)")).toEqual(16);
		expect(calc("(10 - 5) / 5")).toEqual(1);
		expect(calc("10 / (5 - 3)")).toEqual(5);
	});

	it("should handle negative numbers", function () {
		expect(calc("5 + -5")).toEqual(0);
		expect(calc("-22 - -5")).toEqual(-17);
		expect(calc("-10 * -1")).toEqual(10);
		expect(calc("-7 / 3.5")).toEqual(-2);
	});

	it("should solve any kind of mixing", function () {
		expect(!isNaN(calc("1+1-1+1-1+1-1+1-1+1-1+1-1+1-1+1-1+1-1+1-1+1-1+1-1+1-1+1-1+1"))).toBeTruthy();
		expect(!isNaN(calc("1*1/1*1/1*1/1*1/1*1/1*1/1*1/1*1/1*1/1*1/1*1/1*1/1*1/1*1/1*1/1"))).toBeTruthy();
		expect(!isNaN(calc("1 * (1 + (1 - (1 + (1 - (1 + (2 / 2) - 1) + 1) - 1) + 1) - 1) / 1"))).toBeTruthy();
		expect(!isNaN(calc("1+1-1*1/1*1-1+1-1*1/1*1-1+1-1*1/1*1-1+1-1*1/1*1-1+1-1*1/1*1-1+1-1*1/1*1-1+1-1"))).toBeTruthy();
	});
});

describe("math_solver_exception_cases",function () {
	it("cannot divide by zero" , function () {
		var error = new Error("Cannot divide by zero.");
		expect(function () { calc("7 - 1 / 0") }).toThrow(error);
		expect(function () { calc("(4 + 7) / 0") }).toThrow(error);
		expect(function () { calc("12 / (12 + 12 - 12 - 12)") }).toThrow(error);
		expect(function () { calc("(12 / (12 / (12 / (12 / (2 - 2)))))") }).toThrow(error);
	});

	it("cannot have unmatched parentheses", function() {
		var error = new Error("Unmatched parentheses.");

		expect(function () { calc("(2 + 4") }).toThrow(error);
		expect(function () { calc("(2 + 4))") }).toThrow(error);
		expect(function () { calc("(2 + (4 - (7))") }).toThrow(error);
		expect(function () { calc("(2 + (4 - (7 + (12)))") }).toThrow(error);
	});

	it("cannot have letters", function () {
		var error = new Error("You don't have enough numbers to be here.");
		expect(function () { calc("A + b") }).toThrow(error);
		expect(function () { calc("a - B") }).toThrow(error);
		expect(function () { calc("A * b") }).toThrow(error);
		expect(function () { calc("a / B") }).toThrow(error);
	});
})