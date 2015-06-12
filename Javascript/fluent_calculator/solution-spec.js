var FluentCalculator = require("./solution.js");

if (FluentCalculator.hasOwnProperty('c')) {
  describe("You know, I was kidding with the 'c.plus.plus' thing, you didn't have to take it so seriously, Geez...", function() {  
    it("Since you created 'c' you have to go all the way now", function() {
      assertEquals(FluentCalculator.c.hasOwnProperty('plus'), true, "You really did put a 'c' in FluentCalculator, well, you're almost there.");
      assertEquals(FluentCalculator.c.plus.hasOwnProperty('plus'), true, "I have no words to describe how happy this makes me, you're close son, c.plus.plus is almost there.");
    });
  });
}

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
    expect(FluentCalculator.ten == 10).toBeTruthy( "FluentCalculator.ten should be equals to 10");
  });
  
  it("FluentCalculator should be able to add two or more pairs", function() {
    expect(FluentCalculator.one.plus.two == 3).toBeTruthy("FluentCalculator.one.plus.two should be equals to 3");
    expect(FluentCalculator.one.plus.ten.plus.nine.plus.seven == 27).toBeTruthy("FluentCalculator.one.plus.ten.plus.nine.plus.seven should be equals to 27");
  });
  
  it("FluentCalculator should be able to substract two or more pairs", function() {
    expect(FluentCalculator.ten.minus.nine == 1).toBeTruthy("FluentCalculator.ten.minus.nine should be equals to 1");
    expect(FluentCalculator.one.minus.seven.minus.eight.minus.two == -16).toBeTruthy("FluentCalculator.one.minus.seven.minus.eight.minus.two should be equals to -16");
  });
  
  it("FluentCalculator should be able to multiply two or more pairs", function() {
    expect(FluentCalculator.one.times.two.times.three == 6).toBeTruthy("FluentCalculator.one.times.two.times.three should be equals to 6");
    expect(FluentCalculator.ten.times.nine.times.seven == 630).toBeTruthy("FluentCalculator.ten.times.nine.times.seven should be equals to 630");
  });
  
  it("FluentCalculator should be able to divide two or more pairs", function() {
    expect(FluentCalculator.ten.dividedBy.two == 5).toBeTruthy("FluentCalculator.ten.dividedBy.two should be equals to 5");
    expect(FluentCalculator.nine.dividedBy.four == 2.25).toBeTruthy("FluentCalculator.nine.dividedBy.four should be equals to 2.25");
  });
  
  it("FluentCalculator should be able to mix them in any order", function() {
    expect(FluentCalculator.ten.plus.five.times.two.dividedBy.three.minus.five == 5)
    .toBeTruthy("FluentCalculator.ten.plus.five.times.two.dividedBy.three.minus.five should be equals to 5");
    
    expect(FluentCalculator.five.times.five.plus.five.dividedBy.three.minus.two.plus.seven == 15)
    .toBeTruthy("FluentCalculator.five.times.five.plus.five.dividedBy.three.minus.two.plus.seven should be equals to 15"
    );
    
    expect(FluentCalculator.five.times.five.plus.five.dividedBy.three.minus.two.plus.five.times.five.plus.five.dividedBy.three.minus.two.plus.seven.times.eight.minus.two.plus.ten.dividedBy.three == 78.22222222222221)
    .toBeTruthy("FluentCalculator.five.times.five.plus.five.dividedBy.three.minus.two.plus.five.times.five.plus.five.dividedBy.three.minus.two.plus.seven.times.eight.minus.two.plus.ten.dividedBy.three should be equals to 78.22222222222221"
    );
  });
});

describe("Fluent Calculator - The red ones", function() {
  it("Values should not have another values to call", function() {
    expect(FluentCalculator.zero.zero).toEqual(undefined, "FluentCalculator.zero.zero should be banned from life.");
    expect(FluentCalculator.one.two).toEqual(undefined, "FluentCalculator.one.two should be banned from life.");
    expect(FluentCalculator.three.four).toEqual(undefined, "FluentCalculator.three.four should be banned from life.");
    expect(FluentCalculator.seven.nine).toEqual(undefined, "FluentCalculator.seven.nine should be banned from life.");
    expect(FluentCalculator.six.eight).toEqual(undefined, "FluentCalculator.six.eight should be banned from life.");
  });
  
  it("Functions should not have another functions to call", function() {
    expect(FluentCalculator.one.plus.plus).toEqual(undefined, "FluentCalculator.one.plus.plus should also be banned from life.");
    expect(FluentCalculator.two.plus.minus).toEqual(undefined, "FluentCalculator.two.plus.minus should also be banned from life.");
    expect(FluentCalculator.nine.minus.times).toEqual(undefined, "FluentCalculator.nine.minus.times should also be banned from life.");
    expect(FluentCalculator.ten.plus.dividedBy).toEqual(undefined, "FluentCalculator.ten.plus.dividedBy should also be banned from life.");
    expect(FluentCalculator.eight.times.times).toEqual(undefined, "FluentCalculator.eight.times.times should also be banned from life.");
  });
});