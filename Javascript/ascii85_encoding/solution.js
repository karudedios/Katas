'use strict';

String.prototype.toAscii85 = function() {  
  let FourToAscii = (st) => {
    let ignoreFromIndex = 5;
    let toBinary = (str) => str.charCodeAt(0).toString(2);
    let eightBits = (str) => {
      let strs = str.slice();
      while(strs.length < 8) {
        strs = "0" + strs
      };
      return strs;
    };
    while (st.length % 4 != 0 && ignoreFromIndex--) st = st + "\0";
    
    let n = parseInt(st.split('').map(toBinary).map(eightBits).join(''), 2);

    let convertToAscii85 = ((num) => (power) => 33 + (Math.floor(num / Math.pow(85, power)) % 85));
    let intToChar = (x, index) => (ignoreFromIndex > index) ? String.fromCharCode(x) : '';

    return [4, 3, 2, 1, 0].map(convertToAscii85(n)).map(intToChar).join('');
  };

  return `<~${this.match(/.{1,4}/g).map(FourToAscii).join('')}~>`;
}

String.prototype.fromAscii85 = function() {
  let fiveToText = (st) => {
    let convertFromAscii85 = 
    return st.split('').map((x) => x.charCodeAt(0) - 33);
  }

  return this.match(/[^<~>]{1,5}/g).map(fiveToText);
}

console.log(
  "somewhat difficult".toAscii85(),
  "<~F)Po,GA(E,+Co1uAnbatCif~>".fromAscii85()
)