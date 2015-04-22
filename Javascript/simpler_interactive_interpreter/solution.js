var operations = {
  '-': function(a, b, vars) { return (vars[a] || +a) - (vars[b] || +b) },
  '/': function(a, b, vars) { return (vars[a] || +a) / (vars[b] || +b) },
  '*': function(a, b, vars) { return (vars[a] || +a) * (vars[b] || +b) },
  '+': function(a, b, vars) { return (vars[a] || +a) + (vars[b] || +b) },
  '%': function(a, b, vars) { return (vars[a] || +a) % (vars[b] || +b) },
  '=': function(a, b, vars) { return vars[a] = (vars[b] || +b) },
}

function Interpreter()
{
  this.vars = {};
  this.functions = {};
}

Interpreter.prototype.tokenize = function (program)
{
  if (program === "")
    return [];

  var regex = /\s*(-?[0-9]*\.?[0-9]+|[-+*\/\%=\(\)]|[A-Za-z_][A-Za-z0-9_]*)\s*/g;
  return program.split(regex).filter(function (s) { return !s.match(/^\s*$/); });
};

Interpreter.prototype.reduce = function(expr) {
  if (expr === "") return "";
  var exprs = expr.slice();

  var resolutionOrder = [
    /\((-?[a-z_]?[a-z0-9_]* ?[-+*\/\%=] ?-?[a-z_]?[a-z0-9_]*|[a-z_]?[a-z0-9_]*)\)/i,
    /(-?[a-z_]?[a-z0-9_]* ?[\%*\/] ?[a-z_]?-?[a-z0-9_]*)/i,
    /(-?[a-z_]?[a-z0-9_]* ?[-+] ?[a-z_]?-?[a-z0-9_]*)/i,
    /(-?[a-z_]?[a-z0-9_]* ?[=] ?[a-z_]?-?[a-z0-9_]*)/i
  ];

  var idx = 0;
  while (isNaN(+exprs)) {
    pattern = resolutionOrder[(idx++) % resolutionOrder.length]

    if (/(^-?[a-z_]?[a-z0-9_]*$)/i.test(exprs)) {
      exprs = this.resolveExpression(this.tokenize(exprs));
      break;
    }

    while (m = exprs.match(pattern)) {
      exprs = exprs.replace(m[0], this.resolveExpression(this.tokenize(m[1]))).replace("--", "");
    }
  }

  return +exprs;
}

Interpreter.prototype.input = function (expr)
{
  console.log(expr);
  return this && this.reduce(expr) || "";
};

Interpreter.prototype.resolveExpression = function(tokens) {
  if (tokens.length != 3 && tokens.length != 1) return;
  if (tokens.length == 3) {
    var a = tokens.shift();
    var b = tokens.pop();
    var op = tokens.shift() || "+";

    if (isNaN(a) && !this.vars[a] && op != "=") throw a + " is not declared";
    if (isNaN(b) && !this.vars[b] && op != "=") throw b + " is not declared";

    return operations[op](a, b, this.vars);
  } else {
    var a = tokens.shift();
    if (isNaN(a) && !this.vars[a]) throw a + " is not declared";
    return this.vars[a] || +a;
  }
}

module.exports = Interpreter;