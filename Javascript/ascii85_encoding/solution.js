'use strict';

String.prototype.toAscii85 = function() {
  if (!this) return;

  let charsToRemove = 1;

  let FourToAscii = (st) => {
    while (st.length % 4 != 0 && ++charsToRemove) st = st + "\0";
    let toBinary = (str) => str.charCodeAt(0).toString(2);
    let eightBits = (str) => {
      let strs = str.slice();
      while(strs.length < 8) {
        strs = "0" + strs
      };
      return strs;
    };

    let n = parseInt(st.split('').map(toBinary).map(eightBits).join(''), 2);
    let convertToAscii85 = ((num) => (power) => 33 + (Math.floor(num / Math.pow(85, power)) % 85));
    let intToChar = (x, index) => String.fromCharCode(x);

    return [4, 3, 2, 1, 0].map(convertToAscii85(n)).map(intToChar).join('').replace(/!!!!!/g, 'z');
  };

  return `<~${(this.match(/.{1,4}/g).map(FourToAscii).join('') + ' ').slice(0, -charsToRemove)}~>`;
}

String.prototype.fromAscii85 = function() {
  if (!this) return;

  let charsToRemove = 1;
  let fiveToText = (st) => {
    while(st.length < 5 && charsToRemove++) st += 'u';
    let convertFromAscii85 = (acc, x, i) => acc + ((x.charCodeAt(0) - 33) * Math.pow(85, (4) - i));
    let bits = st.split('').reduce(convertFromAscii85, 0).toString(2);
    while(bits.length % 4 != 0) bits = "0" + bits;
    return bits.match(/.{8}/g).map(x => parseInt(x, 2)).map(x => String.fromCharCode(x)).join('');
  }

  return (this.replace(/z/g, '!!!!').match(/[^<~>]{1,5}/g).map(fiveToText).join('') + ' ').slice(0, -charsToRemove);
}

console.log(
  "somewhat difficult".toAscii85(),
  "<~F)Po,GA(E,+Co1uAnbatCif~>".fromAscii85());