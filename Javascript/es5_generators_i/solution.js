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
}

function partialSumSeq() {
}

var g = generator(factorialSeq);
//for (i in [0,1,2,3]) console.log(g.next());

module.exports = {
	generator: generator,
	dummySeq: dummySeq,
	factorialSeq: factorialSeq,
	fibonacciSeq: fibonacciSeq,
	rangeSeq: rangeSeq,
	primeSeq: primeSeq,
	partialSumSeq: partialSumSeq
};