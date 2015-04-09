var defgeneric = function(name) {
	var idx = 0;
	var scenarios = [];

	var valid = function(scenario, args) {
		var splitDiscriminators = scenario.discriminator.split(",");
		var valid = splitDiscriminators.length === args.length;

		for (var i = 0; i < splitDiscriminators.length && valid; i++) {
			var type = splitDiscriminators[i];
			var arg = args[i];
			debugger
			valid = valid && (type == "*" || (arg).constructor.name == type || typeof arg == type || arg == null && type == null || eval("arg instanceof " + type));
		}

		return valid;
	};

	var tryApply = function tryApply() {
		var args = [].slice.call(arguments, 0);
		var methods = tryApply.findMethod.apply(this, args);

		var before = methods.filter(function(x) { return x.combination == "before"; });
		var primary = methods.filter(function(x) { return x.combination == "primary"; })[0];
		var after = methods.filter(function(x) { return x.combination == "after"; });

		if (primary) {
			before.forEach(function(x) { x.method(); });
			var response = primary.method.apply(this, args);
			after.forEach(function(x) { x.method(); });

			return response;
		}

		var types = args.map(function(x) { return typeof(x); });
		throw ("No method found for " + name + " with args: " + (types.length > 0 ? types : "null"));
	};

	tryApply.defmethod = function(discriminator, fn, combination) {
    combination = combination || 'primary';
		scenarios.push({id: ++idx, discriminator: discriminator, method: fn, combination: combination });
		return tryApply;
	}

	tryApply.removemethod = function(discriminator, combination) {
    combination = combination || 'primary';
		scenarios = scenarios.filter(function(x) { return x.discriminator != discriminator && x.combination != combination; });
		return tryApply;
	}

	tryApply.findMethod = function() {
		var args = [].slice.call(arguments, 0);
		var cScenarios = scenarios.slice();
		var validScenarios = cScenarios.filter(function(scenario) { return valid(scenario, args)});
		return executionOrder = validScenarios;
	}

	return tryApply;
}

function Mammal() {}

function Rhino() {}
Rhino.prototype = new Mammal();
Rhino.prototype.constructor = Rhino;

function Platypus() {}
Platypus.prototype = new Mammal();
Platypus.prototype.constructor = Platypus;

var laysEggs = defgeneric("laysEggs");

laysEggs
  .defmethod('Mammal', function () { return false; })
  .defmethod('Platypus', function () { return true; })
  .defmethod('Platypus', function () { console.log('Before platypus egg check.'); }, 'before')
  .defmethod('Mammal', function () { console.log('Before mammal egg check.'); }, 'before')
  .defmethod('*', function () { console.log('Before egg check.'); }, 'before')
  .defmethod('Mammal', function () { console.log('After mammal egg check.'); }, 'after')
  .defmethod('Platypus', function () { console.log ('After platypus egg check.'); }, 'after');

console.log(
	laysEggs(new Platypus())
);