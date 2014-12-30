function resolve(x) {
	if (x.match(/-*[0-9\.]+/g).length == 1) { return +x.match(/-*[0-9\.]+/); }
	var copy = x.slice();
	var numbers = [];
	var action = "";
	var result = 0;
	var match;

	while (match = copy.match(/-*[0-9\.]+/)) {
		var value = match[0];
		numbers.push(+value);
		copy = copy.replace(value, "");
	}

	copy = copy.replace(/[\( \)]/g, '');
	action = copy.length == 1 ? copy.match(/[-+*\/]/g)[0] : undefined;

	switch(action) {
		case "-": result = numbers[0] - numbers[1]; break;
		case "/": if (numbers[1] == 0) throw new Error("Cannot divide by zero."); result = numbers[0] / numbers[1]; break;
		case "*": result = numbers[0] * numbers[1]; break;
		default : result = numbers[0] + numbers[1]; break;
	}

	return result;
}

var calc = function (str) {
	if (str.match(/[\(\)]/g) && str.match(/[\(\)]/g).length % 2 != 0) { throw new Error("Unmatched parentheses."); }
	if (str.match(/[^ \-+*\/0-9\(\).]/g)) { throw new Error("You don't have enough numbers to be here."); }

	var copy = str.slice()
	var patterns = [
		{ pattern: /\(-*[0-9\.]+\)/, count: 0 },
		{ pattern: /\({2}-*[0-9\.]+[\s]*[-+*\/]+[\s]*-*[0-9\.]+\){2}/, count: 0 },
		{ pattern: /\(-*[0-9\.]+[\s]*[-+*\/]+[\s]*-*[0-9\.]+\)/, count: 0 },
		{ pattern: /-*[0-9\.]+[\s]*[*\/]+[\s]*-*[0-9\.]+/, count: 0 },
		{ pattern: /-*[0-9\.]+[\s]*[-+]+[\s]*-*[0-9\.]+/ , count: 0 }
	];
	var match;
	var pattern;
	var index = -1;

	while (true) {
		index++;
		if (index == patterns.length || !isNaN(+copy)) break;

		var element = patterns[index];
		while (match = copy.match(element.pattern)) {
			copy = copy.replace(match[0], resolve(match[0])).replace("--", "");
			element.count++;
		}

		if (element.count > 0) {
			patterns.forEach(function (x) { x.count = 0; })
			index = -1;
		}
	}
	return +copy;
}