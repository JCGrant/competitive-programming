import { readInput, sum } from "../../../challenge_utils.js";

const INPUT = readInput("advent-of-code/2021/04");

function parseBoard(boardStr) {
  return boardStr
    .split(/\n\W*/)
    .map((line) =>
      line.split(/\W+/).map((x) => ({ value: parseInt(x), marked: false }))
    );
}

function readBoardInput() {
  const [numbers, ...boardStrs] = INPUT.split(/\n\n\W*/);
  return {
    numbers: numbers.split(",").map((x) => parseInt(x)),
    boards: boardStrs.map(parseBoard),
  };
}

const { numbers: NUMBERS, boards: BOARDS } = readBoardInput();

function checkRowWin(board, rowIndex) {
  for (let i = 0; i < board[rowIndex].length; i++) {
    if (!board[rowIndex][i].marked) {
      return false;
    }
  }
  return true;
}

function checkColumnWin(board, columnIndex) {
  for (let i = 0; i < board.length; i++) {
    if (!board[i][columnIndex].marked) {
      return false;
    }
  }
  return true;
}

function hasWon(board) {
  for (let i = 0; i < board.length; i++) {
    if (checkRowWin(board, i)) {
      return true;
    }
    if (checkColumnWin(board, i)) {
      return true;
    }
  }
  return false;
}

function playTurnOnBoard(board, playedNumber) {
  return board.map((row) =>
    row.map((number) =>
      number.value !== playedNumber
        ? number
        : {
            ...number,
            marked: true,
          }
    )
  );
}

function playTurn(boards, number) {
  return boards.map((board) => playTurnOnBoard(board, number));
}

function playWinningGame(boards, numbers) {
  for (const number of numbers) {
    boards = playTurn(boards, number);
    for (const board of boards) {
      if (hasWon(board)) {
        return {
          board,
          number,
        };
      }
    }
  }
}

function playLosingGame(boards, numbers) {
  for (const number of numbers) {
    const playedBoards = playTurn(boards, number);
    boards = playedBoards.filter((board) => !hasWon(board));
    if (playedBoards.length === 1 && boards.length === 0) {
      return {
        board: playedBoards[0],
        number,
      };
    }
  }
}

function calculateScore(board, number) {
  return (
    number *
    sum(
      board.flatMap((row) =>
        row.filter((number) => !number.marked).map((number) => number.value)
      )
    )
  );
}

function part1() {
  const { board, number } = playWinningGame(BOARDS, NUMBERS);
  const score = calculateScore(board, number);
  console.log(score);
}

function part2() {
  const { board, number } = playLosingGame(BOARDS, NUMBERS);
  const score = calculateScore(board, number);
  console.log(score);
}

part1();
part2();
