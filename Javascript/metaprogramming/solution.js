var defgeneric = function(name) {
	var idx = 0;
	var scenarios = [];

	var valid = function(scenario, args) {
		var splitDiscriminators = scenario.discriminator.split(",");
		var valid = splitDiscriminators.length === args.length;

		for (var i = 0; i < splitDiscriminators.length && valid; i++) {
			var type = splitDiscriminators[i];
			var arg = args[i];

			valid = valid && (type == "*" || (arg).constructor.name == type || typeof (arg) == type || arg == null && t == null);
		}

		return valid;
	};

	var tryApply = function tryApply() {
		var args = [].slice.call(arguments, 0);
		var method = tryApply.findMethod.apply(this, args);

		if (method) {
			return method.apply(this, args);
		}

		var types = args.map(function(x) { return typeof(x); });
		throw ("No method found for " + name + " with args: " + (types.length > 0 ? types : "null"));
	};

	tryApply.defmethod = function(discriminator, fn, combination) {
		scenarios.push({id: ++idx, discriminator: discriminator, method: fn });
		return tryApply;
	}

	tryApply.removemethod = function(discriminator, combination) {
		scenarios = scenarios.filter(function(x) { return x.discriminator != discriminator && x.combination != combination; });
		return tryApply;
	}

	tryApply.findMethod = function() {
		var args = [].slice.call(arguments, 0);
		var cScenarios = scenarios.slice();

		for (var idx = 0; idx < cScenarios.length; idx++) {
			var scenario = cScenarios[idx];

			if (valid(scenario, args)) {
				return scenario.method;
			}
		}
	}

	return tryApply;		
}


var append = defgeneric("append");
append.defmethod('Array,Array', function (a,b) { return a.concat(b); });
append.defmethod('*,Array', function (a,b) { return [a].concat(b); });
append.defmethod('Array,*', function (a,b) { return a.concat([b]); });

console.log(append([1], 6));


var sum =	defgeneric("sum");
sum.defmethod("Number,Number", function(a, b) { return a + b });
sum.defmethod("Number,*", function(a, b) { return a + +b; });
sum.defmethod("*,Number", function(a, b) { return +a + b; });

console.log(sum(1, 2));


var power = defgeneric("power");
power.defmethod("Number", function(a) { return a * a; });
power.defmethod("String", function(a) { return +a * +a; });

console.log(power([0]))