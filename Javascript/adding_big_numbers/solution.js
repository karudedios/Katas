function add(x, y) {
  while (x.length > y.length) { y = '0' + y; }
  while (y.length > x.length) { x = '0' + x; }
  var length = x.length;
  var take = 0;
  var r = [];
  
  for (var i = length - 1; i >= 0; i--) {
    var current = ((+x.charAt(i) + +y.charAt(i) + take) + '').split('');
    take = 0;
    if (current.length > 1 && i > 0) { take = +current.shift(); }
    r.unshift(current.join(''));
  }
  
  return (r.join(''));
}

module.exports.add = add;