'use strict'
const MINE = '💣'
const FLAG = '🏁'

var gBoardMatrix;

var gBoard = {
    minesAroundCount: 0,
    isShown: false,
    isMine: false,
    isMarked: false
}

var gLevel = {
    size: 4,
    mines: 2,
    flags: 2,
    lives: 1
}

var gGame = {
    isOn: false,
    shownCount: 0,
    markedCount: 0,
    secsPassed: 0,
    firstMove: true
}

var gelSmily = document.querySelector('.smiley');
var gelLives = document.querySelector('.lives');

function initGame() {
    gGame.isOn = true;
    gelSmily.innerText = '😀';
    gelLives.innerText = 'Left Lives: ' + gLevel.lives;
    createBoard();
    renderBoard(gBoardMatrix);
}

function createBoard() {
    gBoardMatrix = createMat(gBoard, gLevel.size, gLevel.size);
    console.table(gBoardMatrix)

}

function renderBoard(board) {
    var strHTML = '';
    for (var i = 0; i < board.length; i++) {
        strHTML += '<tr>';
        for (var j = 0; j < board[0].length; j++) {
            var currCell = board[i][j];

            strHTML += `<td onclick="cellClicked(${i}, ${j}) "`;
            if (!currCell.isShown) {
                strHTML += currCell.isMarked ? ` class="hidden">${FLAG}</td>` : ` class="hidden"></td>`;
            }
            else {
                if (currCell.isMine && currCell.isMarked) {
                    strHTML += ` class="boom">${FLAG}</td>`;
                }
                else if (currCell.isMine && !currCell.isMarked)
                    strHTML += ` class="boom">${MINE}</td>`;
                else if (currCell.isMine)
                    strHTML += ` class="shown">${MINE}</td>`;
                else if (currCell.minesAroundCount > 0)
                    strHTML += ` class="shown">${currCell.minesAroundCount}</td>`;
                else strHTML += ` class="shown"></td>`;
            }
        }
        

    }
    strHTML += '</tr>';

    console.log('strHTML is:', strHTML);
    var elboard = document.querySelector('.board')
    elboard.innerHTML = strHTML;
}

function cellClicked(i, j) {
    if (!gGame.isOn)
        return;
    if (gBoardMatrix[i][j].isMine || gBoardMatrix[i][j].isMarked || gBoardMatrix[i][j].isShown)
        return;
    if (gGame.firstMove) {
        var minesArray = setMines(i, j);
        gGame.firstMove = false;
    }

    if (gBoardMatrix[i][j].minesAroundCount === 0) {
        gGame.shownCount += expand(i, j);
    }
    gBoardMatrix[i][j].isShown = true;
    gGame.shownCount++;
    renderBoard(gBoardMatrix);

    if (gBoardMatrix[i][j].isMine) {
        gLevel.lives--;
        if (gLevel.lives === 0) {
            gameOver();
            showMines(minesArray);
        }
    }
}

function showMines(minesArray) {
    for (var i = 0; i < minesArray.length; i++) {
        var iPos = minesArray[i].i;
        var jPos = minesArray[i].j;
        gBoardMatrix[iPos][jPos].isShown = true;
    }
}

function gameOver() {
    gelSmily.innerText = '😞 GAME OVER';
    gGame.isOn = false;
    gGame.lives = 0;
}

function setMines(cellI, cellJ) {
    var cellNeighbors = [];
    var cellMinesPos = [];
    for (var i = 0; i < gBoardMatrix.length; i++) {
        for (var j = 0; j < gBoardMatrix[0].length; j++) {
            if (i === cellI && j === cellJ) continue
            cellNeighbors.push({ i: i, j: j })
        }
    }

    while (gLevel.mines > 0) {
        var randomPos = getRandomIntInclusive(0, cellNeighbors.length - 1)
        var iPos = parseInt(cellNeighbors[randomPos].i);
        var jPos = parseInt(cellNeighbors[randomPos].j);
        gBoardMatrix[iPos][jPos].isMine = true;
        cellMinesPos.push({ i: iPos, j: jPos });
        gLevel.mines--;
    }

    for (var i = 0; i < gBoardMatrix.length; i++) {
        for (var j = 0; j < gBoardMatrix[0].length; j++) {
            gBoardMatrix[i][j].minesAroundCount = cellMinesAround(gBoardMatrix, i, j);
        }
    }

    renderBoard(gBoardMatrix);

    return cellMinesPos;
}


function setDifficulty(level) {
    switch (level) {
        case 1:
            gLevel.size = 4;
            gLevel.mines = 2;
            gLevel.flags = 2;
            gLevel.lives = 1;
            break;

        case 2:
            gLevel.size = 8;
            gLevel.mines = 4;
            gLevel.flags = 4;
            gLevel.lives = 2;
            break;

        case 3:
            gLevel.size = 16;
            gLevel.mines = 8;
            gLevel.flags = 8;
            gLevel.lives = 3;
            break;
    }
    initGame();
}