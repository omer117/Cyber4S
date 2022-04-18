// Add all pieces to the board "from js list"\///
// When user clicks, show possible movements by a different color, without worrying about other pieces (as if the piece was along on the board).

const BOARD_SIZE = 8;
const WHITE_PLAYER = 'white-types';
const DARK_PLAYER = 'black-types';

let selectedCell;
let pieces = [];

class Piece {
  constructor(row, col, type, player) {
    this.row = row;
    this.col = col;
    this.type = type;
    this.player = player;
  }
}

function getInitialBoard() {
  let result = [] ;
  //WHITE PLAYERS ONLY!
  result.push(new Piece(0, 0, "rook", WHITE_PLAYER))
  result.push(new Piece(0, 1, "knight", WHITE_PLAYER))
  result.push(new Piece(0, 6, "knight", WHITE_PLAYER))
  result.push(new Piece(0, 4, "king", WHITE_PLAYER))
  result.push(new Piece(0, 3, "queen", WHITE_PLAYER))
  result.push(new Piece(0, 2, "bishop", WHITE_PLAYER))
  result.push(new Piece(0, 5, "bishop", WHITE_PLAYER))
  result.push(new Piece(0,7,"rook", WHITE_PLAYER))
  for (let z=0;z<8;z++){
    result.push(new Piece(1,[z], "pawn", WHITE_PLAYER))
  }

  //BLACK PLAYERS ONLY!
  result.push(new Piece(7, 0, "rook", DARK_PLAYER))
  result.push(new Piece(7, 1, "knight", DARK_PLAYER))
  result.push(new Piece(7, 6, "knight", DARK_PLAYER))
  result.push(new Piece(7, 2, "bishop", DARK_PLAYER))
  result.push(new Piece(7, 4, "king", DARK_PLAYER))
  result.push(new Piece(7, 3, "queen", DARK_PLAYER))
  result.push(new Piece(7, 5, "bishop", DARK_PLAYER))
  result.push(new Piece(7,7,"rook", DARK_PLAYER))
  for (let d=0;d<8;d++){
    result.push(new Piece(6,[d], "pawn", DARK_PLAYER))
  }

  return result;
}

function addImage(cell, player, name) {
  const image = document.createElement('img');
  image.src = 'pngs/' + player + '/' + name + '.png';
  cell.appendChild(image);
}

let allrow;
function onCellClick(event) {
  if (selectedCell !== undefined) {
    selectedCell.classList.remove('selected');
  }
 
  selectedCell = event.currentTarget;
  selectedCell.classList.add('selected');
//how the white rooks move ! (not finished!!)
if (selectedCell.id === "cell-0_0" || selectedCell.id=== "cell-0_7"){
  for (let i = 0; i<8;i++){
   let allrow = document.getElementById("cell-0_"+i)
   let allcol = document.getElementById("cell-" + i + "_0")
   if (selectedCell !== undefined) {
    allrow.classList.remove('selected');
    allcol.classList.remove('selected');
  allrow.classList.add('selected');
  allcol.classList.add('selected');

  }}
}

  
  //how the queens move!
  if (selectedCell.id === "cell-0_4" || selectedCell.id === "cell-7_4"){
    for(let i = 0; i<8;i++){
      for(let z = 0;z<8;z++){
      document.getElementById("cell-" + z + "_" + i).classList.add('selected');
    }
  }
dfsaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
}
}

function createChessBoard() {
  const table1 = document.createElement('table');
  document.body.appendChild(table1);
  for (let i = 0; i < BOARD_SIZE; i++) {
    const row = table1.insertRow();
    for (let j = 0; j < BOARD_SIZE; j++) {
      const cell = row.insertCell();
      cell.id = "cell-" + i.toString() + "_" + j.toString();
      if ((i + j) % 2 === 0) {
        cell.className = 'l';
      } else {
        cell.className = 'b';
      }
      cell.addEventListener('click', onCellClick);
    }
  }
  pieces = getInitialBoard();

  for (let piece of pieces) {
    addImage(table1.rows[piece.row].cells[piece.col], piece.player, piece.type);
  }
}

window.addEventListener('load', createChessBoard);