const squareCoordinates = [
  [1, 1, 1, 2, 2, 2, 3, 3, 3],
  [1, 1, 1, 2, 2, 2, 3, 3, 3],
  [1, 1, 1, 2, 2, 2, 3, 3, 3],
  [4, 4, 4, 5, 5, 5, 6, 6, 6],
  [4, 4, 4, 5, 5, 5, 6, 6, 6],
  [4, 4, 4, 5, 5, 5, 6, 6, 6],
  [7, 7, 7, 8, 8, 8, 9, 9, 9],
  [7, 7, 7, 8, 8, 8, 9, 9, 9],
  [7, 7, 7, 8, 8, 8, 9, 9, 9]
];

const getRow = (board, row) => {
  return board[row];
};

const getColumn = (board, column) => {
  let col = board.map((r) => r[column]);
  return col;
};

const getSquare = (board, square) => {
  let cells = [];
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (square == squareCoordinates[row][col]) {
        cells.push(board[row][col]);
      }
    }
  }
  return cells;
};

const appearsOnlyOnce = (board, possibilities, segment, row, col) => {
  let updated = false;
  for (let i = 0; i < possibilities.length; i++) {
    const option = possibilities[i];
    let counter = 0;
    segment.forEach((cell) => {
      if (Array.isArray(cell)) {
        if (cell.includes(option)) {
          counter++;
        }
      } else {
        if (cell == option) {
          counter++;
        }
      }
    });
    if (counter == 1) {
      board[row][col] = option;
      updated = true;
      break;
    }
  }
  return updated;
};

const isSolved = (board) => {
  let expected = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  let valid = true;

  for (let row = 0; row < 9 && valid; row++) {
    if (!compare(expected, getRow(board, row))) valid = false;
  }

  for (let col = 0; col < 9 && valid; col++) {
    if (!compare(expected, getColumn(board, col))) valid = false;
  }

  for (let quad = 1; quad <= 9 && valid; quad++) {
    if (!compare(expected, getSquare(board, quad))) valid = false;
  }

  return valid;
};

const printCell = (val) => {
  if (Array.isArray(val) || val == 0) {
    return '.';
  }
  return val;
};

const printBoard = (board) => {
  console.log();
  for (i = 0; i < 9; i++) {
    let row = getRow(board, i);
    if (!row) return;
    if (i % 3 == 0) {
      console.log('|=======|=======|=======|');
    }
    console.log(
      '|',
      printCell(row[0]),
      printCell(row[1]),
      printCell(row[2]),
      '|',
      printCell(row[3]),
      printCell(row[4]),
      printCell(row[5]),
      '|',
      printCell(row[6]),
      printCell(row[7]),
      printCell(row[8]),
      '|'
    );
  }
  console.log('|=======|=======|=======|');
};

const completeCell = (board, row, col) => {
  let used = [
    ...getRow(board, row),
    ...getColumn(board, col),
    ...getSquare(board, squareCoordinates[row][col])
  ];

  let possibilities = [];
  for (let p = 1; p <= 9; p++) {
    if (!used.includes(p)) {
      possibilities.push(p);
    }
  }

  if (possibilities.length == 1) {
    board[row][col] = possibilities[0];
    return true;
  }
  board[row][col] = possibilities;
  return false;
};

const compare = (expected, actual) => {
  let arr1 = expected.slice();
  let arr2 = actual.slice();
  return (
    arr1.length === arr2.length &&
    arr1.sort().every((val, i) => val === arr2.sort()[i])
  );
};

const solve = (board) => {
  let updated = true;
  let solved = false;

  while (updated && !solved) {
    updated = oneValueCellContstraint(board);
    solved = isSolved(board);
  }

  return !solved ? backtrackBased(board) : board;
};

const oneValueCellContstraint = (board) => {
  let updated = false;

  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (board[row][col] == 0) {
        updated = completeCell(board, row, col) || updated;
      }
    }
  }

  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (Array.isArray(board[row][col])) {
        let possibilities = board[row][col];
        updated =
          appearsOnlyOnce(board, possibilities, getRow(board, row), row, col) ||
          appearsOnlyOnce(
            board,
            possibilities,
            getColumn(board, col),
            row,
            col
          ) ||
          appearsOnlyOnce(
            board,
            possibilities,
            getSquare(board, squareCoordinates[row][col]),
            row,
            col
          ) ||
          updated;
      }
    }
  }

  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (Array.isArray(board[row][col])) {
        board[row][col] = 0;
      }
    }
  }

  return updated;
};

const backtrackBased = (orig_board) => {
  let board = JSON.parse(JSON.stringify(orig_board));

  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (board[row][col] == 0) {
        completeCell(board, row, col);
        if (isSolved(board)) return board;

        let cell = board[row][col];
        if (Array.isArray(cell)) {
          for (let i = 0; i < cell.length; i++) {
            let board2 = JSON.parse(JSON.stringify(board));
            board2[row][cell] = cell[i];
            if ((completedBoard = backtrackBased(board2))) {
              return completedBoard;
            }
            return false;
          }
        }
      }
    }

    return false;
  }
};

// A gameArr is an array of 9 rows x 9 elements.
// This is also the layout of rows.
var veryeasyGameArr = [
  [2, 0, 3, 0, 0, 8, 6, 0, 7],
  [1, 4, 0, 7, 2, 6, 0, 0, 9],
  [5, 0, 7, 1, 3, 9, 4, 2, 8],
  [0, 2, 5, 0, 8, 1, 9, 0, 4],
  [4, 1, 0, 9, 0, 3, 2, 0, 5],
  [0, 7, 9, 2, 0, 5, 0, 3, 6],
  [6, 0, 2, 0, 1, 0, 0, 9, 3],
  [7, 0, 0, 5, 0, 2, 0, 0, 1],
  [0, 8, 1, 3, 6, 7, 0, 4, 0]
];
var easyGameArr = [
  [0, 3, 0, 0, 0, 0, 0, 0, 0],
  [0, 2, 0, 9, 0, 6, 3, 0, 0],
  [0, 6, 0, 4, 0, 2, 0, 9, 0],
  [1, 0, 0, 0, 9, 0, 4, 0, 0],
  [0, 0, 8, 1, 0, 3, 5, 0, 0],
  [0, 0, 5, 0, 7, 0, 0, 0, 3],
  [0, 5, 0, 3, 0, 1, 0, 6, 0],
  [0, 0, 4, 6, 0, 7, 0, 3, 0],
  [0, 0, 0, 0, 0, 0, 0, 8, 0]
];
var mediumGameArr = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 3, 0, 8, 5],
  [0, 0, 1, 0, 2, 0, 0, 0, 0],
  [0, 0, 0, 5, 0, 7, 0, 0, 0],
  [0, 0, 4, 0, 0, 0, 1, 0, 0],
  [0, 9, 0, 0, 0, 0, 0, 0, 0],
  [5, 0, 0, 0, 0, 0, 0, 7, 3],
  [0, 0, 2, 0, 1, 0, 0, 0, 0],
  [0, 0, 0, 0, 4, 0, 0, 0, 9]
];
var hardGameArr = [
  [0, 0, 0, 0, 0, 7, 0, 0, 0],
  [0, 0, 2, 4, 0, 6, 3, 0, 0],
  [0, 1, 7, 0, 0, 0, 9, 6, 0],
  [5, 8, 0, 0, 0, 0, 0, 3, 0],
  [0, 0, 0, 0, 9, 0, 0, 0, 0],
  [0, 7, 0, 0, 0, 0, 0, 4, 2],
  [0, 9, 4, 0, 0, 0, 6, 5, 0],
  [0, 0, 5, 2, 0, 8, 1, 0, 0],
  [0, 0, 0, 5, 0, 0, 0, 0, 0]
];
var hardGameArr2 = [
  [0, 4, 3, 0, 1, 0, 0, 0, 0],
  [0, 0, 2, 0, 7, 0, 0, 3, 1],
  [8, 0, 0, 0, 0, 9, 0, 0, 0],
  [3, 0, 9, 0, 0, 5, 0, 0, 0],
  [0, 2, 5, 0, 0, 0, 4, 7, 0],
  [0, 0, 0, 7, 0, 0, 3, 0, 6],
  [0, 0, 0, 9, 0, 0, 0, 0, 5],
  [9, 5, 0, 0, 2, 0, 1, 0, 0],
  [0, 0, 0, 0, 5, 0, 6, 9, 0]
];
var hardGameArr3 = [
  [0, 3, 0, 0, 5, 0, 2, 0, 8],
  [0, 0, 4, 0, 0, 0, 9, 0, 0],
  [0, 0, 0, 6, 0, 0, 0, 1, 0],
  [0, 6, 7, 5, 0, 0, 1, 0, 0],
  [0, 0, 0, 0, 8, 0, 0, 0, 0],
  [0, 0, 1, 0, 0, 9, 8, 4, 0],
  [0, 7, 0, 0, 0, 6, 0, 0, 0],
  [0, 0, 8, 0, 0, 0, 3, 0, 0],
  [1, 0, 2, 0, 4, 0, 0, 8, 0]
];
var evilGameArr = [
  [8, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 3, 6, 0, 0, 0, 0, 0],
  [0, 7, 0, 0, 9, 0, 2, 0, 0],
  [0, 5, 0, 0, 0, 7, 0, 0, 0],
  [0, 0, 0, 0, 4, 5, 7, 0, 0],
  [0, 0, 0, 1, 0, 0, 0, 3, 0],
  [0, 0, 1, 0, 0, 0, 0, 6, 8],
  [0, 0, 8, 5, 0, 0, 0, 1, 0],
  [0, 9, 0, 0, 0, 0, 4, 0, 0]
];
var evilGameArr2 = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 3, 0, 8, 5],
  [0, 0, 1, 0, 2, 0, 0, 0, 0],
  [0, 0, 0, 5, 0, 7, 0, 0, 0],
  [0, 0, 4, 0, 0, 0, 1, 0, 0],
  [0, 9, 0, 0, 0, 0, 0, 0, 0],
  [5, 0, 0, 0, 0, 0, 0, 7, 3],
  [0, 0, 2, 0, 1, 0, 0, 0, 0],
  [0, 0, 0, 0, 4, 0, 0, 0, 9]
];

console.log('');
console.log('Starting game - VERY EASY');
printBoard(veryeasyGameArr);
console.log('');
console.log('Completed solution');
printBoard(solve(veryeasyGameArr));
console.log('');
console.log('Starting game - EASY');
printBoard(easyGameArr);
console.log('');
console.log('Completed solution');
printBoard(solve(easyGameArr));

console.log('');
console.log('Starting game - MEDIUM');
printBoard(mediumGameArr);
console.log('');
console.log('Completed solution');
printBoard(solve(mediumGameArr));

console.log('');
console.log('Starting game - HARD');
printBoard(hardGameArr);
console.log('');
console.log('Completed solution');
printBoard(solve(hardGameArr));

console.log('');
console.log('Starting game - HARD #2');
printBoard(hardGameArr2);
console.log('');
console.log('Completed solution');
printBoard(solve(hardGameArr2));

console.log('');
console.log('Starting game - HARD #3');
printBoard(hardGameArr3);
console.log('');
console.log('Completed solution');
printBoard(solve(hardGameArr3));

console.log('');
console.log('Starting game - EVIL');
printBoard(evilGameArr);
console.log('');
console.log('Completed solution');
printBoard(solve(evilGameArr));

console.log('');
console.log('Starting game - EVIL #2');
printBoard(evilGameArr2);
console.log('');
console.log('Completed solution');
printBoard(solve(evilGameArr2));
