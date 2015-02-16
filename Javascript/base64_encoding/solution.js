var values = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

String.prototype.toBase64 = function () {
	var bytes = this
	.split("")
	.map(function (x) {
		var binary = (+x.charCodeAt(0)).toString(2);
		while (binary.length < 8) { binary = "0" + binary; }
		return binary;
	}).join("");

	while (bytes.length % 24 != 0) { bytes += "0" }
	return bytes.match(/[01]{6}/g)
		.map(function (x) { return values.charAt(binaryToDec(x)); })
		.join("");
}

String.prototype.fromBase64 = function () {
	return this.replace(/=/g, "")
	.split('')
	.map(function (v) {
		var x = values.indexOf(v);
		var binary = (x).toString(2);
		while (binary.length < 6) { binary = "0" + binary; }
		return binary;
	}).join('')
	.match(/[01]{8}/g)
	.map(binaryToDec)
	.map(function (x) { return String.fromCharCode(x); })
	.join('');
}

var binaryToDec = function(str) {
	if (str == "000000") return 64;
	return parseInt(str, 2);
}