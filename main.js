'use strict'
const mines = '💣'
var gBoard = {
    minesAroundCount: 4,
    isShown: true,
    isMine: false,
    isMarked: true
}

var gLevel = {
    SIZE: 4,
    MINES: 2
}
var gGame = {
    isOn: false,
    shownCount: 0,
    markedCount: 0,
    secsPassed: 0
}

function initGame() {
    var board = createBoard();
    renderBoard(board)
}

function createBoard(board) {
    var board = createMat(gBoard, 4, 4);
    console.table(board)
    return board
}


function setMinesCount(board) {

}

function renderBoard(board) {
    var strHTML = '';
    for (var i = 0; i < board.length; i++) {
        strHTML += '<tr>\n';
        for (var j = 0; j < board[0].length; j++) {
            var currCell = board[i][j];
            var className = `cell-${i}-${j}`
            strHTML += '\t<td class="cell">';
        }
        strHTML += '</td>'

    }
    strHTML += '</tr>';

    console.log('strHTML is:', strHTML);
    var elboard = document.querySelector('.board')
    elboard.innerHTML = strHTML;
}

