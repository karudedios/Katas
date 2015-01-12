/*var parseMolecule = function (molecule) {
  var atoms = "Mg H O K S N B".split(" ");
	var match;
	while (match = molecule.match(/[\(\\[\{]([^(\{\[)]+)[\}\]\)]([0-9]*)/)) {
		molecule = molecule.replace(match[0], simpleHandler(match[1], match[2]));
	}

	var singleAtoms = atoms.filter(function (x) {
		return (molecule.indexOf(x) > -1);
	}).reduce(function (o, v) {
		o[v] = 0;
		return o;
	}, {});

	for (var name in singleAtoms) {
		var initPos = molecule.indexOf(name) + name.length;
		var c = '';
		var n = 0;
		while (n = molecule[initPos]) {
			initPos++;
			if (!isNaN(n)) { c += n }
			else { break }
		}
		singleAtoms[name] += +c || 1; 
	}
	return singleAtoms;
}

var simpleHandler = function (molecule, quantity) {
  var atoms = "Mg H O K S N B".split(" ");
	var toReturn = "";
	var splitPattern = new RegExp(
		atoms.filter(function(x) {
			return molecule.indexOf(x) > -1
		}).map(function (x) {
			return "(?=" + x + ")"
		}).join("|"), "g"
	);

	var ob = {};
	var singleAtoms = molecule.split(splitPattern);
	for (var i in singleAtoms) {
		var atom = singleAtoms[i].replace(/[0-9]/g, '');
		ob[atom] = ob[atom] || 0;
		ob[atom] += (+singleAtoms[i].replace(/[a-z]/gi, '') || 1) * quantity;;
	}

	for (var name in ob) {
		toReturn += name + ob[name];
	}

	return toReturn;
}*/


var parseMolecule = function (molecule) {
	var match;
  var lookPattern = /(?=As|Be|Cu|Co|Mg|Mo|Fe|Pd|B|H|O|K|N|S|C|P)/;
  var inclusionPattern = /[\(\\[\{]([^(\{\[)\}\)\]]+)[\}\]\)]([0-9]*)/;
	
	while (match = molecule.match(inclusionPattern)) {
		var str = match[1].split(lookPattern).map(function (x) {
			var atom = x.replace(/[0-9]/g, '');
			var quantity = x.replace(/[^0-9]/g, '') || 1;
			return atom + (quantity * (match[2] || 1));
		}).join("");
		molecule = molecule.replace(match[0], str);
	}

	return molecule.split(lookPattern).reduce(function (x, v) {
		var atom = v.replace(/[0-9]/g, '');
		var quantity = v.replace(/[^0-9]/g, '') || 1;
		x[atom] = x[atom] || 0;
		x[atom] += (+quantity);
		return x;
	}, {});
}

module.exports.parseMolecule = parseMolecule;