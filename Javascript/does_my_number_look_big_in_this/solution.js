function narcissistic(value) {
	if (isNaN(value)) return;
	var n = (value + '').split('');
	var solution = 0;
	var i = 1;

	if (value < 10 || value > 11) {
		while (solution < value) {
			solution = n.reduce(function (prev, curr) {
				return +prev + Math.pow(+curr, i);
			}, 0);

			if (solution == value) 
				return true;
			i++;
		}
	}
	return false;
}