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

export { getColumn, getRow, getSquare }