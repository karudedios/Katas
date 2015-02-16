var applySumAndCarry = function (x, y) {
	var sum = []
	var carry = ['']
	for(;a = x.pop(), b = y.pop(), sum.unshift(String(a ^ b)), carry.unshift(String(a & b)), a || b;);
	return [sum, carry];
}

function add (x, y) {
	var n1 = x.toString(2).split('');
	var n2 = y.toString(2).split('');
	for (;r = applySumAndCarry(n1, n2), n1 = r[0], n2 = r[1], n2.some(function (x) { return x == 1; }););
	return (parseInt(n1.join(''), 2));
}

module.exports.add = add;

console.log((1, 1))