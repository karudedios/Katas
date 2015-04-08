/*var pascal = function (depth) {
	var result = [];

	for (var i = 0; i < depth; i++) {
		var arr = [];
		var resultLength = result.length;

		if (resultLength > 0) {
			for (var j = 0; res = result[resultLength - 1], previous = res[j - 1] || 0, current = res[j] || 0, j < res.length; j++) {
				arr.push(current + previous);
			}
		}

		arr.push(1);
		result.push(arr);
	}

	return result;
}*/

var pascal = function(depth) {
	for(var arr = [[1]];arr.length<depth;arr.push((arr[arr.length - 1]).map(function (x, idx, self) { return x + (self[idx - 1] || 0); }).concat(1)));
	return arr;
}

var pascal2 = function (depth) {
	var current = depth == 1 ? [] : pascal2(depth - 1);
	return current.push(Array.apply(null, {length: depth}).map(function (_, idx) {
		return idx == 0 || idx == depth-1 ? 1 : current[depth-2][idx-1] + current[depth-2][idx];
	})), current;
}

module.exports.pascal = pascal2;