var parseMolecule = function (molecule) {
	var match;
  var lookPattern = /(?=[A-Z][a-z]*)/;
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