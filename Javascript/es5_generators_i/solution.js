function generator(sequencer) {
	var $this = this;
	$this.current = 0;
	$this.previous = 0;
	var args = [];

	for (var i in arguments) {
		if (+i > 0)
			args.push(arguments[i]);
	}

	return {
		next : function Next () {
			var response = sequencer.apply(null, args).call(null, $this.current, $this.previous);

			if (response.length && typeof(response) != 'string') {
				$this.previous = response[0];
				$this.current = response[1];
				return response[2] || response[1];
			}
			else {
				$this.current = response;
				return response;
			}
		}
	}
}

function dummySeq() {
  return function() {
    return "dummy";
  };
}

function factorialSeq() {
	return function x (current, acc) {
		acc = (acc * current) || 1;
		return [acc, ++current, acc || 1];
	}
}

function fibonacciSeq() {
	return function (current, previous) {
		var current = current || 0;
		var previous = previous || 0;
		return [current, (current + previous) || 1];
	}
}

function rangeSeq(start, step) {
	return function (current) {
		return current < start ? start : current + step;
	}
}

function primeSeq() {
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
	return function (current) {
		while(true) {
			if (is_prime(++current)) break;
		}
		return current;
	}
}

function partialSumSeq() {
	var sequence = arguments;
	return function (current, index) {
		if (!sequence[index]) throw new Error("End of sequence");
		var r = current + (sequence[index]);
		var i = index + 1;
		return [i, r];
	}
}

var g = generator(partialSumSeq, 1, 2, 3);
//for (i in [0,1,2,3,4,5]) console.log(g.next());

module.exports = {
	generator: generator,
	dummySeq: dummySeq,
	factorialSeq: factorialSeq,
	fibonacciSeq: fibonacciSeq,
	rangeSeq: rangeSeq,
	primeSeq: primeSeq,
	partialSumSeq: partialSumSeq
};