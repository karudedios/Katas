var Value = function(exp) {
	this.valueOf = function () { return eval(exp); }
}
Value.__proto__ = Value.prototype;

var createOperator = (function() {
	var evaluate = function (simpleExpression, fn) {
		var numbers = simpleExpression.match(/-?\d+/g).map(Number);
		return fn.apply(null, numbers);
	}

	var evaluateExpression = function (expression, fns) {
		var executionPriority  = [
			/-?\d+[\s]([\^])[\s]-?\d+/,
			/-?\d+[\s]([*\/])[\s]-?\d+/,
			/-?\d+[\s]([-+])[\s]-?\d+/,
		];
		var index = 0;
		var exp = arguments[0];
		var match, pattern;

		while (pattern = executionPriority[index++]) {
			while (match = exp.match(pattern)) {
				var fn = fns.filter(function (x) { return x.symbol == match[1] })[0].fn;
				exp = exp.replace(match[0], evaluate(match[0], fn));
			}
		}
		return (exp);
	}

	var $this = this;
	$this.pairs = [];
  return function(name, oper){
    $this.pairs.push({symbol: name, fn: oper});
    return function(){
      this.expressions = [].slice.call(arguments);
      this.eval = function () { return new Value(evaluateExpression(this.toString(), $this.pairs)); }
      this.toString = function () {
      	var expression = this.expressions[0] + " " + name + " " + this.expressions[1];
      	return expression;
      }
    };
  };
})();

module.exports.Value = Value;
module.exports.createOperator = createOperator;