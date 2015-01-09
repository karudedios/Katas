var module = require("./solution.js")
var createOperator = module.createOperator;
var Value = module.Value;

describe("Create operator", function () {	
	var Add = createOperator("+", function(a,b){ return a + b;});
	var Sub = createOperator("-", function(a,b){ return a - b;});
	var Mul = createOperator("*", function(a,b){ return a * b;});
	var Div = createOperator("/", function(a,b){ return a / b;});
	var Exp = createOperator("^", function(a,b){ return Math.pow(a,b);});

	it("should be able to 'create' operator functions", function (){
		expect(new Add(2, 5).eval().valueOf()).toEqual(7);
		expect(new Sub(7, 9).eval().valueOf()).toEqual(-2);
		expect(new Mul(5, 3).eval().valueOf()).toEqual(15);
		expect(new Div(12, 7).eval().valueOf()).toEqual(1.7142857142857142);
		expect(new Exp(2, 16).eval().valueOf()).toEqual(65536);
	});

	it("should be able to nest operator functions", function () {
		var Add_MulMul = new Add(
			new Mul(new Value(3), new Value(5)),
			new Mul(new Value(4), new Value(8))
		);
		var Mul_Add_SubMul_Div_ExpSum =new Mul(
			new Add(
				new Sub(new Value(9), new Value(3)),
				new Mul(new Value(8), new Value(12))
			),
			new Div(
				new Exp(new Value(2), new Value(12)),
				new Add(new Value(12), new Value(15))
			)
		);

		expect(Add_MulMul.eval().valueOf()).toEqual(47);
		expect(Mul_Add_SubMul_Div_ExpSum.eval().valueOf()).toEqual(32789)
	});

	it("should return the operations in a human readable way", function () {
		var Add_5_2 = new Add(5, 2);
		var Sub_7_9 = new Sub(7, 9);
		var Div_12_4 = new Div(12, 4);
		var Mul_5_8 = new Mul(5, 8);
		var Exp_2_17 = new Exp(2, 17);
		var Tantrum = new Add(
			new Add (Add_5_2, Sub_7_9),
			new Mul (Div_12_4,
				new Div(Mul_5_8, Exp_2_17)
			)
		);

		expect(Add_5_2.toString()).toEqual("5 + 2");
		expect(Sub_7_9.toString()).toEqual("7 - 9");
		expect(Div_12_4.toString()).toEqual("12 / 4");
		expect(Mul_5_8.toString()).toEqual("5 * 8");
		expect(Exp_2_17.toString()).toEqual("2 ^ 17");
		expect(Tantrum.toString()).toEqual("5 + 2 + 7 - 9 + 12 / 4 * 5 * 8 / 2 ^ 17");
	});
});