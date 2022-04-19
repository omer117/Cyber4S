
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
  addPieces(result,0,WHITE_PLAYER);
  addPieces(result,7,DARK_PLAYER)
  
  for (let d=0;d<8;d++){
    result.push(new Piece(6,[d], "pawn", DARK_PLAYER))
    result.push(new Piece(1,[d], "pawn", WHITE_PLAYER))
  }

  return result;
}

function addPieces(result,row,player) {
  result.push(new Piece(row, 0, "rook", player));
  result.push(new Piece(row, 1, "knight", player));
  result.push(new Piece(row, 6, "knight", player));
  result.push(new Piece(row, 4, "king", player));
  result.push(new Piece(row, 3, "queen", player));
  result.push(new Piece(row, 2, "bishop", player));
  result.push(new Piece(row, 5, "bishop", player));
  result.push(new Piece(row, 7, "rook", player));
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
if (selectedCell.id === "cell-0_0"){
  for (let i = 0; i<8;i++){
   let allrow = document.getElementById("cell-0_"+i)
   let allcol = document.getElementById("cell-" + i + "_0")
  allrow.classList.add('selected');
  allcol.classList.add('selected');
  }}}


  
//   //how the queens move!
//   if (selectedCell.id === "cell-0_4" || selectedCell.id === "cell-7_4"){
//     for(let i = 0; i<8;i++){
//       for(let z = 0;z<8;z++){
//       document.getElementById("cell-" + z + "_" + i).classList.add('selected');
//     }
//   }
// }


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