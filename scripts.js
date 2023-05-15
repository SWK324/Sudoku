let easy    = "054091000000467009010002000700000000005080060080009002000040000029000000500200106";
let medium  = "000500003070200000800000710000800034020040006700006200003000000400000368605000040";
let hard    = "670040000040300000900070020400007060500006314009000057200000000014000030000500209";
let cells = document.getElementsByClassName("cell");
let gameBoard = document.getElementById("game-board");
let selected = 0;



generateBoard();
checkValid();


document.addEventListener('keydown', (event) => {
  var code = event.code;
  if (code.includes('Digit')) {
    if (cells[selected].classList.contains('given')) {
      return;
    }
    let value = code.charAt(code.length - 1);
    insertUserAnswer(selected, value);
    checkValid();
  } else if (code.includes('Arrow')) {
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
  else if (code === 'Backspace') {
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

function selectCell(newSelected) {
  cells[selected].classList.remove('selected');
  selected = newSelected;
  cells[selected].classList.add('selected');
}

function generateBoard() {
  for (let i = 0; i < 81; i++) {
    gameBoard.innerHTML += "<div class='cell'></div>";
    if (getBox(i) % 2 === 0) {
      cells[i].classList.add("even");
    }
  }
}

function insertGivens(given) {
  for (let i = 0; i < given.length; i++) {
    cells[i].innerHTML = '';
    cells[i].classList.remove('given');
    if (given.charAt(i) != '0') {
      cells[i].innerHTML = given.charAt(i);
      cells[i].classList.add('given');
    }
  }
}

function getRow(index) {
  return Math.floor(index / 9);
}

function getCol(index) {
  return index % 9;
}

function getBox(index) {
  return Math.floor(getRow(index) / 3) * 3 + Math.floor(getCol(index) / 3);
}

function insertUserAnswer(cell, value) {
  cells[cell].innerHTML = value;
  cells[cell].classList.add('user-answer');
}

function checkValid() {
  for (let i = 0; i < 81; i++) {
    cells[i].classList.remove('error');
  }
  for (let i = 0; i < 80; i++) {
    for (let j = i + 1; j < 81; j++) {
      if (cells[i].innerHTML === cells[j].innerHTML && cells[i].innerHTML.length !== 0) {//checks to make sure cells are the same and aren't blank
        if (getRow(i) === getRow(j) || getCol(i) === getCol(j) || getBox(i) === getBox(j)) {
          cells[i].classList.add('error');
          cells[j].classList.add('error');
        }
      }
    }
  }
}