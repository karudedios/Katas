var parseMolecule = require("./solution.js").parseMolecule;

describe ("Molecule parser", function () {
	function equalsAtomically(obj1, obj2) {
    if (Object.keys(obj1).length == Object.keys(obj2).length) {
        for (var k in obj1) {
            if (obj1[k] != obj2[k]) {
            	console.log("expected " + k + " to be " + obj2[k] + " not " + obj1[k])
            	return false
            };
        }
        return true;
    }
    return false;
	}

	it("should separate a simple molecule into atoms", function () {
		expect(equalsAtomically(parseMolecule("H2O"), { H:2, O:1 })).toBeTruthy();
	});

	it("should separate a moderate molecule into atoms", function () {
		expect(equalsAtomically(parseMolecule("Mg(OH)2"), { Mg: 1, O:2, H:2})).toBeTruthy();
	});

	it("should separate a complicated molecule into atoms", function () {
		expect(equalsAtomically(parseMolecule("K4[ON(SO3)2]2"), {K: 4, O: 14, N: 2, S: 4})).toBeTruthy();
		expect(equalsAtomically(parseMolecule("As2{Be4C5[BCo3(CO2)3]2}4Cu5"),
			{ As: 2, Be: 16, C: 44, B: 8, Co: 24, O: 48, Cu: 5 })
		).toBeTruthy();
	});
})