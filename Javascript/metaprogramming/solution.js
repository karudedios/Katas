var defgeneric = function(name, idx, cases) {
	idx = idx || 0;
	var scenarios = cases && cases.slice() || [];

	var valid = function(scenario, args) {
		var splitScenarioTypes = scenario.types.split(",");
		var valid = splitScenarioTypes.length === args.length;

		for (var idx = 0; idx < splitScenarioTypes.length && valid; idx++) {
			var type = splitScenarioTypes[idx];
			var arg = args[idx];

			valid = valid && (type == "*" || (arg).constructor.name == type);
		}

		return valid;
	};

	if (idx == 3) {
		return function tryApply() {
			var args = [].slice.call(arguments, 0);
			var scenario = scenarios.shift();

			if (scenario) {
				if (valid(scenario, args)) {
					return (scenario.method.apply(this, args));
				} else {
					return tryApply.apply(this, args);
				}
			} else {
				var types = args.map(function(x) { return typeof(x); });
				throw ("No method found for " + (types.length > 0 ? types : "null"));
			}
		}
	} else {
		return {
			defmethod: function(types, method) {
				var cScenario = scenarios.slice();
				cScenario.push({ types: types, method: method });
				return defgeneric(name, ++idx, cScenario);
			}
		}
	}
}

var append = defgeneric("append")
	.defmethod('Array,Array', function (a,b) { return a.concat(b); })
	.defmethod('*,Array', function (a,b) { return [a].concat(b); })
	.defmethod('Array,*', function (a,b) { return a.concat([b]); });

if (append([1, 1, 1, 1], 6) + '' == '1,1,1,1,6') {
	var sum =	defgeneric("sum")
		.defmethod("Number,Number", function(a, b) { return a + b })
		.defmethod("Number,String", function(a, b) { return a + int.Parse(b); })
		.defmethod("String,Number", function(a, b) { return int.Parse(a) + b; });

	if(sum(1, 2) == 3) {
		var power = defgeneric("power")
			.defmethod("Number", function(a) { return a * a; })
			.defmethod("String", function(a) { return +a * +a; })
			.defmethod("*", function() { throw "Invalid Operation"; ;});

		if(power(6) == 36) {
			console.log("----------------NAILED IT----------------")
		}
	}
}