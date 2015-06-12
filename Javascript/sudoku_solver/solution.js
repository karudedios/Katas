function sudoku(puzzle) {
  var x = puzzle.map(function (row) {
    return row.reduce(function (rowCopy, cell) {
      return rowCopy;
    }, row);
  });
  console.log(x)
  return x;
}

module.exports.sudoku = sudoku;