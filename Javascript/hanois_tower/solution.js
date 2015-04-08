Array.prototype.head = function() {
	return this[0] ||Infinity ;
}

var hanoi = function(towerSize) {
	var defFloor = Array.apply(null, { length:towerSize }).map(function (x, i) { return i + 1; });
	var tower = [defFloor, [], []];

	var moveBetween = function(PointA, pointB) {
		var cA = PointA.slice();
		var cB = pointB.slice();

		if (cA.head() < cB.head())
			cB.unshift(cA.shift());
		else
			cA.unshift(cB.shift());

		return [cA, cB];
	}

	function solve(tower) {
		var attempts = 0;
		var isOdd = (tower[0].length % 2) != 0;
		var cTower = tower.slice();
		var A = cTower[0];
		var B = cTower[1];
		var C = cTower[2];

		return function() {
			if (C + '' === tower[0] + '') {
				throw Error;
			} else {
				attempts = (attempts > 2 ? 0 : attempts) + 1;

				var runAB = (attempts == 1 && !isOdd) || (attempts == 2 && isOdd)
				var runAC = (attempts == 1 && isOdd) || (attempts == 2 && !isOdd)

				if (runAB) {
					var AB = moveBetween(A, B);
					A = AB[0];
					B = AB[1];
				}
				else if (runAC) {
					var AC = moveBetween(A, C);
					A = AC[0];
					C = AC[1];
				}
				else {
					var BC = moveBetween(B, C);
					B = BC[0];
					C = BC[1];
				}

				return [A, B, C];				
			}
		}
	}

	return { nextStep: solve(tower), currentStep: function() { return tower; }};
}

var depth = 6;
var Tower = new hanoi(depth);

for (var i = 0; i < Math.pow(2, depth) - 1; i++) {
	console.log(Tower.nextStep());
}

module.exports.hanoi = hanoi;