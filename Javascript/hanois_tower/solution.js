var hanoi = function(towerSize) {
	var tower = [Array.from({ length: towerSize }, (_, i) => i + 1), [], []];

	var moveBetween = ([x, ...xs], [y, ...ys]) =>
		((x || Infinity) < (y || Infinity))
			? [xs, [x, ...(y ? [y] : []), ...ys]]
			: [[y, ...(x ? [x] : []), ...xs], ys];

	function solve(tower) {
		var attempts = 0;
		var [A, B, C] = tower.slice();
		var isOdd = (tower[0].length % 2) != 0;

		return function(att = (++attempts % 3)) {
			if (C + '' === tower[0] + '')
				return undefined;

			if ((att == 2 && isOdd) || (att == 1 && !isOdd))
				[A, B] = moveBetween(A, B);
			else if ((att == 1 && isOdd) || (att == 2 && !isOdd))
				[A, C] = moveBetween(A, C);
			else
				[B, C] = moveBetween(B, C);

			return [A, B, C];
		}
	}

	return { nextStep: solve(tower), currentStep: function() { return tower; }};
}

var depth = 3;
var Tower = new hanoi(depth);

for (var i = 0; i < Math.pow(2, depth) - 1; i++)
	console.log(Tower.nextStep());

module.exports.hanoi = hanoi;