//from line 3 to 17, we have some variables,
//that all of them will come in handy at the game 

const BOARD_SIZE = 8;
const WHITE_PLAYER = 'white-types';
const BLACK_PLAYER = 'black-types';

const PAWN = 'pawn';
const ROOK = 'rook';
const KNIGHT = 'knight';
const BISHOP = 'bishop';
const KING = 'king';
const QUEEN = 'queen';

const CHESS_BOARD_ID = 'chess-board';

let selectedPiece;
let boardData;
let table;




function getInitialPieces() {
  let result = [];

  addFirstRowPieces(result, 0, WHITE_PLAYER);
  addFirstRowPieces(result, 7, BLACK_PLAYER);

  for (let i = 0; i < BOARD_SIZE; i++) {
    result.push(new Piece(1, i, PAWN, WHITE_PLAYER));
    result.push(new Piece(6, i, PAWN, BLACK_PLAYER));
  }
  return result;
}

function addFirstRowPieces(result, row, player) {
  for (let i = 0; i < 8; i++) {
    let PLAYERS = [ROOK, KNIGHT, BISHOP, KING, QUEEN, BISHOP, KNIGHT, ROOK]
    result.push(new Piece(row, i, PLAYERS[i], player));
  }
}

function addImage(cell, player, name) {
  const image = document.createElement('img');
  image.src = 'pngs/' + player + '/' + name + '.png';
  cell.appendChild(image);
}

function showMovesForPiece(row, col) {
  // Clear all previous possible moves
  for (let i = 0; i < BOARD_SIZE; i++) {
    for (let j = 0; j < BOARD_SIZE; j++) {
      table.rows[i].cells[j].classList.remove('possible-move');
      table.rows[i].cells[j].classList.remove('selected');
    }
  }

  const piece = boardData.getPiece(row, col);
  if (piece !== undefined) {
    let possibleMoves = piece.getPossibleMoves(boardData);
    for (let possibleMove of possibleMoves) {
      const cell = table.rows[possibleMove[0]].cells[possibleMove[1]];
      cell.classList.add('possible-move');
    }
  }

  table.rows[row].cells[col].classList.add('selected');
  selectedPiece = piece;
}

function onCellClick(event, row, col) {

  if (selectedPiece === undefined) {
    showMovesForPiece(row, col);
  } else {
    // TODO: Refactor based on Yuval's suggestion
    if (tryMove(selectedPiece, row, col)) {
      selectedPiece = undefined;
      createChessBoard(boardData);
    } else {
      showMovesForPiece(row, col);
    }
  }
}


function tryMove(piece, row, col) {
  const possibleMoves = piece.getPossibleMoves(boardData);
  // possibleMoves looks like this: [[1,2], [3,2]]
  for (const possibleMove of possibleMoves) {
    // possibleMove looks like this: [1,2]
    if (possibleMove[0] === row && possibleMove[1] === col) {
      // There is a legal move
      boardData.removePiece(row, col);
      piece.row = row;
      piece.col = col;
      return true;
    }
  }
  return false;
}

function initGame() {
  // Create list of pieces (32 total)
  boardData = new BoardData(getInitialPieces());
  createChessBoard(boardData);
}

function createChessBoard(boardData) {
  table = document.getElementById(CHESS_BOARD_ID);
  if (table !== null) {
    table.remove();
  }

  // Create empty chess board HTML:
  table = document.createElement('table');
  table.id = CHESS_BOARD_ID;
  document.body.appendChild(table);
  for (let row = 0; row < BOARD_SIZE; row++) {
    const rowElement = table.insertRow();
    for (let col = 0; col < BOARD_SIZE; col++) {
      const cell = rowElement.insertCell();
      if ((row + col) % 2 === 0) {
        cell.className = 'l';
      } else {
        cell.className = 'b';
      }
      cell.addEventListener('click', (event) => onCellClick(event, row, col));
    }
  }

  // Add pieces images to board
  for (let piece of boardData.pieces) {
    const cell = table.rows[piece.row].cells[piece.col];
    addImage(cell, piece.player, piece.type);
  }
}

window.addEventListener('load', initGame);