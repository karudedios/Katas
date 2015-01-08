function generator(sequencer) {
	return { next : sequencer.apply(null, [].slice.call(arguments, 1)) }
}

function dummySeq() {
  return function() {
    return "dummy";
  };
}

function factorialSeq() {
	var pos = 0, count = 1;
	return function () {
		if (pos === 0) { ++pos; return count; }
		return pos *= count++;
	}
}

function fibonacciSeq() {
	var previous = 0, current = 1, next = 1;
	return function () {
		previous = current;
		current = next;
		next = (current + previous);
		return previous;
	}
}

function rangeSeq(start, step) {
	var current = 0;
	return function () {
		if (current == 0) { current = start; }
		else { current += step; }
		return current;
	}
}

function is_prime(n) {
	if (n < 2) return false;
	var tn = n > 37 ? Math.ceil(Math.sqrt(n)) : n;
	var _n = 2;
	while (_n < tn) {
		if (tn % _n === 0) return false;
		_n++;
	}
	return true;
}

function primeSeq() {
	var current = 1;
	return function () {
		while(!is_prime(++current));
		return current;
	}
}

function partialSumSeq() {
	var sequence = [].slice.call(arguments, 0);
	var current = 0;
	var index = 0;
	return function () {
		if (!sequence[index]) throw new Error("End of sequence");
		current = current + (sequence[index++]);
		return current;
	}
}

module.exports = {
	generator: generator,
	dummySeq: dummySeq,
	factorialSeq: factorialSeq,
	fibonacciSeq: fibonacciSeq,
	rangeSeq: rangeSeq,
	primeSeq: primeSeq,
	partialSumSeq: partialSumSeq
};