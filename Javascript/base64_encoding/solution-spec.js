require("./solution.js");

describe("Base 64 encoder/decoder", function (){
	it ("should encode to base64", function (){
		expect("pleasure.".toBase64()).toEqual("cGxlYXN1cmUu");
		expect("leasure.".toBase64()).toEqual("bGVhc3VyZS4=");
		expect("easure.".toBase64()).toEqual("ZWFzdXJlLg==");
		expect("asure.".toBase64()).toEqual("YXN1cmUu");
		expect("sure.".toBase64()).toEqual("c3VyZS4=");
	});

	it("should decode from base64", function () {
		expect("cGxlYXN1cmUu".fromBase64()).toEqual("pleasure.");
		expect("bGVhc3VyZS4=".fromBase64()).toEqual("leasure.");
		expect("ZWFzdXJlLg==".fromBase64()).toEqual("easure.");
		expect("YXN1cmUu".fromBase64()).toEqual("asure.");
		expect("c3VyZS4=".fromBase64()).toEqual("sure.");
	});
});