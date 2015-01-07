var module = require("./solution.js");
var add = module.add;

describe("Add big numbers", function() {
	it("should add small numbers", function () {
		expect(add("2", "3")).toEqual("5");
		expect(add("70", "130")).toEqual("200");
	});

	it("should add regular numbers", function () {
		expect(add("2457", "3")).toEqual("2460");
		expect(add("4506", "204")).toEqual("4710");
	});

	it("should add big numbers", function () {
		expect(add(
			"456654456654456654456",
			"4566544564564566547896541236547896654123654789654123")
		).toEqual(
			"4566544564564566547896541236548353308580309246308579"
		);

		expect(add(
		  "4566544564564566547896541236548353308580309246308579",
		  "4566544564564566547896541236548353308580309246308579")
		).toEqual(
		  "9133089129129133095793082473096706617160618492617158"
  	);
	});
});