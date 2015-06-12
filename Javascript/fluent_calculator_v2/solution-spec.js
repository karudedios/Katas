var FluentCalculator = require("./solution.js");

describe("Fluent Calculator - The green ones", function() {
  it("FluentCalculator value should resolve to primitive integers", function() {
    expect(FluentCalculator.zero == 0).toBeTruthy("FluentCalculator.zero should be equals to 0");
    expect(FluentCalculator.one == 1).toBeTruthy("FluentCalculator.one should be equals to 1");
    expect(FluentCalculator.two == 2).toBeTruthy("FluentCalculator.two should be equals to 2");
    expect(FluentCalculator.three == 3).toBeTruthy("FluentCalculator.three should be equals to 3");
    expect(FluentCalculator.four == 4).toBeTruthy("FluentCalculator.four should be equals to 4");
    expect(FluentCalculator.five == 5).toBeTruthy("FluentCalculator.five should be equals to 5");
    expect(FluentCalculator.six == 6).toBeTruthy("FluentCalculator.six should be equals to 6");
    expect(FluentCalculator.seven == 7).toBeTruthy("FluentCalculator.seven should be equals to 7");
    expect(FluentCalculator.eight == 8).toBeTruthy("FluentCalculator.eight should be equals to 8");
    expect(FluentCalculator.nine == 9).toBeTruthy("FluentCalculator.nine should be equals to 9");
  });
  
  it("FluentCalculator should be able to add two or more pairs", function() {
  });
  
  it("FluentCalculator should be able to substract two or more pairs", function() {
  });
  
  it("FluentCalculator should be able to multiply two or more pairs", function() {
  });
  
  it("FluentCalculator should be able to divide two or more pairs", function() {
  });
  
  it("FluentCalculator should be able to mix them in any order", function() {
  });
});

describe("Fluent Calculator - The red ones", function() {
  it("Values can have another value to call", function() {
    expect(FluentCalculator.zero.zero).toNotEqual(undefined, "FluentCalculator.zero.zero should be banned from life.");
    expect(FluentCalculator.one.two).toNotEqual(undefined, "FluentCalculator.one.two should be banned from life.");
    expect(FluentCalculator.three.four).toNotEqual(undefined, "FluentCalculator.three.four should be banned from life.");
    expect(FluentCalculator.seven.nine).toNotEqual(undefined, "FluentCalculator.seven.nine should be banned from life.");
    expect(FluentCalculator.six.eight).toNotEqual(undefined, "FluentCalculator.six.eight should be banned from life.");
  });
  
  it("Functions should not have another functions to call", function() {
    expect(FluentCalculator.one.plus.plus).toEqual(undefined, "FluentCalculator.one.plus.plus should also be banned from life.");
    expect(FluentCalculator.two.plus.minus).toEqual(undefined, "FluentCalculator.two.plus.minus should also be banned from life.");
    expect(FluentCalculator.nine.minus.times).toEqual(undefined, "FluentCalculator.nine.minus.times should also be banned from life.");
    expect(FluentCalculator.nine.plus.dividedBy).toEqual(undefined, "FluentCalculator.ten.plus.dividedBy should also be banned from life.");
    expect(FluentCalculator.eight.times.times).toEqual(undefined, "FluentCalculator.eight.times.times should also be banned from life.");
  });
});