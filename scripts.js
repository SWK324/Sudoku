let easy    = "054091000000467009010002000700000000005080060080009002000040000029000000500200106";
let medium  = "000500003070200000800000710000800034020040006700006200003000000400000368605000040";
let hard    = "670040000040300000900070020400007060500006314009000057200000000014000030000500209";
let cells = document.getElementsByClassName("cell");
let gameBoard = document.getElementById("game-board");
let selected = 0;//which cell is selected (highlighted yellow)
generateBoard();


document.addEventListener('keydown', (event) => {//event listeners for keyboard input for numbers, arrows, and backspace  
  var code = event.code;
  if (code.includes('Digit') && !code.includes('0')) {//for numbers 1-9
    if (cells[selected].classList.contains('given')) {//don't allow given cells to be changed
      return;
    }
    let value = code.charAt(code.length - 1);
    insertUserAnswer(selected, value);
  } else if (code.includes('Arrow')) {//arrow keys for moving selected cell. (no you cannot use WASD)
    if (code === 'ArrowUp') {
      if (selected - 9 >= 0) {
        selectCell(selected - 9);
      }
      else {
        selectCell(selected + 72);
      }
    } else if (code === 'ArrowDown') {
      if (selected + 9 < 81) {
        selectCell(selected + 9);
      }
      else {
        selectCell(selected - 72);
      }
    } else if (code === 'ArrowLeft') {
      if (selected % 9 > 0) {
        selectCell(selected - 1);
      }
      else {
        selectCell(selected + 8);
      }
    } else if (code === 'ArrowRight') {
      if (selected % 9 < 8) {
        selectCell(selected + 1);
      }
      else {
        selectCell(selected - 8);
      }
    }
  }
  else if (code === 'Backspace') {//backspace clears the cell
    if (cells[selected].classList.contains('given')) {
      return;
    }
    cells[selected].innerHTML = '';
    cells[selected].classList.remove('user-answer');
    checkValid();
  }
});

for (let i = 0; i < 81; i++) {
  cells[i].addEventListener('click', function() {
    selectCell(i);
  });
}

//function for highlighting the selected cell (yellow)
function selectCell(newSelected) {
  cells[selected].classList.remove('selected');
  selected = newSelected;
  cells[selected].classList.add('selected');
}

//generates the html structure of the board. Done separately in case in the future I decide to make the board size customizable.
function generateBoard() {
  for (let i = 0; i < 81; i++) {
    gameBoard.innerHTML += "<div class='cell'></div>";
    if (getBox(i) % 2 === 0) {
      cells[i].classList.add("even");
    }
  }
  cells[0].classList.add('selected');//makes sure the first cell is selected
}

//adds the given numbers to the board. Loops through the board, clears cells, and then adds the givens.
function insertGivens(given) {
  for (let i = 0; i < given.length; i++) {
    cells[i].innerHTML = '';
    cells[i].classList.remove('given')
    cells[i].classList.remove('user-answer');
    cells[i].classList.remove('error');
    if (given.charAt(i) != '0') {
      cells[i].innerHTML = given.charAt(i);
      cells[i].classList.add('given');
    }
  }
}

//gets the row of the cell (0-8)
function getRow(index) {
  return Math.floor(index / 9);
}

//gets the column of the cell (0-8)
function getCol(index) {
  return index % 9;
}

//gets the box of the cell. Boxes are numbered 0-8 from left to right, top to bottom
function getBox(index) {
  return Math.floor(getRow(index) / 3) * 3 + Math.floor(getCol(index) / 3);
}

//function to insert a user Answer into a cell
function insertUserAnswer(cell, value) {
  cells[cell].innerHTML = value;
  cells[cell].classList.add('user-answer');
  checkValid();
}

//function to highlight invalid inputs. Only checks if cells of the same number can see each other. Does not crosscheck against a solution.
function checkValid() {
  for (let i = 0; i < 81; i++) {//loop to clear all errors
    cells[i].classList.remove('error');
  }
  //Innefficient nested loops. No noticiable performance issues since there are only 81 cells in a sudoku game.
  for (let i = 0; i < 80; i++) {
    for (let j = i + 1; j < 81; j++) {
      //lots of code motion and excessive memory referencing but as stated above, performance is not an issue.
      if (cells[i].innerHTML === cells[j].innerHTML && cells[i].innerHTML.length !== 0) {//checks to make sure cells are the same and aren't blank
        if (getRow(i) === getRow(j) || getCol(i) === getCol(j) || getBox(i) === getBox(j)) {
          cells[i].classList.add('error');
          cells[j].classList.add('error');
        }
      }
    }
  }
}