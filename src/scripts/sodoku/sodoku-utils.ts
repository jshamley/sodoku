import { squareCoordinates } from "./sodoku-consts";

const getRow = (board: Array<Array<number>>, row: number): Array<number> => {
  return board[row];
};

const getColumn = (board: Array<Array<number>>, column: number): Array<number> => {
  let col = board.map((r) => r[column]);
  return col;
};

const getSquare = (board: Array<Array<number>>, square: number): Array<number> => {
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
const appearsOnlyOnce = (board: Array<Array<number>>, possibilities: Array<number>, segment: Array<number>, row: number, col: number): boolean => {
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

const printCell = (val) => {
  if (Array.isArray(val) || val == 0) {
    return '.';
  }
  return val;
};

const printBoard = (board) => {
  console.log();
  for (let i = 0; i < 9; i++) {
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

export { appearsOnlyOnce, getColumn, getRow, getSquare, printBoard, printCell }