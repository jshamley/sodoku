import { squareCoordinates } from './sodoku-consts';
import { appearsOnlyOnce, getColumn, getRow, getSquare } from './sodoku-utils';

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
            let completedBoard;
            let board2 = JSON.parse(JSON.stringify(board));
            board2[row][col] = cell[i];
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

export { solve }