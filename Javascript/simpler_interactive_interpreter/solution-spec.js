var Interpreter = require('./solution.js');

describe("Simpler Interactive Interpreter", function() {
  var interpreter;

  beforeEach(function() {
    interpreter = new Interpreter();
  });

  it("should handle empty input", function() {
    expect(interpreter.input("")).toEqual("");
  });

  it("should solve basic Arithmetic", function() {
    expect(interpreter.input("1 + 1")).toEqual(2);
    expect(interpreter.input("2 - 1")).toEqual(1);
    expect(interpreter.input("2 * 3")).toEqual(6);
    expect(interpreter.input("8 / 4")).toEqual(2);
    expect(interpreter.input("7 % 4")).toEqual(3);
  });

  it("should work with variables", function() {
    expect(function() { interpreter.input("x") }).toThrow("x is not declared");
    expect(interpreter.input("x = 1")).toEqual(1);
    expect(interpreter.input("x")).toEqual(1);
    expect(interpreter.input("x + 3")).toEqual(4);
  });

  it("should work with parenthesis", function() {
    expect(interpreter.input("(1 + 2)")).toEqual(3);
    expect(interpreter.input("(7 + 3) / (2 * 2 + 1)")).toEqual(2);
    expect(interpreter.input("((1) + ((2 + 3) - 12) + 7)")).toEqual(1);
    expect(interpreter.input("(((((1 + 1)))))")).toEqual(2);
    expect(interpreter.input("-(-(-(-(-(1)))))")).toEqual(-1);
  });

  it("should respect operation order", function() {
    expect(interpreter.input("12 + 4 / 2")).toEqual(14);
    expect(interpreter.input("(12 + 4) / 2")).toEqual(8);
    expect(interpreter.input("3 + 4 * 5")).toEqual(23);
    expect(interpreter.input("(3 + 4) * 5")).toEqual(35);
    expect(interpreter.input("7 % 2 * 8")).toEqual(8);
  });
});